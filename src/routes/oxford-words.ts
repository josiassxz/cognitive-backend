import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';

export const oxfordWordsRouter = Router();

oxfordWordsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = req.query.month ? z.coerce.number().int().min(1).max(6).parse(req.query.month) : undefined;
    const cefrLevel = typeof req.query.cefrLevel === 'string' ? req.query.cefrLevel.toLowerCase() : undefined;
    const pos = typeof req.query.pos === 'string' ? req.query.pos.toLowerCase() : undefined;
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const oxford3000Only = req.query.oxford3000 === 'true';
    const limit = z.coerce.number().int().min(1).max(200).default(50).parse(req.query.limit ?? 50);
    const offset = z.coerce.number().int().min(0).default(0).parse(req.query.offset ?? 0);

    const where: Record<string, unknown> = {};
    if (month) where.month = month;
    if (cefrLevel) where.cefrLevel = cefrLevel;
    if (pos) where.pos = pos;
    if (oxford3000Only) where.isOxford3000 = true;
    if (search) {
      where.word = { contains: search, mode: 'insensitive' };
    }

    const [items, total] = await Promise.all([
      prisma.oxfordWord.findMany({
        where,
        orderBy: [{ frequencyRank: 'asc' }, { word: 'asc' }],
        take: limit,
        skip: offset,
      }),
      prisma.oxfordWord.count({ where }),
    ]);

    res.json({ items, total, limit, offset });
  }),
);

oxfordWordsRouter.get(
  '/levels',
  asyncHandler(async (_req, res) => {
    const counts = await prisma.oxfordWord.groupBy({
      by: ['cefrLevel'],
      _count: { id: true },
      orderBy: { cefrLevel: 'asc' },
    });

    const levels = counts.map((c: { cefrLevel: string; _count: { id: number } }) => ({
      cefrLevel: c.cefrLevel,
      count: c._count.id,
    }));

    res.json(levels);
  }),
);

oxfordWordsRouter.get(
  '/random',
  asyncHandler(async (req, res) => {
    const month = req.query.month ? z.coerce.number().int().min(1).max(6).parse(req.query.month) : undefined;
    const count = z.coerce.number().int().min(1).max(10).default(1).parse(req.query.count ?? 1);

    const where: Record<string, unknown> = {};
    if (month) where.month = month;

    const total = await prisma.oxfordWord.count({ where });
    if (total === 0) {
      res.json([]);
      return;
    }

    const indices = new Set<number>();
    while (indices.size < Math.min(count, total)) {
      indices.add(Math.floor(Math.random() * total));
    }

    const items = [];
    for (const skip of indices) {
      const [item] = await prisma.oxfordWord.findMany({ where, skip, take: 1 });
      if (item) items.push(item);
    }

    res.json(items);
  }),
);
