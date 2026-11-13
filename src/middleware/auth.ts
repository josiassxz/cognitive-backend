import { NextFunction, Request, Response } from 'express';
import { ACCESS_COOKIE, readCookie } from '../lib/cookies';
import { verifyToken } from '../lib/jwt';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
export const CSRF_HEADER = 'x-requested-with';
export const CSRF_HEADER_VALUE = 'tunely-web';

type Resolved =
  | { ok: true; userId: string; role: 'user' | 'admin'; via: 'bearer' | 'cookie' }
  | { ok: false; status: 401 | 403; error: string; code: string };

/**
 * Resolve o usuário a partir de `Authorization: Bearer` (mobile) ou do cookie HttpOnly (web).
 * Requisições autenticadas por cookie que alteram estado exigem o cabeçalho
 * `X-Requested-With: tunely-web`: páginas de outros sites não conseguem enviá-lo sem
 * passar pelo preflight de CORS, que só libera as origens configuradas.
 */
function resolveUser(req: Request): Resolved | null {
  const authHeader = req.headers.authorization;
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const cookieToken = bearer ? null : readCookie(req, ACCESS_COOKIE);
  const token = bearer ?? cookieToken;
  if (!token) return null;
  try {
    const decoded = verifyToken(token);
    if (decoded.tokenType !== 'access') {
      return { ok: false, status: 401, error: 'Token invalido', code: 'INVALID_TOKEN' };
    }
    if (cookieToken && !SAFE_METHODS.has(req.method)) {
      if (String(req.headers[CSRF_HEADER] ?? '').toLowerCase() !== CSRF_HEADER_VALUE) {
        return { ok: false, status: 403, error: 'Requisicao bloqueada (CSRF)', code: 'CSRF_REJECTED' };
      }
    }
    return { ok: true, userId: decoded.id, role: decoded.role, via: bearer ? 'bearer' : 'cookie' };
  } catch {
    return { ok: false, status: 401, error: 'Token invalido', code: 'INVALID_TOKEN' };
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const resolved = resolveUser(req);
  if (!resolved) {
    res.status(401).json({ error: 'Nao autorizado', code: 'UNAUTHORIZED' });
    return;
  }
  if (!resolved.ok) {
    res.status(resolved.status).json({ error: resolved.error, code: resolved.code });
    return;
  }
  req.userId = resolved.userId;
  req.userRole = resolved.role;
  next();
}

/** Identifica o usuário quando há credencial válida, sem exigir autenticação. */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const resolved = resolveUser(req);
  if (resolved?.ok) {
    req.userId = resolved.userId;
    req.userRole = resolved.role;
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.userRole !== 'admin') {
    res.status(403).json({ error: 'Acesso negado', code: 'FORBIDDEN' });
    return;
  }
  next();
}
