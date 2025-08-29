"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const dto_1 = require("../../schemas/dto");
const validate_1 = require("../../utils/validate");
const chat_model_1 = require("./chat.model");
const router = (0, express_1.Router)();
router.get('/:chatId/messages', auth_1.requireAuth, async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const messages = await chat_model_1.Message.find({ chatId }).sort({ createdAt: 1 }).limit(200);
        res.json(messages);
    }
    catch (err) {
        next(err);
    }
});
router.post('/:chatId/messages', auth_1.requireAuth, (0, validate_1.validateBody)(dto_1.MessageCreateSchema), async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const created = await chat_model_1.Message.create({
            chatId,
            sender: req.user.id,
            content: req.body.content,
        });
        await chat_model_1.ChatRoom.findByIdAndUpdate(chatId, { lastMessageAt: new Date() });
        // Emit on /chat namespace to the room
        const io = req.app.get('io');
        if (io)
            io.of('/chat').to(chatId).emit('message:new', created);
        res.status(201).json(created);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
