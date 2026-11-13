// Estudo de frases estilo Anki (cartão: inglês + áudio na frente, tradução no verso).
//
//   GET  /api/study/settings                       opções do baralho (+ padrões do Anki)
//   PUT  /api/study/settings                       atualiza opções (parcial)
//   GET  /api/study/decks                          livros com cartões e contagens do dia
//   GET  /api/study/:contentId/overview            contagens do dia + estado de cada frase
//   POST /api/study/:contentId/cards               { segmentKeys, target: 'app'|'anki' }
//   DELETE /api/study/:contentId/cards/:key        tira a frase do baralho
//   GET  /api/study/:contentId/next                próximo cartão (fila do Anki v3)
//   POST /api/study/cards/:id/answer               { answer: 1..4, timeMs } → próximo cartão
//   POST /api/study/cards/:id/suspend              { suspended }
//   POST /api/study/:contentId/export              { scope, count?, segmentKeys? } → .apkg
//   POST /api/study/:contentId/anki-notes          mesmo corpo → notas p/ AnkiConnect
//
// Filas: new | learning | review | suspended (estudo no app) e anki-pending | anki
// (frases marcadas para mandar ao Anki do usuário / já enviadas).
import { Router, type Request } from 'express';
import { z } from 'zod';
import type { Prisma, UserStudyCard } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { buildApkg, legacyDeckConfig } from '../lib/study/apkg';
import { clipStorageKey, clipUrl, ensureClip, mapLimit, type ClipSource } from '../lib/study/clips';
import { dayNumber, DEFAULT_STUDY_CONFIG, resolveStudyConfig, studyConfigSchema, type StudyConfig } from '../lib/study/config';
import { answerCard, previewAnswers, type Answer, type CardSched, type CardType, type FsrsCardJson } from '../lib/study/scheduler';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { loadVisibleContent, publicSegmentKey } from './reading-segments';

export const studyRouter = Router();

const APP_QUEUES = ['new', 'learning', 'review', 'suspended'];
const MAX_EXPORT = 2000;

// ----------------------------------------------------------------------------- helpers
async function loadConfig(userId: string): Promise<StudyConfig> {
  const row = await prisma.userStudySettings.findUnique({ where: { userId } });
  return resolveStudyConfig(row?.config);
}

function contentIdParam(req: Request): number {
  return z.coerce.number().int().positive().parse(req.params.contentId);
}

interface SentenceRow {
  id: number;
  segmentKey: string | null;
  sentenceIndex: number;
  text: string;
  translation: string;
  startMs: number;
  endMs: number;
  playStartMs: number | null;
  playEndMs: number | null;
}

const sentenceSelect = {
  id: true, segmentKey: true, sentenceIndex: true, text: true, translation: true,
  startMs: true, endMs: true, playStartMs: true, playEndMs: true,
} as const;

async function sentencesByKey(contentId: number, keys?: string[]): Promise<Map<string, SentenceRow>> {
  const rows = await prisma.readingSentence.findMany({ where: { contentId }, select: sentenceSelect, orderBy: { sentenceIndex: 'asc' } });
  const map = new Map<string, SentenceRow>();
  const wanted = keys ? new Set(keys) : null;
  for (const row of rows) {
    const key = publicSegmentKey(row);
    if (!wanted || wanted.has(key)) map.set(key, row);
  }
  return map;
}

function clipSegment(key: string, row: SentenceRow) {
  return { segmentKey: key, startMs: row.playStartMs ?? row.startMs, endMs: row.playEndMs ?? row.endMs };
}

async function clipSourceFor(contentId: number): Promise<ClipSource> {
  const content = await prisma.readingContent.findUnique({ where: { id: contentId }, select: { audioUrl: true } });
  return { contentId, audioUrl: content?.audioUrl ?? '' };
}

function toSched(card: UserStudyCard): CardSched {
  return {
    id: card.id,
    type: card.type as CardType,
    remainingSteps: card.remainingSteps,
    interval: card.interval,
    ease: card.ease,
    reps: card.reps,
    lapses: card.lapses,
    leech: card.leech,
    lastReviewDay: card.lastReviewDay,
    lastReviewAt: card.lastReviewAt,
    fsrs: (card.fsrs as FsrsCardJson | null) ?? null,
  };
}

