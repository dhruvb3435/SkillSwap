"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRtcGateway = registerRtcGateway;
function registerRtcGateway(io) {
    io.on('connection', (socket) => {
        socket.on('rtc:join', ({ roomId }) => {
            socket.join(roomId);
            socket.to(roomId).emit('rtc:peer-joined', { peerId: socket.id });
        });
        socket.on('rtc:leave', ({ roomId }) => {
            socket.leave(roomId);
            socket.to(roomId).emit('rtc:peer-left', { peerId: socket.id });
        });
        socket.on('rtc:offer', ({ roomId, sdp }) => {
            socket.to(roomId).emit('rtc:offer', { from: socket.id, sdp });
        });
        socket.on('rtc:answer', ({ roomId, sdp }) => {
            socket.to(roomId).emit('rtc:answer', { from: socket.id, sdp });
        });
        socket.on('rtc:ice-candidate', ({ roomId, candidate }) => {
            socket.to(roomId).emit('rtc:ice-candidate', { from: socket.id, candidate });
        });
        socket.on('disconnect', () => {
            // implicit; rooms cleaned up automatically by socket.io
        });
    });
}
