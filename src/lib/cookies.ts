// Cookies de sessão web (HttpOnly). Sem dependência externa: o parse é simples e
// só lemos os dois cookies que nós mesmos emitimos.
import type { Request, Response } from 'express';
import { env } from '../config/env';

export const ACCESS_COOKIE = 'cn_access';
export const REFRESH_COOKIE = 'cn_refresh';
const REFRESH_PATH = '/api/auth';

export function readCookie(req: Request, name: string): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const index = part.indexOf('=');
    if (index < 0) continue;
    if (part.slice(0, index).trim() === name) {
      try {
        return decodeURIComponent(part.slice(index + 1).trim());
      } catch {
        return null;
      }
    }
  }
  return null;
}

function ttlToMs(ttl: string, fallbackMs: number): number {
  const match = /^(\d+)\s*([smhd])?$/.exec(ttl.trim());
  if (!match) return fallbackMs;
  const unit = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }[(match[2] ?? 's') as 's' | 'm' | 'h' | 'd'];
  return Number(match[1]) * unit;
}

function baseOptions() {
  return {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax' as const,
    ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
  };
}

export function setSessionCookies(res: Response, tokens: { accessToken: string; refreshToken: string }): void {
  res.cookie(ACCESS_COOKIE, tokens.accessToken, {
    ...baseOptions(),
    path: '/',
    maxAge: ttlToMs(env.ACCESS_TOKEN_TTL, 15 * 60_000),
  });
  res.cookie(REFRESH_COOKIE, tokens.refreshToken, {
    ...baseOptions(),
    path: REFRESH_PATH,
    maxAge: ttlToMs(env.REFRESH_TOKEN_TTL, 30 * 86_400_000),
  });
}

export function clearSessionCookies(res: Response): void {
  res.clearCookie(ACCESS_COOKIE, { ...baseOptions(), path: '/' });
  res.clearCookie(REFRESH_COOKIE, { ...baseOptions(), path: REFRESH_PATH });
}

/** Cliente web pede sessão por cookie com este cabeçalho. */
export function wantsCookieSession(req: Request): boolean {
  return String(req.headers['x-auth-mode'] ?? '').toLowerCase() === 'cookie';
}
