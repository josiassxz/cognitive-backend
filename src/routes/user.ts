import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { XP_CONFIG, getLevelForXp } from '../lib/xp';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

const CHECKLIST_TASKS = [
  'focused-study',
  'passive-immersion',
  'music-analysis',
  'vocabulary',
  'podcast',
  'pronunciation',
];

async function awardBadgeIfEligible(userId: string, slug: string): Promise<boolean> {
  const badge = await prisma.badge.findUnique({ where: { slug } });
  if (!badge) return false;
  const exists = await prisma.userBadge.findUnique({
    where: { userId_badgeId: { userId, badgeId: badge.id } },
  });
  if (exists) return false;
  await prisma.userBadge.create({ data: { userId, badgeId: badge.id } });
  if (badge.xpReward > 0) {
    await prisma.xpLog.create({
      data: { userId, amount: badge.xpReward, source: 'badge', detail: `Badge: ${badge.name}` },
    });
  }
  return true;
}

export const userRouter = Router();

async function ensureSubmissionNotProcessed(userId: string, source: string, submissionId: string) {
  const existing = await prisma.xpLog.findFirst({
    where: {
      userId,
      source,
      detail: { startsWith: `submission:${submissionId}|` },
    },
  });

  if (existing) {
    throw new HttpError(409, 'Atividade ja finalizada para esta sessao');
  }
}

userRouter.get(
  '/profile',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const [
      user,
      xpAgg,
      streak,
      badges,
      quizCount,
      flashcardCount,
      timerCount,
      collocationMastered,
      collocationAttempted,
      sentenceMastered,
      sentenceAttempted,
    ] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, currentMonth: true, createdAt: true },
      }),
      prisma.xpLog.aggregate({ where: { userId }, _sum: { amount: true } }),
      prisma.userStreak.findUnique({ where: { userId } }),
      prisma.userBadge.findMany({
        where: { userId },
        include: { badge: true },
        orderBy: { earnedAt: 'desc' },
      }),
      prisma.quizAttempt.count({ where: { userId } }),
      prisma.flashcardProgress.count({ where: { userId } }),
      prisma.userTimerSession.count({ where: { userId } }),
      prisma.userCollocationProgress.count({ where: { userId, mastered: true } }),
      prisma.userCollocationProgress.count({ where: { userId } }),
      prisma.userSentenceProgress.count({ where: { userId, mastered: true } }),
      prisma.userSentenceProgress.count({ where: { userId } }),
    ]);

    if (!user) throw new HttpError(404, 'Usuario nao encontrado');

    const totalXp = xpAgg._sum.amount ?? 0;
    const level = getLevelForXp(totalXp);

    res.json({
      user,
      totalXp,
      level,
      streak: streak ?? { current: 0, longest: 0 },
      badges: badges.map((item: { badge: Record<string, unknown>; earnedAt: Date }) => ({
        ...item.badge,
        earnedAt: item.earnedAt,
      })),
      stats: {
        quizzes: quizCount,
        flashcards: flashcardCount,
        timerSessions: timerCount,
        collocations: { mastered: collocationMastered, attempted: collocationAttempted },
        sentences: { mastered: sentenceMastered, attempted: sentenceAttempted },
      },
    });
  }),
);

userRouter.post(
  '/streak',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    let streak = await prisma.userStreak.findUnique({ where: { userId } });

    if (!streak) {
      streak = await prisma.userStreak.create({
        data: { userId, current: 1, longest: 1, lastActiveAt: now },
      });
      await prisma.xpLog.create({
        data: { userId, amount: XP_CONFIG.daily_login, source: 'login', detail: 'Login diario' },
      });
      res.json({ streak, xpEarned: XP_CONFIG.daily_login, isNewDay: true });
      return;
    }

    const lastDate = streak.lastActiveAt.toISOString().split('T')[0];
    if (lastDate === today) {
      res.json({ streak, xpEarned: 0, isNewDay: false });
      return;
    }

    const yesterday = new Date(now.getTime() - 86400000).toISOString().split('T')[0];
    const newCurrent = lastDate === yesterday ? streak.current + 1 : 1;
    const newLongest = Math.max(streak.longest, newCurrent);

    streak = await prisma.userStreak.update({
      where: { userId },
      data: { current: newCurrent, longest: newLongest, lastActiveAt: now },
    });

    const streakBonus = Math.min(newCurrent, 10) * XP_CONFIG.streak_bonus_multiplier;
    const totalXp = XP_CONFIG.daily_login + streakBonus;
    await prisma.xpLog.create({
      data: { userId, amount: totalXp, source: 'login', detail: `Login + streak ${newCurrent} dias` },
    });

    if (newCurrent >= 3) await awardBadgeIfEligible(userId, 'streak-3');
    if (newCurrent >= 7) await awardBadgeIfEligible(userId, 'streak-7');
    if (newCurrent >= 30) await awardBadgeIfEligible(userId, 'streak-30');

    res.json({ streak, xpEarned: totalXp, isNewDay: true });
  }),
);