/** Posição para novos cartões: adicionados à mão entram na frente; os do livro, na ordem do livro. */
function positionFor(row: SentenceRow, manual: boolean, random: boolean): number {
  if (manual) return -1_000_000 + row.sentenceIndex;
  return random ? Math.floor(Math.random() * 1_000_000) : row.sentenceIndex;
}

// ----------------------------------------------------------------------------- fila
interface DayCounts {
  today: number;
  newLimit: number;
  reviewLimit: number;
  newDone: number;
  reviewsDone: number;
}

async function dayCounts(userId: string, contentId: number, config: StudyConfig, now: Date): Promise<DayCounts> {
  const today = dayNumber(now, config);
  const [newDone, reviewsDone] = await Promise.all([
    prisma.userStudyCard.count({ where: { userId, contentId, introducedDay: today } }),
    prisma.userStudyReview.count({ where: { userId, contentId, day: today, kind: 1 } }),
  ]);
  const reviewLimit = Math.max(config.reviewsPerDay - reviewsDone, 0);
  // Agendador v3: o limite de revisões também limita os novos.
  const newLimit = Math.min(Math.max(config.newPerDay - newDone, 0), reviewLimit);
  return { today, newLimit, reviewLimit, newDone, reviewsDone };
}

/** Puxa as próximas frases do livro para a fila de novos até cobrir o limite do dia. */
async function topUpNewCards(userId: string, contentId: number, config: StudyConfig, needed: number) {
  if (!config.autoAddFromBook || needed <= 0) return;
  const have = await prisma.userStudyCard.count({ where: { userId, contentId, queue: 'new' } });
  const missing = needed - have;
  if (missing <= 0) return;
  const existing = new Set(
    (await prisma.userStudyCard.findMany({ where: { userId, contentId }, select: { segmentKey: true } })).map((r) => r.segmentKey),
  );
  const rows = await prisma.readingSentence.findMany({
    where: { contentId, translation: { not: '' } },
    select: sentenceSelect,
    orderBy: { sentenceIndex: 'asc' },
  });
  let candidates = rows.filter((row) => !existing.has(publicSegmentKey(row)) && row.text.trim().length > 0);
  if (config.insertionOrder === 'random') candidates = candidates.sort(() => Math.random() - 0.5);
  const picked = candidates.slice(0, missing);
  if (picked.length === 0) return;
  await prisma.userStudyCard.createMany({
    data: picked.map((row) => ({
      userId, contentId, segmentKey: publicSegmentKey(row), position: positionFor(row, false, config.insertionOrder === 'random'),
      ease: config.startingEase,
    })),
    skipDuplicates: true,
  });
}

async function queueState(userId: string, contentId: number, config: StudyConfig, now: Date) {
  const counts = await dayCounts(userId, contentId, config, now);
  await topUpNewCards(userId, contentId, config, counts.newLimit);
  const aheadLimit = new Date(now.getTime() + config.learnAheadMinutes * 60_000);
  const [learningDueNow, learningAhead, reviewDue, newCards, nextLearning] = await Promise.all([
    prisma.userStudyCard.findFirst({ where: { userId, contentId, queue: 'learning', dueAt: { lte: now } }, orderBy: { dueAt: 'asc' } }),
    prisma.userStudyCard.count({ where: { userId, contentId, queue: 'learning', dueAt: { lte: aheadLimit } } }),
    prisma.userStudyCard.findMany({
      where: { userId, contentId, queue: 'review', dueDay: { lte: counts.today } },
      orderBy: [{ dueDay: 'asc' }, { id: 'asc' }],
      take: Math.max(counts.reviewLimit, 0),
    }),
    prisma.userStudyCard.findMany({
      where: { userId, contentId, queue: 'new' },
      orderBy: [{ position: 'asc' }, { id: 'asc' }],
      take: Math.max(counts.newLimit, 0),
    }),
    prisma.userStudyCard.findFirst({ where: { userId, contentId, queue: 'learning' }, orderBy: { dueAt: 'asc' }, select: { dueAt: true } }),
  ]);

  let card: UserStudyCard | null = learningDueNow;
  if (!card) {
    const review = reviewDue[0] ?? null;
    const fresh = newCards[0] ?? null;
    if (review && fresh) {
      if (config.newReviewMix === 'newFirst') card = fresh;
      else if (config.newReviewMix === 'reviewsFirst') card = review;
      else {
        // Intercala novos entre revisões na proporção do que resta (como o "misturar" do Anki).
        const every = Math.max(Math.floor(reviewDue.length / newCards.length), 1);
        card = (counts.reviewsDone + 1) % (every + 1) === 0 ? fresh : review;
      }
    } else {
      card = review ?? fresh;
    }
  }
  if (!card && learningAhead > 0) {
    card = await prisma.userStudyCard.findFirst({ where: { userId, contentId, queue: 'learning', dueAt: { lte: aheadLimit } }, orderBy: { dueAt: 'asc' } });
  }
  return {
    card,
    counts: { new: newCards.length, learning: learningAhead, review: reviewDue.length },
    today: counts,
    nextLearningAt: card ? null : (nextLearning?.dueAt ?? null),
  };
}

