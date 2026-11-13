import { Router } from 'express';
import { z } from 'zod';
import { clearSessionCookies, readCookie, REFRESH_COOKIE, setSessionCookies, wantsCookieSession } from '../lib/cookies';
import { authMiddleware } from '../middleware/auth';
import { authRepository } from '../repositories/auth-repository';
import { AuthService } from '../services/auth-service';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

const signupSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  name: z.string().trim().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(1, 'Senha obrigatoria'),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token obrigatorio'),
});

// Web (sessão por cookie): o refresh token vem do cookie HttpOnly, nunca do corpo.
function refreshTokenFrom(req: Parameters<typeof wantsCookieSession>[0]): string {
  if (wantsCookieSession(req)) {
    const fromCookie = readCookie(req, REFRESH_COOKIE);
    if (!fromCookie) throw new HttpError(401, 'Sessao expirada');
    return fromCookie;
  }
  return refreshSchema.parse(req.body).refreshToken;
}

const service = new AuthService(authRepository);

export const authRouter = Router();

authRouter.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const input = signupSchema.parse(req.body);
    const result = await service.signup(input);
    res.status(201).json(result);
  }),
);

authRouter.post(
  '/auth/login',
  asyncHandler(async (req, res) => {
    const input = loginSchema.parse(req.body);
    const result = await service.login(input);
    if (wantsCookieSession(req)) {
      // Tokens só em cookies HttpOnly; o JavaScript da página nunca os vê.
      setSessionCookies(res, result);
      res.json({ user: result.user });
      return;
    }
    res.json(result);
  }),
);

authRouter.post(
  '/auth/refresh',
  asyncHandler(async (req, res) => {
    const cookieMode = wantsCookieSession(req);
    let result;
    try {
      result = await service.refresh({ refreshToken: refreshTokenFrom(req) });
    } catch (error) {
      if (cookieMode) clearSessionCookies(res);
      throw error;
    }
    if (cookieMode) {
      setSessionCookies(res, result);
      res.json({ user: result.user });
      return;
    }
    res.json(result);
  }),
);

authRouter.post(
  '/auth/logout',
  asyncHandler(async (req, res) => {
    if (wantsCookieSession(req)) {
      const token = readCookie(req, REFRESH_COOKIE);
      if (token) await service.logout({ refreshToken: token });
      clearSessionCookies(res);
      res.json({ success: true });
      return;
    }
    const input = refreshSchema.parse(req.body);
    const result = await service.logout(input);
    res.json(result);
  }),
);

// Usado pelo web para restaurar a sessão no reload (cookie) e pelo mobile para validar o token.
authRouter.get(
  '/auth/session',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const user = await authRepository.findUserById(req.userId ?? '');
    if (!user) throw new HttpError(401, 'Usuario nao encontrado');
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: req.userRole ?? user.role } });
  }),
);
