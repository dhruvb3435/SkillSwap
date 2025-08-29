"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = require("./app");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const chat_gateway_1 = require("./modules/chat/chat.gateway");
const rtc_gateway_1 = require("./modules/rtc/rtc.gateway");
async function bootstrap() {
    await (0, db_1.connectDB)();
    const app = (0, app_1.createApp)();
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, {
        cors: { origin: process.env.CORS_ORIGIN?.split(',') || '*' }
    });
    // Make io accessible in routes
    app.set('io', io);
    // Sockets
    (0, chat_gateway_1.registerChatGateway)(io);
    (0, rtc_gateway_1.registerRtcGateway)(io);
    server.listen(env_1.env.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`🚀 Server listening on http://localhost:${env_1.env.PORT}`);
    });
}
bootstrap().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Fatal bootstrap error:', err);
    process.exit(1);
});
