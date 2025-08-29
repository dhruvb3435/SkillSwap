"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChatGateway = registerChatGateway;
const chat_model_1 = require("./chat.model");
function registerChatGateway(io) {
    const nsp = io.of('/chat');
    nsp.on('connection', async (socket) => {
        const { chatId, userId } = socket.handshake.query;
        if (chatId) {
            socket.join(chatId);
        }
        socket.on('message:send', async (payload) => {
            try {
                const msg = await chat_model_1.Message.create({
                    chatId: payload.chatId,
                    sender: payload.senderId,
                    content: payload.content,
                });
                await chat_model_1.ChatRoom.findByIdAndUpdate(payload.chatId, { lastMessageAt: new Date() });
                nsp.to(payload.chatId).emit('message:new', msg);
            }
            catch (e) {
                socket.emit('error', { message: 'Failed to send message' });
            }
        });
        socket.on('typing', (data) => {
            socket.to(data.chatId).emit('typing', { userId: data.userId });
        });
        socket.on('join', (data) => {
            socket.join(data.chatId);
        });
        socket.on('leave', (data) => {
            socket.leave(data.chatId);
        });
    });
}
