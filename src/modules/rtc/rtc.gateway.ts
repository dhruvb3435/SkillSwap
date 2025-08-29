// src/gateways/rtcGateway.ts
import { Server, Socket } from 'socket.io';

export function registerRtcGateway(io: Server) {
  const nsp = io.of('/call');

  nsp.on('connection', (socket: Socket) => {
    console.log('RTC client connected', socket.id);

    socket.on('join-room', ({ roomId }: { roomId: string }) => {
      socket.join(roomId);
      socket.to(roomId).emit('peer-joined', { peerId: socket.id });
    });

    socket.on('leave-room', ({ roomId }: { roomId: string }) => {
      socket.leave(roomId);
      socket.to(roomId).emit('peer-left', { peerId: socket.id });
    });

    socket.on('signal', ({ roomId, payload }: { roomId: string; payload: any }) => {
      socket.to(roomId).emit('signal', { from: socket.id, payload });
    });

    socket.on('disconnect', () => {
      console.log('RTC client disconnected', socket.id);
    });
  });
}
