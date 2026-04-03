import { randomUUID } from 'crypto';
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { XP_CONFIG } from '../lib/xp';
import { mapCefrToMonth, parseCefrLevel } from '../services/content-service';

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

export const sentenceExercisesRouter = Router();

// ============ PUBLIC: Get sentence exercises ============
sentenceExercisesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const cefrLevel = parseCefrLevel(req.query.cefrLevel);
    const month = cefrLevel ? mapCefrToMonth(cefrLevel) : (req.query.month ? z.coerce.number().int().min(1).max(6).parse(req.query.month) : undefined);
    const grammarFocus = typeof req.query.grammarFocus === 'string' ? req.query.grammarFocus : undefined;
    const count = z.coerce.number().int().min(1).max(20).default(10).parse(req.query.count ?? 10);

    const where: Record<string, unknown> = {};
    if (month) where.month = month;
    if (cefrLevel) where.cefrLevel = cefrLevel;
    if (grammarFocus) where.grammarFocus = grammarFocus;

    const all = await prisma.sentenceExercise.findMany({ where });
    if (all.length === 0) {
      throw new HttpError(400, 'Nenhum exercicio de sentence completion disponivel');
    }

    const shuffled = all.sort(() => Math.random() - 0.5).slice(0, count);

    const exercises = shuffled.map((ex: {
      id: number;
      sentence: string;
      correctAnswer: string;
      distractors: string[];
      grammarFocus: string;
      cefrLevel: string;
      month: number;
    }) => ({
      id: ex.id,
      sentence: ex.sentence,
      correctAnswer: ex.correctAnswer,
      options: [...ex.distractors, ex.correctAnswer].sort(() => Math.random() - 0.5),
      grammarFocus: ex.grammarFocus,
      cefrLevel: ex.cefrLevel,
      month: ex.month,
    }));

    res.json({ exercises, total: all.length, sessionId: randomUUID() });
  }),
);

// ============ AUTH: Submit sentence exercise answers ============
sentenceExercisesRouter.post(
  '/submit',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const input = z.object({
      sessionId: z.string().min(8).max(120),
      answers: z.array(z.object({
        exerciseId: z.number().int().positive(),
        selectedAnswer: z.string().trim().min(1),
        correctAnswer: z.string().optional(),
        isCorrect: z.boolean().optional(),
      })).min(1),
    }).parse(req.body);

    // Check duplicate
    const existing = await prisma.xpLog.findFirst({
      where: {
        userId,
        source: 'sentence',
        detail: { startsWith: `submission:${input.sessionId}|` },
      },
    });
    if (existing) throw new HttpError(409, 'Atividade ja finalizada para esta sessao');

    const exerciseIds = [...new Set(input.answers.map((answer) => answer.exerciseId))];
    const exercises = (await prisma.sentenceExercise.findMany({
      where: { id: { in: exerciseIds } },
      select: { id: true, correctAnswer: true },
    })) as Array<{ id: number; correctAnswer: string }>;
    if (exercises.length !== exerciseIds.length) {
      throw new HttpError(400, 'Um ou mais exercicios de sentence sao invalidos');
    }
    const exerciseById = new Map<number, { id: number; correctAnswer: string }>(exercises.map((exercise) => [exercise.id, exercise]));

    const normalizedAnswers = input.answers.map((answer) => {
      const exercise = exerciseById.get(answer.exerciseId);
      if (!exercise) {
        throw new HttpError(400, 'Resposta invalida para o exercicio de sentence');
      }
      const isCorrect = answer.selectedAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
      return { ...answer, isCorrect };
    });

    const totalQ = normalizedAnswers.length;
    const correct = normalizedAnswers.filter((a) => a.isCorrect).length;
    const isPerfect = totalQ > 0 && correct === totalQ;
    let xpEarned = correct * XP_CONFIG.sentence_correct + XP_CONFIG.sentence_complete;
    if (isPerfect) xpEarned += XP_CONFIG.sentence_perfect_bonus;

    // Update per-exercise progress
    for (const answer of normalizedAnswers) {
      const progress = await prisma.userSentenceProgress.findUnique({
        where: { userId_exerciseId: { userId, exerciseId: answer.exerciseId } },
      });

      if (progress) {
        const newCorrect = progress.correct + (answer.isCorrect ? 1 : 0);
        const newAttempts = progress.attempts + 1;
        await prisma.userSentenceProgress.update({
          where: { id: progress.id },
          data: {
            correct: newCorrect,
            attempts: newAttempts,
            mastered: newCorrect >= 3 && (newCorrect / newAttempts) >= 0.8,
            lastAttemptAt: new Date(),
          },
        });
      } else {
        await prisma.userSentenceProgress.create({
          data: {
            userId,
            exerciseId: answer.exerciseId,
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
        source: 'sentence',
        detail: `submission:${input.sessionId}|Sentences: ${correct}/${totalQ}`,
      },
    });

    // Badge checks
    const totalAttempts = await prisma.userSentenceProgress.count({ where: { userId } });
    if (totalAttempts >= 1) await awardBadgeIfEligible(userId, 'sentence-first');
    const masteredCount = await prisma.userSentenceProgress.count({ where: { userId, mastered: true } });
    if (masteredCount >= 30) await awardBadgeIfEligible(userId, 'sentence-master-30');

    res.json({ totalQ, correct, isPerfect, xpEarned, masteredTotal: masteredCount });
  }),
);

// ============ AUTH: Get user sentence progress ============
sentenceExercisesRouter.get(
  '/progress',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const [total, mastered, attempted] = await Promise.all([
      prisma.sentenceExercise.count(),
      prisma.userSentenceProgress.count({ where: { userId, mastered: true } }),
      prisma.userSentenceProgress.count({ where: { userId } }),
    ]);

    res.json({ total, mastered, attempted, progressPercent: total > 0 ? Math.round((mastered / total) * 100) : 0 });
  }),
);
