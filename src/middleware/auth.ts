import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
  const token = h.slice(7);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string };
    req.user = { id: payload.id, email: payload.email };
    return next();
  } catch {
    return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
  }
}
