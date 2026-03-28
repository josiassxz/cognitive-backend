import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { parseMonth } from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';

export const podcastsRouter = Router();

podcastsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const level = typeof req.query.level === 'string' ? req.query.level : undefined;

    const where: Record<string, unknown> = {};
    if (month) where.month = month;
    if (level) where.level = level;

    const items = await prisma.podcast.findMany({
      where,
      orderBy: [{ month: 'asc' }, { name: 'asc' }],
    });

    res.json(items);
  }),
);
