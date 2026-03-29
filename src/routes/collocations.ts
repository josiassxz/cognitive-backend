import { randomUUID } from 'crypto';
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { XP_CONFIG } from '../lib/xp';

async function awardBadgeIfEligible(userId: string, slug: string): Promise<void> {
  const badge = await prisma.badge.findUnique({ where: { slug } });
  if (!badge) return;
  const exists = await prisma.userBadge.findUnique({
    where: { userId_badgeId: { userId, badgeId: badge.id } },
  });
  if (exists) return;
  await prisma.userBadge.create({ data: { userId, badgeId: badge.id } });
  if (badge.xpReward > 0) {
    await prisma.xpLog.create({
      data: { userId, amount: badge.xpReward, source: 'badge', detail: `Badge: ${badge.name}` },
    });
  }
}

export const collocationsRouter = Router();

// ============ PUBLIC: Browse collocations ============
collocationsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = req.query.month ? z.coerce.number().int().min(1).max(6).parse(req.query.month) : undefined;
    const cefrLevel = typeof req.query.cefrLevel === 'string' ? req.query.cefrLevel.toLowerCase() : undefined;
    const type = typeof req.query.type === 'string' ? req.query.type : undefined;
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const limit = z.coerce.number().int().min(1).max(100).default(50).parse(req.query.limit ?? 50);
    const offset = z.coerce.number().int().min(0).default(0).parse(req.query.offset ?? 0);

    const where: Record<string, unknown> = {};
    if (month) where.month = month;
    if (cefrLevel) where.cefrLevel = cefrLevel;
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { phrase: { contains: search, mode: 'insensitive' } },
        { meaning: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.collocation.findMany({
        where,
        orderBy: [{ month: 'asc' }, { phrase: 'asc' }],
        take: limit,
        skip: offset,
      }),
      prisma.collocation.count({ where }),
    ]);

    res.json({ items, total, limit, offset });
  }),
);

// ============ PUBLIC: Get exercises for practice ============
collocationsRouter.get(
  '/exercises',
  asyncHandler(async (req, res) => {
    const month = req.query.month ? z.coerce.number().int().min(1).max(6).parse(req.query.month) : undefined;
    const cefrLevel = typeof req.query.cefrLevel === 'string' ? req.query.cefrLevel.toLowerCase() : undefined;
    const count = z.coerce.number().int().min(1).max(20).default(10).parse(req.query.count ?? 10);

    const where: Record<string, unknown> = {};
    if (month) where.month = month;
    if (cefrLevel) where.cefrLevel = cefrLevel;

    const total = await prisma.collocationExercise.count({ where });
    if (total === 0) {
      throw new HttpError(400, 'Nenhum exercicio de collocation disponivel para esses filtros');
    }

    // Get random exercises
    const allExercises = await prisma.collocationExercise.findMany({
      where,
      include: { collocation: true },
    });

    // Shuffle and pick
    const shuffled = allExercises.sort(() => Math.random() - 0.5).slice(0, count);

    const exercises = shuffled.map((ex) => ({
      id: ex.id,
      collocationId: ex.collocationId,
      promptType: ex.promptType,
      prompt: ex.prompt,
      options: [...ex.distractors, ex.correctAnswer].sort(() => Math.random() - 0.5),
      cefrLevel: ex.cefrLevel,
      month: ex.month,
      collocation: {
        phrase: ex.collocation.phrase,
        meaning: ex.collocation.meaning,
        example: ex.collocation.example,
      },
    }));

    res.json({ exercises, total: allExercises.length, sessionId: randomUUID() });
  }),
);

