import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { getStats } from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';

export const statsRouter = Router();

statsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const stats = await getStats(prisma);
    res.json(stats);
  }),
);
