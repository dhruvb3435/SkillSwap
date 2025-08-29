"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRtcGateway = registerRtcGateway;
function registerRtcGateway(io) {
    const nsp = io.of('/call');
    nsp.on('connection', (socket) => {
        console.log('RTC client connected', socket.id);
        socket.on('join-room', ({ roomId }) => {
            socket.join(roomId);
            socket.to(roomId).emit('peer-joined', { peerId: socket.id });
        });
        socket.on('leave-room', ({ roomId }) => {
            socket.leave(roomId);
            socket.to(roomId).emit('peer-left', { peerId: socket.id });
        });
        socket.on('signal', ({ roomId, payload }) => {
            socket.to(roomId).emit('signal', { from: socket.id, payload });
        });
        socket.on('disconnect', () => {
            console.log('RTC client disconnected', socket.id);
        });
    });
}
