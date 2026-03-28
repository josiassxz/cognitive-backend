import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { parseMonth } from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';

export const videosRouter = Router();

videosRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const level = typeof req.query.level === 'string' ? req.query.level : undefined;

    const where: Record<string, unknown> = {};
    if (month) where.month = month;
    if (category) where.category = category;
    if (level) where.level = level;

    const items = await prisma.video.findMany({
      where,
      orderBy: [{ month: 'asc' }, { title: 'asc' }],
    });

    res.json(items);
  }),
);
