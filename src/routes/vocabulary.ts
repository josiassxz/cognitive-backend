import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { parseMonth } from '../services/content-service';

export const vocabularyRouter = Router();

vocabularyRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const level = typeof req.query.level === 'string' ? req.query.level : undefined;
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;

    const where: Record<string, unknown> = {};
    if (month) where.month = month;
    if (level) where.level = level;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { word: { contains: search, mode: 'insensitive' } },
        { definition: { contains: search, mode: 'insensitive' } },
      ];
    }

    const items = await prisma.vocabulary.findMany({
      where,
      orderBy: [{ month: 'asc' }, { word: 'asc' }],
    });

    res.json(items);
  }),
);
