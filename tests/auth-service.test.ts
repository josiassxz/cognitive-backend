import { describe, expect, it, vi } from 'vitest';
import { AuthRefreshToken, AuthRepository, AuthService } from '../src/services/auth-service';
import { AuthUser } from '../src/services/auth-service';

function makeUser(overrides?: Partial<AuthUser>): AuthUser {
  return {
    id: 'user-id',
    name: 'Josias',
    email: 'josias@email.com',
    passwordHash: 'hashed-password',
    role: 'user',
    ...overrides,
  };
}

function makeRefreshToken(overrides?: Partial<AuthRefreshToken>): AuthRefreshToken {
  return {
    id: 'rt-1',
    userId: 'user-id',
    tokenHash: 'hash',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    revokedAt: null,
    ...overrides,
  };
}

function makeRepository(overrides?: Partial<AuthRepository>): AuthRepository {
  return {
    findUserByEmail: vi.fn().mockResolvedValue(null),
    findUserById: vi.fn().mockResolvedValue(makeUser()),
    createUser: vi.fn().mockResolvedValue(makeUser()),
    createInitialProgress: vi.fn().mockResolvedValue(undefined),
    createRefreshToken: vi.fn().mockResolvedValue(undefined),
    findRefreshTokenByHash: vi.fn().mockResolvedValue(null),
    revokeRefreshToken: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('AuthService', () => {
  it('cria usuario no signup com hash e progresso inicial', async () => {
    const repository = makeRepository();

    const service = new AuthService(
      repository,
      {
        hash: vi.fn().mockResolvedValue('new-hash'),
        compare: vi.fn(),
      },
      {
        signAccess: vi.fn(),
        signRefresh: vi.fn(),
        verify: vi.fn(),
      },
    );

    const result = await service.signup({
      email: 'josias@email.com',
      password: '123456',
      name: 'Josias',
    });

    expect(result).toEqual({ success: true, userId: 'user-id' });
    expect(repository.findUserByEmail).toHaveBeenCalledWith('josias@email.com');
    expect(repository.createUser).toHaveBeenCalledWith({
      email: 'josias@email.com',
      passwordHash: 'new-hash',
      name: 'Josias',
      role: 'user',
    });
    expect(repository.createInitialProgress).toHaveBeenCalledWith('user-id');
  });

  it('bloqueia signup com email duplicado', async () => {
    const repository = makeRepository({
      findUserByEmail: vi.fn().mockResolvedValue(makeUser()),
    });

    const service = new AuthService(repository);

    await expect(
      service.signup({ email: 'josias@email.com', password: '123456' }),
    ).rejects.toMatchObject({
      statusCode: 400,
      message: 'Email ja cadastrado',
    });
  });

  it('retorna access e refresh no login com credenciais validas', async () => {
    const repository = makeRepository({
      findUserByEmail: vi.fn().mockResolvedValue(makeUser()),
    });

    const service = new AuthService(
      repository,
      {
        hash: vi.fn(),
        compare: vi.fn().mockResolvedValue(true),
      },
      {
        signAccess: vi.fn().mockReturnValue('access-token'),
        signRefresh: vi.fn().mockReturnValue('refresh-token'),
        verify: vi.fn().mockReturnValue({
          id: 'user-id',
          tokenType: 'refresh',
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
      },
    );

    const result = await service.login({
      email: 'josias@email.com',
      password: '123456',
    });

    expect(result).toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: { id: 'user-id', email: 'josias@email.com', name: 'Josias', role: 'user' },
    });
    expect(repository.createRefreshToken).toHaveBeenCalledTimes(1);
  });

  it('retorna erro no login com senha invalida', async () => {
    const repository = makeRepository({
      findUserByEmail: vi.fn().mockResolvedValue(makeUser()),
    });

    const service = new AuthService(
      repository,
      {
        hash: vi.fn(),
        compare: vi.fn().mockResolvedValue(false),
      },
      {
        signAccess: vi.fn(),
        signRefresh: vi.fn(),
        verify: vi.fn(),
      },
    );

    await expect(
      service.login({ email: 'josias@email.com', password: 'senha-errada' }),
    ).rejects.toMatchObject({
      statusCode: 401,
      message: 'Credenciais invalidas',
    });
  });

  it('rotaciona refresh token no refresh', async () => {
    const repository = makeRepository({
      findRefreshTokenByHash: vi.fn().mockResolvedValue(makeRefreshToken()),
    });

    const service = new AuthService(
      repository,
      {
        hash: vi.fn(),
        compare: vi.fn(),
      },
      {
        signAccess: vi.fn().mockReturnValue('new-access'),
        signRefresh: vi.fn().mockReturnValue('new-refresh'),
        verify: vi
          .fn()
          .mockReturnValueOnce({ id: 'user-id', tokenType: 'refresh', exp: Math.floor(Date.now() / 1000) + 3600 })
          .mockReturnValueOnce({ id: 'user-id', tokenType: 'refresh', exp: Math.floor(Date.now() / 1000) + 7200 }),
      },
    );

    const result = await service.refresh({ refreshToken: 'old-refresh' });

    expect(result.accessToken).toBe('new-access');
    expect(result.refreshToken).toBe('new-refresh');
    expect(repository.revokeRefreshToken).toHaveBeenCalledTimes(1);
    expect(repository.createRefreshToken).toHaveBeenCalledTimes(1);
  });
});
