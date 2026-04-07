import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { mapCefrToMonth, parseCefrLevel, parseMonth } from '../services/content-service';
import { withCache } from '../lib/cache';

export const vocabularyRouter = Router();

vocabularyRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const cefrLevel = parseCefrLevel(req.query.cefrLevel);
    const month = parseMonth(req.query.month);
    const level = typeof req.query.level === 'string' ? req.query.level : undefined;
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;

    const where: Record<string, unknown> = {};
    if (cefrLevel) {
      where.OR = [
        { level: { equals: cefrLevel.toUpperCase(), mode: 'insensitive' } },
        { level: { contains: cefrLevel, mode: 'insensitive' } },
        { month: mapCefrToMonth(cefrLevel) },
      ];
    } else if (month) {
      where.month = month;
    }
    if (level) where.level = level;
    if (category) where.category = category;
    if (search) {
      const searchFilters = [
        { word: { contains: search, mode: 'insensitive' } },
        { definition: { contains: search, mode: 'insensitive' } },
      ];
      if (where.OR && Array.isArray(where.OR)) {
        where.AND = [{ OR: where.OR }, { OR: searchFilters }];
        delete where.OR;
      } else {
        where.OR = searchFilters;
      }
    }

    const cacheKey = `vocab:${month ?? ''}:${level ?? ''}:${category ?? ''}`;
    const items = await withCache(cacheKey, 600, () =>
      prisma.vocabulary.findMany({
        where,
        orderBy: [{ month: 'asc' }, { word: 'asc' }],
      }),
    );

    res.json(items);
  }),
);
