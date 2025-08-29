import { Server, Socket } from 'socket.io';
import { ChatRoom, Message } from './chat.model';

export function registerChatGateway(io: Server) {
  const nsp = io.of('/chat');

  nsp.on('connection', async (socket: Socket) => {
    const { chatId, userId } = socket.handshake.query as { chatId?: string; userId?: string };

    if (chatId) {
      socket.join(chatId);
    }

    socket.on('message:send', async (payload: { chatId: string; content: string; senderId: string }) => {
      try {
        const msg = await Message.create({
          chatId: payload.chatId,
          sender: payload.senderId,
          content: payload.content,
        });
        await ChatRoom.findByIdAndUpdate(payload.chatId, { lastMessageAt: new Date() });
        nsp.to(payload.chatId).emit('message:new', msg);
      } catch (e) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('typing', (data: { chatId: string; userId: string }) => {
      socket.to(data.chatId).emit('typing', { userId: data.userId });
    });

    socket.on('join', (data: { chatId: string }) => {
      socket.join(data.chatId);
    });

    socket.on('leave', (data: { chatId: string }) => {
      socket.leave(data.chatId);
    });
  });
}
