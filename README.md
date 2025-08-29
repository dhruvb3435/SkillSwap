# SkillSwap (Node.js + TypeScript + Express + MongoDB + Socket.IO + WebRTC)

Production-minded scaffold for a skill-exchange app featuring:
- JWT auth
- User profiles with teach/learn skills and credits
- Skill-based search and simple matchmaking
- Chat persistence (REST) + real-time chat namespace (`/chat`)
- WebRTC signaling on the root namespace (`rtc:*` events) and a working demo page

## Quick Start
1. **Install**: `npm i`
2. **Configure**: copy `.env.example` to `.env` and edit values.
3. **Run (dev)**: `npm run dev`
4. **Build**: `npm run build` then `npm start`

## API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me` (auth)
- `GET /api/users/:id`
- `PUT /api/users/:id` (auth: self-only)
- `GET /api/users?skill=React`
- `GET /api/match?teach=React&learn=Python`
- `POST /api/credits/transfer` (auth)
- `GET /api/chat/:chatId/messages` (auth)
- `POST /api/chat/:chatId/messages` (auth)

## Sockets
- **/chat namespace**: real-time messages
  - `message:send` → `{ chatId, content, senderId }`
  - Emits `message:new` to the room `chatId`
- **root namespace (/) for WebRTC signaling**
  - `rtc:join` → `{ roomId }`
  - `rtc:leave` → `{ roomId }`
  - `rtc:offer` / `rtc:answer` / `rtc:ice-candidate` → `{ roomId, data }` broadcast to others in the room

## WebRTC Demo
- Visit `http://localhost:4000/demo/rtc.html`
- Open in two tabs, use the same room ID, then click **Start**.
