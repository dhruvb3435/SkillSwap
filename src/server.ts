import http from 'http';
import { Server as IOServer } from 'socket.io';
import { createApp } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import { registerChatGateway } from './modules/chat/chat.gateway';
import { registerRtcGateway } from './modules/rtc/rtc.gateway';

async function bootstrap() {
  await connectDB();

  const app = createApp();
  const server = http.createServer(app);

  const io = new IOServer(server, {
    cors: { origin: process.env.CORS_ORIGIN?.split(',') || '*' }
  });

  app.set('io', io);

  registerChatGateway(io);
  registerRtcGateway(io);

  server.listen(env.PORT, () => {
    console.log(`Server listening on ${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Fatal bootstrap error:', err);
  process.exit(1);
});
