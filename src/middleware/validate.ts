// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const formatted = errors.array().map(err => {
    const e: any = err;
    const field = typeof e.param === 'string' ? e.param : e.location ?? 'unknown';
    const message = e.msg ?? String(e);
    return { field, message };
  });

  return res.status(400).json({ errors: formatted });
}
