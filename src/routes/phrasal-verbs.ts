import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { mapCefrToMonth, parseCefrLevel, parseMonth } from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';

export const phrasalVerbsRouter = Router();

phrasalVerbsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const cefrLevel = parseCefrLevel(req.query.cefrLevel);
    const month = parseMonth(req.query.month);
    const where: Record<string, unknown> = {};
    if (cefrLevel) where.month = mapCefrToMonth(cefrLevel);
    else if (month) where.month = month;

    const items = await prisma.phrasalVerb.findMany({
      where,
      orderBy: [{ month: 'asc' }, { phrasal: 'asc' }],
    });

    res.json(items);
  }),
);
