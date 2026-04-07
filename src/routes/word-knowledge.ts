import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const wordKnowledgeRouter = Router();

// GET /word-knowledge?words=run,break,set — retorna status de cada palavra
wordKnowledgeRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const wordsParam = z.string().parse(req.query.words);
    const words = wordsParam.split(',').map((w) => w.trim().toLowerCase()).filter(Boolean);
    const records = await prisma.userWordKnowledge.findMany({
      where: { userId, word: { in: words } },
    });
    const map = Object.fromEntries(records.map((r) => [r.word, r.status]));
    res.json({ words: map });
  }),
);

// GET /word-knowledge/stats — totais por status
wordKnowledgeRouter.get(
  '/stats',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const rows = await prisma.userWordKnowledge.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    });
    const stats: Record<string, number> = { unknown: 0, learning: 0, known: 0 };
    for (const row of rows) {
      stats[row.status] = row._count;
    }
    res.json(stats);
  }),
);

// POST /word-knowledge — atualizar status de uma palavra
wordKnowledgeRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const { word, status } = z.object({
      word: z.string().min(1).max(100).toLowerCase(),
      status: z.enum(['unknown', 'learning', 'known']),
    }).parse(req.body);

    await prisma.userWordKnowledge.upsert({
      where: { userId_word: { userId, word } },
      create: { userId, word, status },
      update: { status },
    });

    // Se marcou como 'learning', criar flashcard automaticamente
    if (status === 'learning') {
      const vocab = await prisma.vocabulary.findFirst({ where: { word } });
      if (vocab) {
        await prisma.flashcardProgress.upsert({
          where: { userId_vocabularyId: { userId, vocabularyId: vocab.id } },
          create: { userId, vocabularyId: vocab.id },
          update: {},
        });
      }
    }

    res.json({ success: true, word, status });
  }),
);
