import { prisma } from '../lib/prisma';
import { AuthRepository } from '../services/auth-service';

function mapRole(role: string): 'user' | 'admin' {
  return role === 'admin' ? 'admin' : 'user';
}

export const authRepository: AuthRepository = {
  async findUserByEmail(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return { ...user, role: mapRole(user.role) };
  },
  async findUserById(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;
    return { ...user, role: mapRole(user.role) };
  },
  async createUser(input) {
    const user = await prisma.user.create({ data: input });
    return { ...user, role: mapRole(user.role) };
  },
  async createInitialProgress(userId) {
    await prisma.$transaction([
      prisma.userStreak.create({ data: { userId } }),
      prisma.userMonthProgress.createMany({
        data: [1, 2, 3, 4, 5, 6].map((month) => ({
          userId,
          month,
          progress: 0,
        })),
      }),
    ]);
  },
  async createRefreshToken(input) {
    await prisma.refreshToken.create({
      data: {
        userId: input.userId,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
        replacedBy: input.replacedBy,
      },
    });
  },
  async findRefreshTokenByHash(tokenHash) {
    return prisma.refreshToken.findUnique({ where: { tokenHash } });
  },
  async revokeRefreshToken(input) {
    await prisma.refreshToken.update({
      where: { id: input.id },
      data: {
        revokedAt: new Date(),
        replacedBy: input.replacedBy,
      },
    });
  },
};
