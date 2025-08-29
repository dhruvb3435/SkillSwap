import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { MessageCreateSchema } from '../../schemas/dto';
import { validateBody } from '../../utils/validate';
import { ChatRoom, Message } from './chat.model';

const router = Router();

router.get('/:chatId/messages', requireAuth, async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 })
      .limit(200);
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/:chatId/messages',
  requireAuth,
  validateBody(MessageCreateSchema),
  async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const created = await Message.create({
        chatId,
        sender: req.user!.id,
        content: req.body.content,
      });

      // Ensure chat room exists and track participants
      await ChatRoom.findOneAndUpdate(
        { chatId },
        {
          lastMessageAt: new Date(),
          $addToSet: { participants: req.user!.id },
        },
        { upsert: true, new: true }
      );

      // Emit on /chat namespace to the room
      const io = req.app.get('io');
      if (io) io.of('/chat').to(chatId).emit('message:new', created);

      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/my-chats/list', requireAuth, async (req, res, next) => {
  try {
    const chats = await ChatRoom.find({
      participants: req.user!.id,
    })
      .sort({ lastMessageAt: -1 })
      .limit(50)
      .populate('participants', 'name avatarUrl')
      .lean();

    res.json(chats);
  } catch (err) {
    next(err);
  }
});

export default router;
