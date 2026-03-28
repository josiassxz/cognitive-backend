import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { parseMonth } from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';

export const songsRouter = Router();

songsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const slug = typeof req.query.slug === 'string' ? req.query.slug : undefined;

    if (slug) {
      const item = await prisma.song.findUnique({
        where: { slug },
        include: { keyPhrases: true, vocabHighlights: true },
      });
      res.json(item);
      return;
    }

    const where: Record<string, unknown> = {};
    if (month) where.month = month;

    const items = await prisma.song.findMany({
      where,
      include: { keyPhrases: true, vocabHighlights: true },
      orderBy: [{ month: 'asc' }, { title: 'asc' }],
    });

    res.json(items);
  }),
);
