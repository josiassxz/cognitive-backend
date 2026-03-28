import { Router } from 'express';

export const contractsRouter = Router();

contractsRouter.get('/', (_req, res) => {
  res.json({
    version: '1.0.0',
    auth: {
      signup: {
        method: 'POST',
        path: '/api/signup',
        body: { email: 'string', password: 'string>=6', name: 'string?' },
        response: { success: 'boolean', userId: 'string' },
        errors: ['VALIDATION_ERROR', 'HTTP_400'],
      },
      login: {
        method: 'POST',
        path: '/api/auth/login',
        body: { email: 'string', password: 'string' },
        response: {
          accessToken: 'string',
          refreshToken: 'string',
          user: { id: 'string', email: 'string', name: 'string|null', role: 'user|admin' },
        },
        errors: ['VALIDATION_ERROR', 'HTTP_401'],
      },
      refresh: {
        method: 'POST',
        path: '/api/auth/refresh',
        body: { refreshToken: 'string' },
        response: {
          accessToken: 'string',
          refreshToken: 'string',
          user: { id: 'string', email: 'string', name: 'string|null', role: 'user|admin' },
        },
        errors: ['VALIDATION_ERROR', 'HTTP_401'],
      },
      logout: {
        method: 'POST',
        path: '/api/auth/logout',
        body: { refreshToken: 'string' },
        response: { success: 'boolean' },
      },
    },
    errorShape: {
      error: 'string',
      code: 'string',
      details: 'object? (validation only)',
    },
  });
});
