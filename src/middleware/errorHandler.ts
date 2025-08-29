import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  const err = new AppError('Not Found', 404);
  next(err);
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || err.statusCode || 500;
  const payload: any = {
    message: err.message || 'Internal Server Error',
  };
  if (err.details) payload.details = err.details;
  res.status(status).json(payload);
}
