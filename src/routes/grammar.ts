import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { parseMonth } from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';

export const grammarRouter = Router();

grammarRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;

    const where: Record<string, unknown> = {};
    if (month) where.month = month;
    if (category) where.category = category;

    const items = await prisma.grammarTip.findMany({
      where,
      orderBy: [{ month: 'asc' }, { title: 'asc' }],
    });

    res.json(items);
  }),
);
