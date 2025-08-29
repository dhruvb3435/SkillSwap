import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';

export function validateBody(schema: AnyZodObject) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(Object.assign(new Error('ValidationError'), { status: 400, details: err.flatten() }));
      }
      next(err);
    }
  };
}
