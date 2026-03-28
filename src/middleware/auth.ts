import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../lib/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Nao autorizado', code: 'UNAUTHORIZED' });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const decoded = verifyToken(token);
    if (decoded.tokenType !== 'access') {
      res.status(401).json({ error: 'Token invalido', code: 'INVALID_TOKEN' });
      return;
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalido', code: 'INVALID_TOKEN' });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.userRole !== 'admin') {
    res.status(403).json({ error: 'Acesso negado', code: 'FORBIDDEN' });
    return;
  }
  next();
}
