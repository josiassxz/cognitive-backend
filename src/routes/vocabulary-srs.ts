import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const vocabularySrsRouter = Router();

// SM-2 simplificado: quality 0-5
function applySm2(prev: { easeFactor: number; interval: number; repetitions: number }, quality: number) {
  let { easeFactor, interval, repetitions } = prev;
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(interval * easeFactor);
  }
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const nextReviewAt = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
  return { easeFactor, interval, repetitions, nextReviewAt };
}

// GET /vocabulary-srs/status?words=run,break — retorna status conhecido por palavra
vocabularySrsRouter.get(
  '/status',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const wordsParam = z.string().parse(req.query.words);
    const words = wordsParam.split(',').map((w) => w.trim().toLowerCase()).filter(Boolean);
    const records = await prisma.userWordKnowledge.findMany({
      where: { userId, word: { in: words } },
      select: { word: true, status: true },
    });
    const map = Object.fromEntries(records.map((r) => [r.word, r.status]));
    res.json({ words: map });
  }),
);

// POST /vocabulary-srs/status — atualizar apenas o status (unknown/learning/known)
vocabularySrsRouter.post(
  '/status',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const { word, status } = z
      .object({
        word: z.string().min(1).max(100).toLowerCase(),
        status: z.enum(['unknown', 'learning', 'known']),
      })
      .parse(req.body);
    await prisma.userWordKnowledge.upsert({
      where: { userId_word: { userId, word } },
      create: { userId, word, status },
      update: { status },
    });
    res.json({ success: true, word, status });
  }),
);

// POST /vocabulary/save
vocabularySrsRouter.post(
  '/save',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const body = z
      .object({
        word: z.string().min(1).max(100),
        lemma: z.string().max(100).optional(),
        definition: z.string().max(2000).optional(),
        contextSentence: z.string().max(2000).optional(),
        bookId: z.string().optional(),
        chapterIndex: z.number().int().optional(),
        paragraphIndex: z.number().int().optional(),
      })
      .parse(req.body);

    const word = body.word.trim().toLowerCase();
    const record = await prisma.userWordKnowledge.upsert({
      where: { userId_word: { userId, word } },
      create: {
        userId,
        word,
        status: 'learning',
        lemma: body.lemma,
        definition: body.definition,
        contextSentence: body.contextSentence,
        bookId: body.bookId,
        chapterIndex: body.chapterIndex,
        paragraphIndex: body.paragraphIndex,
      },
      update: {
        status: 'learning',
        lemma: body.lemma ?? undefined,
        definition: body.definition ?? undefined,
        contextSentence: body.contextSentence ?? undefined,
        bookId: body.bookId ?? undefined,
        chapterIndex: body.chapterIndex ?? undefined,
        paragraphIndex: body.paragraphIndex ?? undefined,
      },
    });
    res.json({ success: true, item: record });
  }),
);

// GET /vocabulary/saved?status=&bookId=&page=&pageSize=
vocabularySrsRouter.get(
  '/saved',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const query = z
      .object({
        status: z.enum(['unknown', 'learning', 'known']).optional(),
        bookId: z.string().optional(),
        page: z.coerce.number().int().min(1).default(1),
        pageSize: z.coerce.number().int().min(1).max(100).default(30),
      })
      .parse(req.query);

    const where = {
      userId,
      ...(query.status ? { status: query.status } : {}),
      ...(query.bookId ? { bookId: query.bookId } : {}),
    };
    const [total, items] = await Promise.all([
      prisma.userWordKnowledge.count({ where }),
      prisma.userWordKnowledge.findMany({
        where,
        orderBy: { addedAt: 'desc' },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
    ]);
    res.json({ total, page: query.page, pageSize: query.pageSize, items });
  }),
);

// GET /vocabulary/review-queue
vocabularySrsRouter.get(
  '/review-queue',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const items = await prisma.userWordKnowledge.findMany({
      where: {
        userId,
        status: { in: ['learning', 'unknown'] },
        nextReviewAt: { lte: new Date() },
      },
      orderBy: { nextReviewAt: 'asc' },
      take: 30,
    });
    res.json({ items });
  }),
);

// POST /vocabulary/:id/review
vocabularySrsRouter.post(
  '/:id/review',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');
    const id = z.coerce.number().int().parse(req.params.id);
    const { quality } = z.object({ quality: z.number().int().min(0).max(5) }).parse(req.body);

    const existing = await prisma.userWordKnowledge.findFirst({ where: { id, userId } });
    if (!existing) throw new HttpError(404, 'Palavra nao encontrada');

    const next = applySm2(
      { easeFactor: existing.easeFactor, interval: existing.interval, repetitions: existing.repetitions },
      quality,
    );
    const nextStatus = next.repetitions >= 4 && quality >= 4 ? 'known' : 'learning';

    const updated = await prisma.userWordKnowledge.update({
      where: { id },
      data: { ...next, status: nextStatus },
    });
    res.json({ item: updated });
  }),
);