async function serializeCard(card: UserStudyCard, config: StudyConfig, now: Date, today: number) {
  const sentences = await sentencesByKey(card.contentId, [card.segmentKey]);
  const row = sentences.get(card.segmentKey);
  if (!row) return null;
  let audioUrl = '';
  try {
    audioUrl = await clipUrl(await clipSourceFor(card.contentId), clipSegment(card.segmentKey, row));
  } catch (error) {
    console.error('[study] falha ao recortar áudio:', error instanceof Error ? error.message : error);
  }
  return {
    id: card.id,
    segmentKey: card.segmentKey,
    type: card.type,
    leech: card.leech,
    reps: card.reps,
    lapses: card.lapses,
    line: row.sentenceIndex + 1,
    english: row.text,
    portuguese: row.translation,
    audioUrl,
    buttons: previewAnswers(toSched(card), config, now, today),
  };
}

async function nextPayload(userId: string, contentId: number, config: StudyConfig) {
  const now = new Date();
  for (let attempt = 0; attempt < 5; attempt++) {
    const state = await queueState(userId, contentId, config, now);
    if (!state.card) return { card: null, counts: state.counts, nextLearningAt: state.nextLearningAt, config };
    const card = await serializeCard(state.card, config, now, state.today.today);
    if (card) return { card, counts: state.counts, nextLearningAt: null, config };
    // Frase sumiu (nova segmentação): suspende o cartão órfão e tenta o próximo.
    await prisma.userStudyCard.update({ where: { id: state.card.id }, data: { queue: 'suspended' } });
  }
  return { card: null, counts: { new: 0, learning: 0, review: 0 }, nextLearningAt: null, config };
}

// ----------------------------------------------------------------------------- opções
studyRouter.get(
  '/settings',
  asyncHandler(async (req, res) => {
    res.json({ config: await loadConfig(req.userId as string), defaults: DEFAULT_STUDY_CONFIG });
  }),
);

studyRouter.put(
  '/settings',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const patch = studyConfigSchema.partial().parse(req.body);
    const config = studyConfigSchema.parse({ ...(await loadConfig(userId)), ...patch });
    if (config.easyInterval < config.graduatingInterval) {
      throw new HttpError(400, 'O intervalo fácil deve ser maior ou igual ao intervalo de graduação');
    }
    await prisma.userStudySettings.upsert({
      where: { userId },
      create: { userId, config: config as unknown as Prisma.InputJsonValue },
      update: { config: config as unknown as Prisma.InputJsonValue },
    });
    res.json({ config, defaults: DEFAULT_STUDY_CONFIG });
  }),
);

// ----------------------------------------------------------------------------- baralhos
studyRouter.get(
  '/decks',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const config = await loadConfig(userId);
    const now = new Date();
    const today = dayNumber(now, config);
    const grouped = await prisma.userStudyCard.groupBy({ by: ['contentId', 'queue'], where: { userId }, _count: { _all: true } });
    const contentIds = [...new Set(grouped.map((g) => g.contentId))];
    const [contents, due] = await Promise.all([
      prisma.readingContent.findMany({ where: { id: { in: contentIds } }, select: { id: true, title: true, author: true, cefrLevel: true } }),
      prisma.userStudyCard.groupBy({
        by: ['contentId'],
        where: {
          userId,
          OR: [{ queue: 'review', dueDay: { lte: today } }, { queue: 'learning', dueAt: { lte: new Date(now.getTime() + config.learnAheadMinutes * 60_000) } }],
        },
        _count: { _all: true },
      }),
    ]);
    const dueBy = new Map(due.map((d) => [d.contentId, d._count._all]));
    res.json({
      decks: contents.map((content) => {
        const byQueue = Object.fromEntries(grouped.filter((g) => g.contentId === content.id).map((g) => [g.queue, g._count._all]));
        return { ...content, queues: byQueue, due: dueBy.get(content.id) ?? 0 };
      }),
    });
  }),
);

