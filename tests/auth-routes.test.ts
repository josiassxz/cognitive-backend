import bcrypt from 'bcryptjs';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app';

const mockPrisma = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  userStreak: {
    create: vi.fn(),
  },
  userMonthProgress: {
    createMany: vi.fn(),
  },
  refreshToken: {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
  },
  $transaction: vi.fn(),
}));

vi.mock('../src/lib/prisma', () => ({
  prisma: mockPrisma,
}));

describe('auth api routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.user.create.mockResolvedValue({
      id: 'user-1',
      email: 'john@doe.com',
      name: 'John',
      passwordHash: 'hash',
      role: 'user',
    });
    mockPrisma.userStreak.create.mockResolvedValue(undefined);
    mockPrisma.userMonthProgress.createMany.mockResolvedValue(undefined);
    mockPrisma.$transaction.mockResolvedValue(undefined);
    mockPrisma.refreshToken.create.mockResolvedValue(undefined);
    mockPrisma.refreshToken.update.mockResolvedValue(undefined);
    mockPrisma.refreshToken.findUnique.mockResolvedValue(null);
  });

  it('faz signup com sucesso', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    const app = createApp();
    const response = await request(app).post('/api/signup').send({
      email: 'john@doe.com',
      password: '123456',
      name: 'John',
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, userId: 'user-1' });
    expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('bloqueia signup com email duplicado', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'john@doe.com',
      name: 'John',
      passwordHash: 'hash',
      role: 'user',
    });
    const app = createApp();
    const response = await request(app).post('/api/signup').send({
      email: 'john@doe.com',
      password: '123456',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Email ja cadastrado', code: 'HTTP_400' });
  });

  it('faz login com sucesso e retorna tokens', async () => {
    const passwordHash = await bcrypt.hash('123456', 12);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'john@doe.com',
      name: 'John',
      passwordHash,
      role: 'user',
    });
    const app = createApp();
    const response = await request(app).post('/api/auth/login').send({
      email: 'john@doe.com',
      password: '123456',
    });
    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject({
      id: 'user-1',
      email: 'john@doe.com',
      name: 'John',
      role: 'user',
    });
    expect(typeof response.body.accessToken).toBe('string');
    expect(typeof response.body.refreshToken).toBe('string');
    expect(mockPrisma.refreshToken.create).toHaveBeenCalledTimes(1);
  });

  it('retorna erro no login com senha invalida', async () => {
    const passwordHash = await bcrypt.hash('123456', 12);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'john@doe.com',
      name: 'John',
      passwordHash,
      role: 'user',
    });
    const app = createApp();
    const response = await request(app).post('/api/auth/login').send({
      email: 'john@doe.com',
      password: 'senha-errada',
    });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Credenciais invalidas', code: 'HTTP_401' });
  });

  it('faz refresh com rotacao de token', async () => {
    const passwordHash = await bcrypt.hash('123456', 12);
    mockPrisma.user.findUnique
      .mockResolvedValueOnce({
        id: 'user-1',
        email: 'john@doe.com',
        name: 'John',
        passwordHash,
        role: 'user',
      })
      .mockResolvedValueOnce({
        id: 'user-1',
        email: 'john@doe.com',
        name: 'John',
        passwordHash,
        role: 'user',
      });
    mockPrisma.refreshToken.findUnique.mockImplementation(async ({ where }: { where: { tokenHash: string } }) => ({
      id: 'rt-1',
      userId: 'user-1',
      tokenHash: where.tokenHash,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      revokedAt: null,
    }));

    const app = createApp();
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'john@doe.com',
      password: '123456',
    });
    const refreshResponse = await request(app).post('/api/auth/refresh').send({
      refreshToken: loginResponse.body.refreshToken,
    });

    expect(refreshResponse.status).toBe(200);
    expect(typeof refreshResponse.body.accessToken).toBe('string');
    expect(typeof refreshResponse.body.refreshToken).toBe('string');
    expect(mockPrisma.refreshToken.update).toHaveBeenCalledTimes(1);
  });

  it('faz logout com sucesso', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValue({
      id: 'rt-1',
      userId: 'user-1',
      tokenHash: 'hash',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      revokedAt: null,
    });
    const app = createApp();
    const response = await request(app).post('/api/auth/logout').send({
      refreshToken: 'any-token',
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(mockPrisma.refreshToken.update).toHaveBeenCalledTimes(1);
  });
});
