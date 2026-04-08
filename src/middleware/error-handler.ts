import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../utils/http-error';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: `Rota nao encontrada: ${req.method} ${req.path}`,
    code: 'NOT_FOUND',
  });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: 'Dados invalidos',
      code: 'VALIDATION_ERROR',
      details: error.flatten(),
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      error: error.message,
      code: `HTTP_${error.statusCode}`,
    });
    return;
  }

  console.error('[500]', error);
  res.status(500).json({ error: 'Erro interno', code: 'INTERNAL_ERROR' });
}