studyRouter.get(
  '/:contentId/overview',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = contentIdParam(req);
    await loadVisibleContent(contentId, req.userRole);
    const config = await loadConfig(userId);
    const now = new Date();
    const state = await queueState(userId, contentId, config, now);
    const cards = await prisma.userStudyCard.findMany({ where: { userId, contentId }, select: { segmentKey: true, queue: true } });
    const queues: Record<string, number> = {};
    for (const card of cards) queues[card.queue] = (queues[card.queue] ?? 0) + 1;
    const totalLines = await prisma.readingSentence.count({ where: { contentId } });
    res.json({
      config,
      counts: state.counts,
      today: { newDone: state.today.newDone, reviewsDone: state.today.reviewsDone },
      nextLearningAt: state.card ? null : state.nextLearningAt,
      queues,
      totalLines,
      cards: Object.fromEntries(cards.map((card) => [card.segmentKey, card.queue])),
    });
  }),
);

/** Estado de cada frase no baralho (só leitura; não puxa frases novas). */
studyRouter.get(
  '/:contentId/cards',
  asyncHandler(async (req, res) => {
    const cards = await prisma.userStudyCard.findMany({
      where: { userId: req.userId as string, contentId: contentIdParam(req) },
      select: { segmentKey: true, queue: true },
    });
    res.json({ cards: Object.fromEntries(cards.map((card) => [card.segmentKey, card.queue])) });
  }),
);

studyRouter.post(
  '/:contentId/cards',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = contentIdParam(req);
    const { segmentKeys, target } = z
      .object({ segmentKeys: z.array(z.string().min(1).max(64)).min(1).max(MAX_EXPORT), target: z.enum(['app', 'anki']).default('app') })
      .parse(req.body);
    await loadVisibleContent(contentId, req.userRole);
    const config = await loadConfig(userId);
    const rows = await sentencesByKey(contentId, segmentKeys);
    const queue = target === 'anki' ? 'anki-pending' : 'new';
    let changed = 0;
    for (const [key, row] of rows) {
      const existing = await prisma.userStudyCard.findUnique({ where: { userId_segmentKey: { userId, segmentKey: key } } });
      if (!existing) {
        await prisma.userStudyCard.create({
          data: { userId, contentId, segmentKey: key, queue, manual: true, position: positionFor(row, true, false), ease: config.startingEase },
        });
        changed++;
      } else if (target === 'app' && existing.queue.startsWith('anki')) {
        await prisma.userStudyCard.update({ where: { id: existing.id }, data: { queue: 'new', manual: true, position: positionFor(row, true, false) } });
        changed++;
      } else if (target === 'anki' && existing.reps === 0 && existing.queue !== 'anki-pending') {
        // Só frases ainda não estudadas no app vão para o Anki (evita estudar a mesma coisa em dois lugares).
        await prisma.userStudyCard.update({ where: { id: existing.id }, data: { queue: 'anki-pending' } });
        changed++;
      }
    }
    const cards = await prisma.userStudyCard.findMany({ where: { userId, contentId, segmentKey: { in: segmentKeys } }, select: { segmentKey: true, queue: true } });
    res.json({ changed, cards: Object.fromEntries(cards.map((card) => [card.segmentKey, card.queue])) });
  }),
);

studyRouter.delete(
  '/:contentId/cards/:key',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const key = z.string().min(1).max(64).parse(req.params.key);
    await prisma.userStudyCard.deleteMany({ where: { userId, contentId: contentIdParam(req), segmentKey: key } });
    res.json({ removed: true });
  }),
);

// ----------------------------------------------------------------------------- estudo
studyRouter.get(
  '/:contentId/next',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = contentIdParam(req);
    await loadVisibleContent(contentId, req.userRole);
    res.json(await nextPayload(userId, contentId, await loadConfig(userId)));
  }),
);