userRouter.get(
  '/checklist',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const today = new Date().toISOString().split('T')[0];
    const record = await prisma.userChecklist.findUnique({
      where: { userId_date: { userId, date: today } },
    });
    const tasks = record ? (JSON.parse(record.tasks) as Record<string, boolean>) : {};
    res.json({ date: today, tasks });
  }),
);

userRouter.post(
  '/checklist',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const { taskId } = z.object({ taskId: z.string().min(1) }).parse(req.body);
    if (!CHECKLIST_TASKS.includes(taskId)) {
      throw new HttpError(400, 'taskId invalido');
    }

    const today = new Date().toISOString().split('T')[0];
    const record = await prisma.userChecklist.findUnique({
      where: { userId_date: { userId, date: today } },
    });
    const tasks: Record<string, boolean> = record ? JSON.parse(record.tasks) : {};
    const alreadyCompleted = !!tasks[taskId];
    if (!alreadyCompleted) {
      tasks[taskId] = true;
    }
    const tasksJson = JSON.stringify(tasks);

    if (record && !alreadyCompleted) {
      await prisma.userChecklist.update({ where: { id: record.id }, data: { tasks: tasksJson } });
    } else if (!record) {
      await prisma.userChecklist.create({ data: { userId, date: today, tasks: tasksJson } });
    }

    const completedCount = CHECKLIST_TASKS.filter((key) => tasks[key]).length;
    if (completedCount >= CHECKLIST_TASKS.length) {
      const todayStart = new Date(today);
      const todayEnd = new Date(todayStart.getTime() + 86400000);
      const alreadyAwarded = await prisma.xpLog.findFirst({
        where: {
          userId,
          source: 'checklist',
          createdAt: { gte: todayStart, lt: todayEnd },
        },
      });

      if (!alreadyAwarded) {
        await prisma.xpLog.create({
          data: {
            userId,
            amount: XP_CONFIG.checklist_complete,
            source: 'checklist',
            detail: 'Checklist completo',
          },
        });

        const completedDays = await prisma.userChecklist.count({
          where: { userId, tasks: { contains: '"pronunciation":true' } },
        });
        if (completedDays >= 7) await awardBadgeIfEligible(userId, 'checklist-7');
      }
    }

    res.json({ date: today, tasks, alreadyCompleted });
  }),
);

userRouter.get(
  '/timer',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sessions = await prisma.userTimerSession.findMany({
      where: { userId, completedAt: { gte: today } },
      orderBy: { completedAt: 'desc' },
    });
    res.json({ sessions });
  }),
);

userRouter.post(
  '/timer',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const { duration, sessionId } = z
      .object({
        duration: z.number().int().positive(),
        sessionId: z.string().min(8).max(120),
      })
      .parse(req.body);
    const xpEarned = XP_CONFIG.timer_session;

    await ensureSubmissionNotProcessed(userId, 'timer', sessionId);

    await prisma.userTimerSession.create({
      data: { userId, duration, xpEarned },
    });
    await prisma.xpLog.create({
      data: {
        userId,
        amount: xpEarned,
        source: 'timer',
        detail: `submission:${sessionId}|Sessao de ${Math.round(duration / 60)} min`,
      },
    });

    const totalSessions = await prisma.userTimerSession.count({ where: { userId } });
    if (totalSessions >= 5) await awardBadgeIfEligible(userId, 'timer-5');
    if (totalSessions >= 30) await awardBadgeIfEligible(userId, 'timer-30');

    res.json({ xpEarned, totalSessions });
  }),
);

userRouter.get(
  '/xp',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const [agg, recent] = await Promise.all([
      prisma.xpLog.aggregate({ where: { userId }, _sum: { amount: true } }),
      prisma.xpLog.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 20 }),
    ]);

    const totalXp = agg._sum.amount ?? 0;
    const level = getLevelForXp(totalXp);

    if (totalXp >= 500) await awardBadgeIfEligible(userId, 'xp-500');
    if (totalXp >= 2000) await awardBadgeIfEligible(userId, 'xp-2000');
    if (totalXp >= 5000) await awardBadgeIfEligible(userId, 'xp-5000');

    res.json({ totalXp, level, recent });
  }),
);
