import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { apiLimiter } from './middleware/rateLimit';
import { errorHandler, notFound } from './middleware/errorHandler';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import creditRoutes from './modules/credits/credit.routes';
import chatRoutes from './modules/chat/chat.routes';
import matchRoutes from './modules/matchmaking/match.routes';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use('/api', apiLimiter);

  app.use('/demo', express.static(path.join(__dirname, '..', 'public', 'demo')));

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/credits', creditRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/match', matchRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