studyRouter.post(
  '/cards/:id/answer',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const { answer, timeMs } = z
      .object({ answer: z.number().int().min(1).max(4), timeMs: z.number().int().min(0).max(3_600_000).default(0) })
      .parse(req.body);
    const card = await prisma.userStudyCard.findFirst({ where: { id, userId } });
    if (!card || !APP_QUEUES.includes(card.queue) || card.queue === 'suspended') throw new HttpError(404, 'Cartão não encontrado');
    const config = await loadConfig(userId);
    const now = new Date();
    const today = dayNumber(now, config);
    const outcome = answerCard(toSched(card), answer as Answer, config, now, today);
    const isReview = outcome.type === 'review';
    const days = 'days' in outcome.delay ? outcome.delay.days : 0;
    const secs = 'secs' in outcome.delay ? outcome.delay.secs : 0;
    const suspend = outcome.becameLeech && config.leechAction === 'suspend';
    await prisma.$transaction([
      prisma.userStudyCard.update({
        where: { id },
        data: {
          type: outcome.type,
          queue: suspend ? 'suspended' : isReview ? 'review' : 'learning',
          dueDay: isReview ? today + days : null,
          dueAt: isReview ? null : new Date(now.getTime() + secs * 1000),
          interval: outcome.interval,
          ease: outcome.ease,
          lapses: outcome.lapses,
          leech: outcome.leech,
          remainingSteps: outcome.remainingSteps,
          fsrs: outcome.fsrs ? (outcome.fsrs as unknown as Prisma.InputJsonValue) : undefined,
          reps: { increment: 1 },
          introducedDay: card.introducedDay ?? today,
          lastReviewDay: today,
          lastReviewAt: now,
        },
      }),
      prisma.userStudyReview.create({
        data: {
          cardId: id, userId, contentId: card.contentId, answer, kind: outcome.revlogKind,
          interval: isReview ? days : -secs, lastInterval: card.type === 'review' ? card.interval : 0,
          ease: outcome.ease, timeMs: Math.min(timeMs, config.maxAnswerSeconds * 1000), day: today,
        },
      }),
    ]);
    const next = await nextPayload(userId, card.contentId, config);
    res.json({ ...next, answered: { id, becameLeech: outcome.becameLeech, suspended: suspend } });
  }),
);

studyRouter.post(
  '/cards/:id/suspend',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const { suspended } = z.object({ suspended: z.boolean() }).parse(req.body);
    const card = await prisma.userStudyCard.findFirst({ where: { id, userId } });
    if (!card) throw new HttpError(404, 'Cartão não encontrado');
    const queue = suspended ? 'suspended' : card.type === 'new' ? 'new' : card.type === 'review' ? 'review' : 'learning';
    await prisma.userStudyCard.update({ where: { id }, data: { queue } });
    res.json({ id, queue });
  }),
);

// ----------------------------------------------------------------------------- Anki
const exportSchema = z.object({
  // next: próximas N frases do livro ainda não usadas | pending: marcadas "enviar ao Anki"
  // deck: cartões do estudo no app | sent: já enviadas antes | selected: segmentKeys
  scope: z.enum(['next', 'pending', 'deck', 'sent', 'selected']),
  count: z.number().int().min(1).max(MAX_EXPORT).default(20),
  segmentKeys: z.array(z.string().min(1).max(64)).max(MAX_EXPORT).optional(),
  cardType: z.enum(['en-pt', 'audio-first', 'pt-en']).optional(),
  // Marca as frases exportadas como "no Anki" (ficam fora da fila do app).
  markSent: z.boolean().default(true),
});

async function collectExport(userId: string, contentId: number, body: z.infer<typeof exportSchema>) {
  const sentences = await sentencesByKey(contentId);
  const cards = await prisma.userStudyCard.findMany({ where: { userId, contentId }, select: { segmentKey: true, queue: true } });
  const queueOf = new Map(cards.map((c) => [c.segmentKey, c.queue]));
  let keys: string[];
  if (body.scope === 'next') {
    keys = [...sentences.entries()].filter(([key, row]) => !queueOf.has(key) && row.translation && row.text.trim()).slice(0, body.count).map(([key]) => key);
  } else if (body.scope === 'selected') {
    keys = (body.segmentKeys ?? []).filter((key) => sentences.has(key));
  } else {
    const want = body.scope === 'pending' ? ['anki-pending'] : body.scope === 'sent' ? ['anki'] : APP_QUEUES;
    keys = [...sentences.keys()].filter((key) => want.includes(queueOf.get(key) ?? ''));
  }
  return { keys: keys.slice(0, MAX_EXPORT), sentences, queueOf };
}

