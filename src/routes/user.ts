import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { XP_CONFIG, getLevelForXp } from '../lib/xp';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { mapCefrToMonth } from '../services/content-service';

function mapMonthToCefr(month: number): 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2' {
  if (month <= 1) return 'a1';
  if (month === 2) return 'a2';
  if (month === 3) return 'b1';
  if (month === 4) return 'b2';
  if (month === 5) return 'c1';
  return 'c2';
}

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
        select: { id: true, name: true, email: true, currentMonth: true, dailyGoalMinutes: true, createdAt: true },
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
      user: {
        ...user,
        currentCefrLevel: mapMonthToCefr(user.currentMonth),
      },
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

userRouter.post(
  '/streak/freeze',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const streak = await prisma.userStreak.findUnique({ where: { userId } });
    if (!streak) throw new HttpError(404, 'Streak nao encontrado');

    // Use raw update to handle new fields added after last type generation
    await prisma.$executeRaw`
      UPDATE "UserStreak"
      SET "lastActiveAt" = NOW(),
          "freezesAvailable" = GREATEST(0, "freezesAvailable" - 1),
          "lastFreezeUsedAt" = NOW()
      WHERE "userId" = ${userId}
        AND "freezesAvailable" > 0
    `;

    res.json({ success: true, message: 'Streak protegido com freeze!' });
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
    const toggledTo = !tasks[taskId];
    if (toggledTo) {
      tasks[taskId] = true;
    } else {
      delete tasks[taskId];
    }
    const hasAnyTaskChecked = Object.values(tasks).some(Boolean);
    if (!hasAnyTaskChecked) {
      if (record) {
        await prisma.userChecklist.delete({ where: { id: record.id } });
      }
    } else {
      await prisma.userChecklist.upsert({
        where: { userId_date: { userId, date: today } },
        update: { tasks: JSON.stringify(tasks) },
        create: { userId, date: today, tasks: JSON.stringify(tasks) },
      });
    }

    const completedCount = CHECKLIST_TASKS.filter((key) => tasks[key]).length;
    if (toggledTo && completedCount >= CHECKLIST_TASKS.length) {
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
            detail: `Checklist completo ${today}`,
          },
        });

        const completedDays = await prisma.userChecklist.count({
          where: {
            userId,
            AND: CHECKLIST_TASKS.map((task) => ({ tasks: { contains: `"${task}":true` } })),
          },
        });
        if (completedDays >= 7) await awardBadgeIfEligible(userId, 'checklist-7');
      }
    }

    res.json({ date: today, tasks, toggledTo, alreadyCompleted: !toggledTo });
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
    const { duration, sessionId, module } = z
      .object({
        duration: z.number().int().positive(),
        sessionId: z.string().min(8).max(120),
        module: z.enum(['music', 'reading', 'quiz', 'flashcards', 'podcast', 'vocabulary', 'livre']).default('livre'),
      })
      .parse(req.body);
    const xpEarned = XP_CONFIG.timer_session;

    await ensureSubmissionNotProcessed(userId, 'timer', sessionId);

    await prisma.userTimerSession.create({
      data: { userId, duration, xpEarned, module },
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
  '/timer/today-breakdown',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const sessions = await prisma.userTimerSession.findMany({
      where: { userId, completedAt: { gte: todayStart } },
      select: { module: true, duration: true },
    });

    const breakdown = sessions.reduce<Record<string, number>>((acc, s) => {
      acc[s.module] = (acc[s.module] ?? 0) + s.duration;
      return acc;
    }, {});

    const totalSeconds = sessions.reduce((sum, s) => sum + s.duration, 0);
    res.json({ breakdown, totalSeconds });
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

userRouter.get(
  '/saved-phrases',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const status = typeof req.query.status === 'string' && req.query.status !== 'all' ? req.query.status : undefined;
    const sourceType = typeof req.query.sourceType === 'string' ? req.query.sourceType : undefined;
    const songId = req.query.songId ? z.coerce.number().int().positive().parse(req.query.songId) : undefined;
    const limit = z.coerce.number().int().min(1).max(200).default(50).parse(req.query.limit ?? 50);
    const offset = z.coerce.number().int().min(0).default(0).parse(req.query.offset ?? 0);
    const where: { userId: string; status?: string; songId?: number; sourceType?: string } = { userId };
    if (status) where.status = status;
    if (songId) where.songId = songId;
    if (sourceType) where.sourceType = sourceType;

    const [items, total] = await Promise.all([
      prisma.userSavedPhrase.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.userSavedPhrase.count({ where }),
    ]);

    res.json({ items, total, limit, offset });
  }),
);

userRouter.post(
  '/saved-phrases',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const input = z
      .object({
        phrase: z.string().min(1),
        translation: z.string().min(1),
        context: z.string().default(''),
        songId: z.number().int().positive().optional(),
        sourceType: z.enum(['lyric_click', 'reading_click']).optional(),
      })
      .parse(req.body);

    const normalizedPhrase = input.phrase.toLowerCase().trim();
    const normalizedContext = input.context.trim();
    const existing = await prisma.userSavedPhrase.findFirst({
      where: {
        userId,
        phrase: normalizedPhrase,
        context: normalizedContext,
      },
    });
    if (existing) {
      res.json({ success: true, id: existing.id, message: 'Frase ja salva' });
      return;
    }

    const saved = await prisma.userSavedPhrase.create({
      data: {
        userId,
        phrase: normalizedPhrase,
        translation: input.translation.trim(),
        context: normalizedContext,
        songId: input.songId ?? null,
        sourceType: input.sourceType ?? (input.songId ? 'lyric_click' : 'reading_click'),
      },
    });

    await prisma.xpLog.create({
      data: {
        userId,
        amount: XP_CONFIG.lyric_phrase_saved,
        source: 'lyrics',
        detail: `saved_phrase:${saved.id}|${saved.phrase}`,
      },
    });

    res.json({ success: true, id: saved.id });
  }),
);

