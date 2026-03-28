import { Router } from 'express';
import { z } from 'zod';
import { authRepository } from '../repositories/auth-repository';
import { AuthService } from '../services/auth-service';
import { asyncHandler } from '../utils/async-handler';

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
    res.json(result);
  }),
);

authRouter.post(
  '/auth/refresh',
  asyncHandler(async (req, res) => {
    const input = refreshSchema.parse(req.body);
    const result = await service.refresh(input);
    res.json(result);
  }),
);

authRouter.post(
  '/auth/logout',
  asyncHandler(async (req, res) => {
    const input = refreshSchema.parse(req.body);
    const result = await service.logout(input);
    res.json(result);
  }),
);
