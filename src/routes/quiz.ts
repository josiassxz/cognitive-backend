import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { buildQuiz, calculateQuizResult, QuizType } from '../services/quiz-service';
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

export const quizRouter = Router();

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

quizRouter.get(
  '/generate',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const cefrLevel = parseCefrLevel(req.query.cefrLevel ?? 'a1') ?? 'a1';
    const month = mapCefrToMonth(cefrLevel);
    const type = z
      .enum(['vocabulary', 'phrasal-verbs', 'expressions'])
      .default('vocabulary')
      .parse(req.query.type ?? 'vocabulary');
    const count = z.coerce.number().int().min(1).max(20).default(10).parse(req.query.count ?? 10);

    const [vocabulary, phrasalVerbs, expressions] = await Promise.all([
      type === 'vocabulary'
        ? prisma.vocabulary.findMany({ where: { month }, orderBy: { id: 'asc' } })
        : Promise.resolve([]),
      type === 'phrasal-verbs'
        ? prisma.phrasalVerb.findMany({ where: { month }, orderBy: { id: 'asc' } })
        : Promise.resolve([]),
      type === 'expressions'
        ? prisma.expression.findMany({ where: { month }, orderBy: { id: 'asc' } })
        : Promise.resolve([]),
    ]);

    const questions = buildQuiz({
      type: type as QuizType,
      count,
      vocabulary,
      phrasalVerbs,
      expressions,
    });

    res.json({ questions, type, cefrLevel, sessionId: randomUUID() });
  }),
);

quizRouter.post(
  '/submit',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const input = z
      .object({
        type: z.enum(['vocabulary', 'phrasal-verbs', 'expressions']),
        cefrLevel: z.enum(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']).optional(),
        month: z.number().int().min(1).max(6).optional(),
        sessionId: z.string().min(8).max(120),
        answers: z.array(
          z.object({
            questionId: z.number().int(),
            selectedAnswer: z.string(),
            correctAnswer: z.string(),
            isCorrect: z.boolean(),
          }),
        ),
      })
      .parse(req.body);

    await ensureSubmissionNotProcessed(userId, 'quiz', input.sessionId);

    const result = calculateQuizResult(input.answers);
    await prisma.quizAttempt.create({
      data: {
        userId,
        quizType: input.type,
        totalQ: result.totalQ,
        correct: result.correct,
        xpEarned: result.xpEarned,
        month: input.cefrLevel ? mapCefrToMonth(input.cefrLevel) : (input.month ?? 1),
      },
    });
    await prisma.xpLog.create({
      data: {
        userId,
        amount: result.xpEarned,
        source: 'quiz',
        detail: `submission:${input.sessionId}|${input.type}: ${result.correct}/${result.totalQ}`,
      },
    });

    const totalQuizzes = await prisma.quizAttempt.count({ where: { userId } });
    if (totalQuizzes >= 1) await awardBadgeIfEligible(userId, 'quiz-first');
    if (totalQuizzes >= 10) await awardBadgeIfEligible(userId, 'quiz-10');
    if (result.isPerfect) await awardBadgeIfEligible(userId, 'quiz-perfect');

    res.json(result);
  }),
);