userRouter.delete(
  '/saved-phrases',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const { id } = z.object({ id: z.number().int().positive() }).parse(req.body);
    await prisma.userSavedPhrase.deleteMany({ where: { id, userId } });
    res.json({ success: true });
  }),
);

userRouter.post(
  '/saved-phrases/to-flashcards',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const input = z
      .object({
        phraseIds: z.union([z.literal('all'), z.array(z.number().int().positive())]).optional(),
      })
      .parse(req.body ?? {});

    const where: { userId: string; status: string; id?: { in: number[] } } = { userId, status: 'saved' };
    if (Array.isArray(input.phraseIds) && input.phraseIds.length > 0) {
      where.id = { in: input.phraseIds };
    }

    const phrases = await prisma.userSavedPhrase.findMany({ where });
    if (phrases.length === 0) throw new HttpError(400, 'Nenhuma frase para converter');

    for (const phrase of phrases) {
      const vocab = await prisma.vocabulary.upsert({
        where: {
          word_month: {
            word: phrase.phrase,
            month: 1,
          },
        },
        update: {},
        create: {
          word: phrase.phrase,
          type: 'frase',
          definition: phrase.translation,
          example: phrase.context,
          month: 1,
          level: 'personalizado',
          category: phrase.sourceType === 'reading_click' ? 'leitura' : 'musica',
        },
      });

      await prisma.flashcardProgress.upsert({
        where: {
          userId_vocabularyId: {
            userId,
            vocabularyId: vocab.id,
          },
        },
        update: {},
        create: {
          userId,
          vocabularyId: vocab.id,
          ease: 2.5,
          interval: 1,
          repetitions: 0,
          nextReviewAt: new Date(),
        },
      });
    }

    await prisma.userSavedPhrase.updateMany({
      where: {
        userId,
        id: { in: phrases.map((item: { id: number }) => item.id) },
      },
      data: { status: 'learning' },
    });

    await prisma.xpLog.create({
      data: {
        userId,
        amount: XP_CONFIG.lyric_phrases_to_flashcard,
        source: 'lyrics',
        detail: `saved_phrase_to_flashcards:${phrases.length}`,
      },
    });

    res.json({
      success: true,
      converted: phrases.length,
      message: `${phrases.length} frase(s) adicionada(s) aos flashcards`,
    });
  }),
);

userRouter.patch(
  '/saved-phrases/:id',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const id = z.coerce.number().int().positive().parse(req.params.id);
    const input = z.object({ status: z.enum(['saved', 'learning', 'mastered']) }).parse(req.body);

    const found = await prisma.userSavedPhrase.findFirst({ where: { id, userId } });
    if (!found) throw new HttpError(404, 'Frase nao encontrada');

    await prisma.userSavedPhrase.update({ where: { id }, data: { status: input.status } });
    res.json({ success: true });
  }),
);

userRouter.delete(
  '/saved-phrases/:id',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const id = z.coerce.number().int().positive().parse(req.params.id);
    await prisma.userSavedPhrase.deleteMany({ where: { id, userId } });
    res.json({ success: true });
  }),
);

userRouter.patch(
  '/settings',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const { dailyGoalMinutes } = z.object({
      dailyGoalMinutes: z.number().int().min(5).max(180),
    }).parse(req.body);
    await prisma.user.update({ where: { id: userId }, data: { dailyGoalMinutes } });
    res.json({ success: true });
  }),
);

userRouter.get(
  '/activity-heatmap',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const since = new Date();
    since.setDate(since.getDate() - 90);

    const logs = await prisma.xpLog.findMany({
      where: { userId, createdAt: { gte: since } },
      select: { createdAt: true, amount: true },
    });

    const heatmap: Record<string, number> = {};
    for (const log of logs) {
      const date = log.createdAt.toISOString().split('T')[0];
      heatmap[date] = (heatmap[date] ?? 0) + log.amount;
    }

    res.json({ heatmap });
  }),
);

userRouter.get(
  '/quiz-accuracy',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const attempts = await prisma.quizAttempt.findMany({
      where: { userId },
      select: { quizType: true, totalQ: true, correct: true },
    });

    const byType: Record<string, { correct: number; total: number }> = {};
    for (const a of attempts) {
      if (!byType[a.quizType]) byType[a.quizType] = { correct: 0, total: 0 };
      byType[a.quizType].correct += a.correct;
      byType[a.quizType].total += a.totalQ;
    }

    const result = Object.entries(byType).map(([type, stats]) => ({
      type,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      total: stats.total,
    }));

    res.json({ accuracy: result });
  }),
);

userRouter.get(
  '/leaderboard',
  asyncHandler(async (_req, res) => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const rows = await prisma.xpLog.groupBy({
      by: ['userId'],
      where: { createdAt: { gte: weekStart } },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 20,
    });

    const userIds = rows.map((r) => r.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true },
    });

    const result = rows.map((row, i) => ({
      position: i + 1,
      userId: row.userId,
      name: users.find((u) => u.id === row.userId)?.name ?? 'Anonimo',
      xpThisWeek: row._sum.amount ?? 0,
    }));

    res.json({ leaderboard: result, weekStart });
  }),
);

userRouter.patch(
  '/cefr-level',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const { cefrLevel } = z
      .object({ cefrLevel: z.enum(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']) })
      .parse(req.body);

    await prisma.user.update({
      where: { id: userId },
      data: { currentMonth: mapCefrToMonth(cefrLevel) },
    });

    res.json({ success: true, cefrLevel });
  }),
);

