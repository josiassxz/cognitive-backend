import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { calculateFlashcardReview } from '../services/flashcard-service';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

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

export const flashcardsRouter = Router();

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

flashcardsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const month = z.coerce.number().int().min(0).max(6).default(0).parse(req.query.month ?? 0);
    const limit = z.coerce.number().int().min(1).max(50).default(20).parse(req.query.limit ?? 20);
    const now = new Date();

    const dueCards = await prisma.flashcardProgress.findMany({
      where: { userId, nextReviewAt: { lte: now } },
      orderBy: { nextReviewAt: 'asc' },
      take: limit,
    });
    const dueVocabIds = dueCards.map((card: { vocabularyId: number }) => card.vocabularyId);

    const existingIds = (
      await prisma.flashcardProgress.findMany({
        where: { userId },
        select: { vocabularyId: true },
      })
    ).map((card: { vocabularyId: number }) => card.vocabularyId);

    const whereNew: Record<string, unknown> = { id: { notIn: existingIds } };
    if (month > 0) whereNew.month = month;

    const newCards = await prisma.vocabulary.findMany({
      where: whereNew,
      take: Math.max(0, limit - dueCards.length),
      orderBy: { id: 'asc' },
    });

    const dueVocab =
      dueVocabIds.length > 0
        ? await prisma.vocabulary.findMany({ where: { id: { in: dueVocabIds } } })
        : [];

    const cards = [
      ...dueVocab.map((item: { id: number }) => {
        const progress = dueCards.find((card: { vocabularyId: number }) => card.vocabularyId === item.id);
        return {
          ...item,
          isReview: true,
          repetitions: progress?.repetitions ?? 0,
          interval: progress?.interval ?? 1,
        };
      }),
      ...newCards.map((item: Record<string, unknown>) => ({
        ...item,
        isReview: false,
        repetitions: 0,
        interval: 0,
      })),
    ];

    res.json({
      cards,
      dueCount: dueCards.length,
      newCount: newCards.length,
    });
  }),
);

flashcardsRouter.post(
  '/review',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const input = z
      .object({
        vocabularyId: z.number().int().positive(),
        quality: z.number().int().min(0).max(3),
        reviewId: z.string().min(8).max(120),
      })
      .parse(req.body);

    await ensureSubmissionNotProcessed(userId, 'flashcard', input.reviewId);

    const now = new Date();
    const current = await prisma.flashcardProgress.findUnique({
      where: { userId_vocabularyId: { userId, vocabularyId: input.vocabularyId } },
    });

    const review = calculateFlashcardReview({
      quality: input.quality,
      ease: current?.ease,
      interval: current?.interval,
      repetitions: current?.repetitions,
    });

    const nextReviewAt = new Date(now.getTime() + review.interval * 86400000);

    if (current) {
      await prisma.flashcardProgress.update({
        where: { id: current.id },
        data: {
          ease: review.ease,
          interval: review.interval,
          repetitions: review.repetitions,
          nextReviewAt,
          lastReviewedAt: now,
        },
      });
    } else {
      await prisma.flashcardProgress.create({
        data: {
          userId,
          vocabularyId: input.vocabularyId,
          ease: review.ease,
          interval: review.interval,
          repetitions: review.repetitions,
          nextReviewAt,
          lastReviewedAt: now,
        },
      });
    }

    await prisma.xpLog.create({
      data: {
        userId,
        amount: review.xpEarned,
        source: 'flashcard',
        detail: `submission:${input.reviewId}|Flashcard review q=${input.quality}`,
      },
    });

    const totalReviews = await prisma.flashcardProgress.count({ where: { userId } });
    if (totalReviews >= 50) await awardBadgeIfEligible(userId, 'flashcard-50');
    if (totalReviews >= 200) await awardBadgeIfEligible(userId, 'flashcard-200');

    res.json({
      xpEarned: review.xpEarned,
      nextReviewAt,
      interval: review.interval,
      ease: review.ease,
      repetitions: review.repetitions,
    });
  }),
);