// ============ AUTH: Submit collocation exercise answers ============
collocationsRouter.post(
  '/exercises/submit',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const input = z.object({
      sessionId: z.string().min(8).max(120),
      answers: z.array(z.object({
        exerciseId: z.number().int().positive(),
        collocationId: z.number().int().positive(),
        selectedAnswer: z.string().trim().min(1),
        correctAnswer: z.string().optional(),
        isCorrect: z.boolean().optional(),
      })).min(1),
    }).parse(req.body);

    // Check duplicate submission
    const existing = await prisma.xpLog.findFirst({
      where: {
        userId,
        source: 'collocation',
        detail: { startsWith: `submission:${input.sessionId}|` },
      },
    });
    if (existing) throw new HttpError(409, 'Atividade ja finalizada para esta sessao');

    const exerciseIds = [...new Set(input.answers.map((answer) => answer.exerciseId))];
    const exercises = (await prisma.collocationExercise.findMany({
      where: { id: { in: exerciseIds } },
      select: { id: true, collocationId: true, correctAnswer: true },
    })) as Array<{ id: number; collocationId: number; correctAnswer: string }>;
    if (exercises.length !== exerciseIds.length) {
      throw new HttpError(400, 'Um ou mais exercicios de collocation sao invalidos');
    }
    const exerciseById = new Map<number, { id: number; collocationId: number; correctAnswer: string }>(
      exercises.map((exercise) => [exercise.id, exercise]),
    );

    const normalizedAnswers = input.answers.map((answer) => {
      const exercise = exerciseById.get(answer.exerciseId);
      if (!exercise || exercise.collocationId !== answer.collocationId) {
        throw new HttpError(400, 'Resposta invalida para o exercicio de collocation');
      }
      const isCorrect = answer.selectedAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
      return { ...answer, isCorrect };
    });

    const totalQ = normalizedAnswers.length;
    const correct = normalizedAnswers.filter((a) => a.isCorrect).length;
    const isPerfect = totalQ > 0 && correct === totalQ;
    let xpEarned = correct * XP_CONFIG.collocation_correct + XP_CONFIG.collocation_complete;
    if (isPerfect) xpEarned += XP_CONFIG.collocation_perfect_bonus;

    // Update per-collocation progress
    for (const answer of normalizedAnswers) {
      const progress = await prisma.userCollocationProgress.findUnique({
        where: { userId_collocationId: { userId, collocationId: answer.collocationId } },
      });

      if (progress) {
        const newCorrect = progress.correct + (answer.isCorrect ? 1 : 0);
        const newAttempts = progress.attempts + 1;
        await prisma.userCollocationProgress.update({
          where: { id: progress.id },
          data: {
            correct: newCorrect,
            attempts: newAttempts,
            mastered: newCorrect >= 3 && (newCorrect / newAttempts) >= 0.8,
            lastAttemptAt: new Date(),
          },
        });
      } else {
        await prisma.userCollocationProgress.create({
          data: {
            userId,
            collocationId: answer.collocationId,
            correct: answer.isCorrect ? 1 : 0,
            attempts: 1,
            mastered: false,
          },
        });
      }
    }

    // Log XP
    await prisma.xpLog.create({
      data: {
        userId,
        amount: xpEarned,
        source: 'collocation',
        detail: `submission:${input.sessionId}|Collocations: ${correct}/${totalQ}`,
      },
    });

    // Badge checks
    const totalAttempts = await prisma.userCollocationProgress.count({ where: { userId } });
    if (totalAttempts >= 1) await awardBadgeIfEligible(userId, 'collocation-first');
    const masteredCount = await prisma.userCollocationProgress.count({ where: { userId, mastered: true } });
    if (masteredCount >= 20) await awardBadgeIfEligible(userId, 'collocation-master-20');
    if (masteredCount >= 50) await awardBadgeIfEligible(userId, 'collocation-master-50');

    res.json({ totalQ, correct, isPerfect, xpEarned, masteredTotal: masteredCount });
  }),
);

// ============ AUTH: Get user collocation progress ============
collocationsRouter.get(
  '/progress',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const [total, mastered, attempted] = await Promise.all([
      prisma.collocation.count(),
      prisma.userCollocationProgress.count({ where: { userId, mastered: true } }),
      prisma.userCollocationProgress.count({ where: { userId } }),
    ]);

    res.json({ total, mastered, attempted, progressPercent: total > 0 ? Math.round((mastered / total) * 100) : 0 });
  }),
);
