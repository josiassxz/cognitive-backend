import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type UserRole = 'user' | 'admin';

export type AccessTokenPayload = {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  tokenType: 'access';
};

export type RefreshTokenPayload = {
  id: string;
  tokenType: 'refresh';
};

export type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

export function signAccessToken(payload: Omit<AccessTokenPayload, 'tokenType'>): string {
  const expiresIn = env.ACCESS_TOKEN_TTL as SignOptions['expiresIn'];
  return jwt.sign({ ...payload, tokenType: 'access' }, env.JWT_SECRET, {
    expiresIn,
  });
}

export function signRefreshToken(payload: Omit<RefreshTokenPayload, 'tokenType'>): string {
  const expiresIn = env.REFRESH_TOKEN_TTL as SignOptions['expiresIn'];
  return jwt.sign({ ...payload, tokenType: 'refresh' }, env.JWT_REFRESH_SECRET, {
    expiresIn,
  });
}

export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
  }
}
