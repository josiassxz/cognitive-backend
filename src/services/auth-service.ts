import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { signAccessToken, signRefreshToken, verifyToken } from '../lib/jwt';
import { hashToken } from '../lib/token-hash';
import { HttpError } from '../utils/http-error';

export type AuthUser = {
  id: string;
  name: string | null;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
};

export type AuthRefreshToken = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
};

export type AuthRepository = {
  findUserByEmail(email: string): Promise<AuthUser | null>;
  findUserById(userId: string): Promise<AuthUser | null>;
  createUser(input: { email: string; passwordHash: string; name: string; role: 'user' | 'admin' }): Promise<AuthUser>;
  createInitialProgress(userId: string): Promise<void>;
  createRefreshToken(input: { userId: string; tokenHash: string; expiresAt: Date; replacedBy?: string }): Promise<void>;
  findRefreshTokenByHash(tokenHash: string): Promise<AuthRefreshToken | null>;
  revokeRefreshToken(input: { id: string; replacedBy?: string }): Promise<void>;
};

export type PasswordManager = {
  hash(value: string, rounds: number): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
};

export type TokenManager = {
  signAccess(payload: { id: string; email: string; name: string | null; role: 'user' | 'admin' }): string;
  signRefresh(payload: { id: string }): string;
  verify(token: string): ReturnType<typeof verifyToken> & { exp: number };
};

const defaultPasswordManager: PasswordManager = {
  hash: bcrypt.hash,
  compare: bcrypt.compare,
};

const defaultTokenManager: TokenManager = {
  signAccess: signAccessToken,
  signRefresh: signRefreshToken,
  verify: (token) => verifyToken(token) as ReturnType<typeof verifyToken> & { exp: number },
};

export class AuthService {
  private readonly adminEmails: Set<string> = new Set(
    env.ADMIN_EMAILS.split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );

  constructor(
    private readonly repository: AuthRepository,
    private readonly passwordManager: PasswordManager = defaultPasswordManager,
    private readonly tokenManager: TokenManager = defaultTokenManager,
  ) {}

  private resolveRole(user: Pick<AuthUser, 'role' | 'email'>): 'user' | 'admin' {
    if (this.adminEmails.has(user.email.toLowerCase())) return 'admin';
    return user.role;
  }

  async signup(input: { email: string; password: string; name?: string }) {
    const existing = await this.repository.findUserByEmail(input.email);
    if (existing) {
      throw new HttpError(400, 'Email ja cadastrado');
    }

    const passwordHash = await this.passwordManager.hash(input.password, 12);
    const name = input.name?.trim() || input.email.split('@')[0];
    const role: 'user' | 'admin' = this.adminEmails.has(input.email.toLowerCase()) ? 'admin' : 'user';

    const user = await this.repository.createUser({
      email: input.email,
      passwordHash,
      name,
      role,
    });

    await this.repository.createInitialProgress(user.id);

    return { success: true, userId: user.id };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.repository.findUserByEmail(input.email);
    if (!user) {
      throw new HttpError(401, 'Credenciais invalidas');
    }

    const isValidPassword = await this.passwordManager.compare(input.password, user.passwordHash);
    if (!isValidPassword) {
      throw new HttpError(401, 'Credenciais invalidas');
    }

    const role = this.resolveRole(user);
    const accessToken = this.tokenManager.signAccess({
      id: user.id,
      email: user.email,
      name: user.name,
      role,
    });
    const refreshToken = this.tokenManager.signRefresh({
      id: user.id,
    });
    const decodedRefresh = this.tokenManager.verify(refreshToken);
    if (decodedRefresh.tokenType !== 'refresh') {
      throw new HttpError(500, 'Falha ao gerar refresh token');
    }
    const expiresAt = new Date(decodedRefresh.exp * 1000);
    await this.repository.createRefreshToken({
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt,
    });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name, role },
    };
  }

  async refresh(input: { refreshToken: string }) {
    const decoded = this.tokenManager.verify(input.refreshToken);
    if (decoded.tokenType !== 'refresh') {
      throw new HttpError(401, 'Refresh token invalido');
    }

    const storedToken = await this.repository.findRefreshTokenByHash(hashToken(input.refreshToken));
    if (!storedToken || storedToken.revokedAt || storedToken.expiresAt.getTime() <= Date.now()) {
      throw new HttpError(401, 'Refresh token invalido');
    }

    const user = await this.repository.findUserById(decoded.id);
    if (!user) throw new HttpError(401, 'Usuario nao encontrado');

    const role = this.resolveRole(user);
    const nextAccessToken = this.tokenManager.signAccess({
      id: user.id,
      email: user.email,
      name: user.name,
      role,
    });
    const nextRefreshToken = this.tokenManager.signRefresh({ id: user.id });
    const nextRefreshDecoded = this.tokenManager.verify(nextRefreshToken);
    if (nextRefreshDecoded.tokenType !== 'refresh') {
      throw new HttpError(500, 'Falha ao gerar refresh token');
    }

    const newTokenHash = hashToken(nextRefreshToken);
    await this.repository.revokeRefreshToken({
      id: storedToken.id,
      replacedBy: newTokenHash,
    });
    await this.repository.createRefreshToken({
      userId: user.id,
      tokenHash: newTokenHash,
      expiresAt: new Date(nextRefreshDecoded.exp * 1000),
    });

    return {
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
      user: { id: user.id, email: user.email, name: user.name, role },
    };
  }

  async logout(input: { refreshToken: string }) {
    const tokenHash = hashToken(input.refreshToken);
    const storedToken = await this.repository.findRefreshTokenByHash(tokenHash);
    if (!storedToken) return { success: true };
    await this.repository.revokeRefreshToken({ id: storedToken.id });
    return { success: true };
  }
}
