import { createHash } from 'crypto';
import { Router } from 'express';
import { z } from 'zod';
import { translateWithContext } from '../lib/gemini';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';

const translateBodySchema = z.object({
  phrase: z.string().min(1),
  context: z.string().min(1),
});

export const translateRouter = Router();

translateRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { phrase, context } = translateBodySchema.parse(req.body);
    const normalizedPhrase = phrase.trim().toLowerCase();
    const normalizedContext = context.trim();
    const contextHash = createHash('sha256').update(normalizedContext).digest('hex');

    const cached = await prisma.translationCache.findUnique({
      where: {
        phrase_contextHash: {
          phrase: normalizedPhrase,
          contextHash,
        },
      },
    });

    if (cached) {
      prisma.translationCache
        .update({
          where: { id: cached.id },
          data: { hitCount: { increment: 1 } },
        })
        .catch(() => undefined);

      res.json({
        phrase: cached.phrase,
        translation: cached.translation,
        explanation: cached.explanation,
        partOfSpeech: cached.partOfSpeech,
        fromCache: true,
      });
      return;
    }

    const result = await translateWithContext(normalizedPhrase, normalizedContext);

    prisma.translationCache
      .create({
        data: {
          phrase: normalizedPhrase,
          contextHash,
          context: normalizedContext,
          translation: result.translation,
          explanation: result.explanation,
          partOfSpeech: result.partOfSpeech,
        },
      })
      .catch(() => undefined);

    res.json({
      phrase: normalizedPhrase,
      translation: result.translation,
      explanation: result.explanation,
      partOfSpeech: result.partOfSpeech,
      fromCache: false,
    });
  }),
);