async function markSent(userId: string, contentId: number, keys: string[], queueOf: Map<string, string>, scope: string) {
  if (scope === 'deck') return;
  const config = await loadConfig(userId);
  const fresh = keys.filter((key) => !queueOf.has(key));
  if (fresh.length) {
    await prisma.userStudyCard.createMany({
      data: fresh.map((segmentKey) => ({ userId, contentId, segmentKey, queue: 'anki', ease: config.startingEase })),
      skipDuplicates: true,
    });
  }
  await prisma.userStudyCard.updateMany({
    where: { userId, contentId, segmentKey: { in: keys }, OR: [{ queue: 'anki-pending' }, { queue: 'new', reps: 0 }] },
    data: { queue: 'anki' },
  });
}

function deckNameFor(title: string): string {
  return `Tunely::${title.replace(/::/g, ':').trim() || 'Livro'}`;
}

function audioNameFor(contentId: number, key: string, row: SentenceRow): string {
  const file = clipStorageKey(contentId, clipSegment(key, row)).split('/').pop() as string;
  return `tunely_${contentId}_${file}`;
}

studyRouter.post(
  '/:contentId/export',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = contentIdParam(req);
    const body = exportSchema.parse(req.body);
    const content = await loadVisibleContent(contentId, req.userRole);
    const config = await loadConfig(userId);
    const { keys, sentences, queueOf } = await collectExport(userId, contentId, body);
    if (keys.length === 0) throw new HttpError(400, 'Nenhuma frase para exportar com essa escolha');
    const source = await clipSourceFor(contentId);
    const notes = await mapLimit(keys, 4, async (key) => {
      const row = sentences.get(key) as SentenceRow;
      let audioPath: string | null = null;
      try {
        audioPath = await ensureClip(source, clipSegment(key, row));
      } catch (error) {
        console.error('[study] export sem áudio:', error instanceof Error ? error.message : error);
      }
      return { guidSource: key, english: row.text, portuguese: row.translation, audioPath, audioName: audioNameFor(contentId, key, row), line: row.sentenceIndex + 1 };
    });
    const apkg = await buildApkg({
      deckName: deckNameFor(content.title),
      deckId: 1_731_600_000_000 + contentId,
      bookTitle: content.title,
      config: { ...config, cardType: body.cardType ?? config.cardType },
      notes,
    });
    if (body.markSent) await markSent(userId, contentId, keys, queueOf, body.scope);
    const slug = content.title.normalize('NFD').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 60) || 'tunely';
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${slug}-${keys.length}-frases.apkg"`);
    res.setHeader('X-Card-Count', String(keys.length));
    res.send(apkg);
  }),
);

studyRouter.post(
  '/:contentId/anki-notes',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = contentIdParam(req);
    const body = exportSchema.parse(req.body);
    const content = await loadVisibleContent(contentId, req.userRole);
    const config = await loadConfig(userId);
    const { keys, sentences } = await collectExport(userId, contentId, body);
    const source = await clipSourceFor(contentId);
    const notes = await mapLimit(keys, 4, async (key) => {
      const row = sentences.get(key) as SentenceRow;
      let audioUrl = '';
      try {
        audioUrl = await clipUrl(source, clipSegment(key, row));
      } catch (error) {
        console.error('[study] nota sem áudio:', error instanceof Error ? error.message : error);
      }
      return { segmentKey: key, english: row.text, portuguese: row.translation, line: row.sentenceIndex + 1, audioUrl, audioName: audioNameFor(contentId, key, row) };
    });
    res.json({
      deckName: deckNameFor(content.title),
      bookTitle: content.title,
      cardType: body.cardType ?? config.cardType,
      deckConfig: legacyDeckConfig(config, Math.floor(Date.now() / 1000)),
      notes,
    });
  }),
);

/** Confirma o envio via AnkiConnect (marca as frases como "no Anki"). */
studyRouter.post(
  '/:contentId/anki-sent',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = contentIdParam(req);
    const { segmentKeys } = z.object({ segmentKeys: z.array(z.string().min(1).max(64)).min(1).max(MAX_EXPORT) }).parse(req.body);
    const cards = await prisma.userStudyCard.findMany({ where: { userId, contentId }, select: { segmentKey: true, queue: true } });
    await markSent(userId, contentId, segmentKeys, new Map(cards.map((c) => [c.segmentKey, c.queue])), 'selected');
    res.json({ ok: true });
  }),
);
