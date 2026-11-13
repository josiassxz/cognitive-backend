// Estudo de frases no modelo do Anki (cartão: inglês + áudio na frente, tradução no verso).
//
// Opções (como no Anki):
//   GET    /api/study/options?deck=ID               opções globais + presets + baralho (0 = "Tunely")
//   PUT    /api/study/options                       salva global, config do preset e limites do baralho
//   POST   /api/study/presets                       { name, cloneFrom? } adicionar/clonar preset
//   PATCH  /api/study/presets/:id                   { name } renomear
//   DELETE /api/study/presets/:id                   remover (baralhos voltam ao Default)
//   POST   /api/study/presets/from-anki             converte preset do Anki (AnkiConnect) em opções
// Baralhos e estudo (deck 0 = raiz "Tunely", demais = livro):
//   GET  /api/study/decks                           árvore com contagens Novos/Aprender/Revisar
//   GET  /api/study/:deck/overview                  contagens do dia (+ estado das frases do livro)
//   GET  /api/study/:deck/next                      próximo cartão (fila do Anki v3)
//   POST /api/study/cards/:id/answer                { answer: 1..4, timeMs, deck } → próximo cartão
//   POST /api/study/cards/:id/suspend | /bury       suspender / ocultar até amanhã
// Frases e Anki do usuário:
//   GET/POST /api/study/:contentId/cards, DELETE /api/study/:contentId/cards/:key
//   POST /api/study/:contentId/export (.apkg) | /anki-notes (AnkiConnect) | /anki-sent
//
// Filas: new | learning | review | suspended (estudo no app) e anki-pending | anki
// (frases marcadas para mandar ao Anki do usuário / já enviadas).
import { Router, type Request } from 'express';
import { z } from 'zod';
import type { Prisma, UserStudyCard } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { fromLegacyDeckConfig, legacyDeckConfig } from '../lib/study/anki-map';
import { buildApkg } from '../lib/study/apkg';
import { clipStorageKey, clipUrl, ensureClip, mapLimit, type ClipSource } from '../lib/study/clips';
import {
  dayNumber, DEFAULT_GLOBAL_CONFIG, DEFAULT_PRESET_CONFIG, globalConfigSchema, presetConfigSchema, resolvePresetConfig,
  type StudyConfig,
} from '../lib/study/config';
import {
  buildQueue, deckLimits, deckRow, DEFAULT_PRESET_NAME, effectiveConfig, ensureDefaultPreset, listBookDecks, loadGlobal,
  presetForDeck, ROOT_DECK, ROOT_DECK_NAME, saveGlobal,
} from '../lib/study/decks';
import { answerCard, previewAnswers, type Answer, type CardSched, type CardType, type FsrsCardJson } from '../lib/study/scheduler';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { loadVisibleContent, publicSegmentKey } from './reading-segments';

export const studyRouter = Router();

const APP_QUEUES = ['new', 'learning', 'review', 'suspended'];
const MAX_EXPORT = 2000;

// ----------------------------------------------------------------------------- helpers
function contentIdParam(req: Request): number {
  return z.coerce.number().int().positive().parse(req.params.contentId);
}

/** Baralho do parâmetro: 0 = raiz "Tunely"; > 0 = livro (precisa estar visível). */
async function deckParam(req: Request): Promise<number> {
  const deck = z.coerce.number().int().min(0).parse(req.params.deck);
  if (deck !== ROOT_DECK) await loadVisibleContent(deck, req.userRole);
  return deck;
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
  const content = await prisma.readingContent.findUnique({ where: { id: card.contentId }, select: { title: true } });
  return {
    id: card.id,
    contentId: card.contentId,
    bookTitle: content?.title ?? '',
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

async function nextPayload(userId: string, deck: number) {
  const now = new Date();
  for (let attempt = 0; attempt < 5; attempt++) {
    const queue = await buildQueue(userId, deck, now);
    // Cartão mostrado com as opções do baralho dele (o livro), como no Anki.
    const cardConfig = queue.card ? await effectiveConfig(userId, queue.card.contentId) : queue.config;
    const base = { counts: queue.counts, config: cardConfig, deck };
    if (!queue.card) return { ...base, card: null, nextLearningAt: queue.nextLearningAt };
    const card = await serializeCard(queue.card, cardConfig, now, queue.today);
    if (card) return { ...base, card, nextLearningAt: null };
    // Frase sumiu (nova segmentação): suspende o cartão órfão e tenta o próximo.
    await prisma.userStudyCard.update({ where: { id: queue.card.id }, data: { queue: 'suspended' } });
  }
  return { card: null, counts: { new: 0, learning: 0, review: 0 }, nextLearningAt: null, config: await effectiveConfig(userId, deck), deck };
}

// ----------------------------------------------------------------------------- opções
async function presetsWithUsage(userId: string) {
  const fallback = await ensureDefaultPreset(userId);
  const [presets, decks] = await Promise.all([
    prisma.userStudyPreset.findMany({ where: { userId }, orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] }),
    prisma.userStudyDeck.findMany({ where: { userId }, select: { contentId: true, presetId: true } }),
  ]);
  const deckIds = new Set([ROOT_DECK, ...(await listBookDecks(userId))]);
  const assigned = new Map(decks.map((d) => [d.contentId, d.presetId ?? fallback.id]));
  const usage = new Map<number, number>();
  for (const id of deckIds) {
    const presetId = assigned.get(id) ?? fallback.id;
    usage.set(presetId, (usage.get(presetId) ?? 0) + 1);
  }
  return presets.map((preset) => ({ id: preset.id, name: preset.name, config: resolvePresetConfig(preset.config), usedBy: usage.get(preset.id) ?? 0 }));
}

async function deckInfo(userId: string, deck: number) {
  const [row, global] = await Promise.all([deckRow(userId, deck), loadGlobal(userId)]);
  const preset = await presetForDeck(userId, row);
  const today = dayNumber(new Date(), global);
  const title = deck === ROOT_DECK
    ? ROOT_DECK_NAME
    : (await prisma.readingContent.findUnique({ where: { id: deck }, select: { title: true } }))?.title ?? 'Livro';
  const todayValue = (value: unknown) => {
    const parsed = value as { day?: number; limit?: number } | null;
    return parsed && parsed.day === today && typeof parsed.limit === 'number' ? parsed.limit : null;
  };
  return {
    contentId: deck,
    title,
    presetId: preset.id,
    newLimit: row?.newLimit ?? null,
    reviewLimit: row?.reviewLimit ?? null,
    newLimitToday: todayValue(row?.newLimitToday),
    reviewLimitToday: todayValue(row?.reviewLimitToday),
    effective: deckLimits(row, resolvePresetConfig(preset.config), today),
  };
}

studyRouter.get(
  '/options',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const deck = z.coerce.number().int().min(0).default(ROOT_DECK).parse(req.query.deck ?? ROOT_DECK);
    if (deck !== ROOT_DECK) await loadVisibleContent(deck, req.userRole);
    res.json({
      global: await loadGlobal(userId),
      presets: await presetsWithUsage(userId),
      deck: await deckInfo(userId, deck),
      defaults: { global: DEFAULT_GLOBAL_CONFIG, preset: DEFAULT_PRESET_CONFIG },
    });
  }),
);

const limitValue = z.number().int().min(0).max(99999).nullable();
const optionsSaveSchema = z.object({
  deck: z.number().int().min(0),
  presetId: z.number().int().positive(),
  config: presetConfigSchema,
  global: globalConfigSchema.partial().optional(),
  limits: z
    .object({ newLimit: limitValue, reviewLimit: limitValue, newLimitToday: limitValue, reviewLimitToday: limitValue })
    .partial()
    .optional(),
  // Edições feitas em outros presets nesta mesma tela (o Anki salva todas juntas).
  otherPresets: z.array(z.object({ id: z.number().int().positive(), config: presetConfigSchema })).max(50).default([]),
  // "Salvar em todos os subbaralhos" (só na raiz).
  applyToChildren: z.boolean().default(false),
});

studyRouter.put(
  '/options',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const body = optionsSaveSchema.parse(req.body);
    if (body.deck !== ROOT_DECK) await loadVisibleContent(body.deck, req.userRole);
    if (body.config.easyInterval < body.config.graduatingInterval) {
      throw new HttpError(400, 'O intervalo fácil deve ser maior ou igual ao intervalo de graduação');
    }
    const preset = await prisma.userStudyPreset.findFirst({ where: { id: body.presetId, userId } });
    if (!preset) throw new HttpError(404, 'Preset não encontrado');
    await prisma.userStudyPreset.update({ where: { id: preset.id }, data: { config: body.config as unknown as Prisma.InputJsonValue } });
    for (const other of body.otherPresets) {
      if (other.id === preset.id) continue;
      await prisma.userStudyPreset.updateMany({ where: { id: other.id, userId }, data: { config: other.config as unknown as Prisma.InputJsonValue } });
    }
    if (body.global) await saveGlobal(userId, { ...(await loadGlobal(userId)), ...body.global });
    const today = dayNumber(new Date(), await loadGlobal(userId));
    const limits = body.limits ?? {};
    const todayJson = (value: number | null | undefined) =>
      value === undefined ? undefined : value === null ? (null as unknown as Prisma.InputJsonValue) : ({ day: today, limit: value } as Prisma.InputJsonValue);
    const deckData = {
      presetId: preset.id,
      newLimit: limits.newLimit,
      reviewLimit: limits.reviewLimit,
      newLimitToday: todayJson(limits.newLimitToday),
      reviewLimitToday: todayJson(limits.reviewLimitToday),
    };
    await prisma.userStudyDeck.upsert({
      where: { userId_contentId: { userId, contentId: body.deck } },
      create: { userId, contentId: body.deck, ...deckData },
      update: deckData,
    });
    if (body.applyToChildren && body.deck === ROOT_DECK) {
      for (const child of await listBookDecks(userId)) {
        await prisma.userStudyDeck.upsert({
          where: { userId_contentId: { userId, contentId: child } },
          create: { userId, contentId: child, presetId: preset.id },
          update: { presetId: preset.id },
        });
      }
    }
    res.json({
      global: await loadGlobal(userId),
      presets: await presetsWithUsage(userId),
      deck: await deckInfo(userId, body.deck),
      defaults: { global: DEFAULT_GLOBAL_CONFIG, preset: DEFAULT_PRESET_CONFIG },
    });
  }),
);

studyRouter.post(
  '/presets',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const { name, cloneFrom } = z.object({ name: z.string().trim().min(1).max(80), cloneFrom: z.number().int().positive().optional() }).parse(req.body);
    await ensureDefaultPreset(userId);
    let config = DEFAULT_PRESET_CONFIG;
    if (cloneFrom) {
      const source = await prisma.userStudyPreset.findFirst({ where: { id: cloneFrom, userId } });
      if (!source) throw new HttpError(404, 'Preset não encontrado');
      config = resolvePresetConfig(source.config);
    }
    const exists = await prisma.userStudyPreset.findUnique({ where: { userId_name: { userId, name } } });
    if (exists) throw new HttpError(409, 'Já existe um preset com esse nome');
    const created = await prisma.userStudyPreset.create({ data: { userId, name, config: config as unknown as Prisma.InputJsonValue } });
    res.status(201).json({ id: created.id, name: created.name, config, usedBy: 0 });
  }),
);

studyRouter.patch(
  '/presets/:id',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const { name } = z.object({ name: z.string().trim().min(1).max(80) }).parse(req.body);
    const preset = await prisma.userStudyPreset.findFirst({ where: { id, userId } });
    if (!preset) throw new HttpError(404, 'Preset não encontrado');
    if (preset.name === DEFAULT_PRESET_NAME) throw new HttpError(400, 'O preset Default não pode ser renomeado');
    const clash = await prisma.userStudyPreset.findUnique({ where: { userId_name: { userId, name } } });
    if (clash && clash.id !== id) throw new HttpError(409, 'Já existe um preset com esse nome');
    await prisma.userStudyPreset.update({ where: { id }, data: { name } });
    res.json({ id, name });
  }),
);

studyRouter.delete(
  '/presets/:id',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const preset = await prisma.userStudyPreset.findFirst({ where: { id, userId } });
    if (!preset) throw new HttpError(404, 'Preset não encontrado');
    if (preset.name === DEFAULT_PRESET_NAME) throw new HttpError(400, 'O preset Default não pode ser removido');
    // Baralhos que usavam o preset voltam ao Default (presetId = null).
    await prisma.userStudyPreset.delete({ where: { id } });
    res.json({ removed: true });
  }),
);

studyRouter.post(
  '/presets/from-anki',
  asyncHandler(async (req, res) => {
    const { config } = z.object({ config: z.record(z.unknown()) }).parse(req.body);
    res.json({ config: fromLegacyDeckConfig(config) });
  }),
);

// ----------------------------------------------------------------------------- baralhos
studyRouter.get(
  '/decks',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const now = new Date();
    const books = await listBookDecks(userId);
    const contents = await prisma.readingContent.findMany({
      where: { id: { in: books } },
      select: { id: true, title: true, author: true, coverUrl: true, coverPalette: true },
    });
    const children = await Promise.all(
      contents.map(async (content) => ({ ...content, counts: (await buildQueue(userId, content.id, now, { dryRun: true })).counts })),
    );
    children.sort((a, b) => a.title.localeCompare(b.title));
    const root = await buildQueue(userId, ROOT_DECK, now, { dryRun: true });
    res.json({ root: { contentId: ROOT_DECK, title: ROOT_DECK_NAME, counts: root.counts }, decks: children });
  }),
);

studyRouter.get(
  '/:deck/overview',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const deck = await deckParam(req);
    const queue = await buildQueue(userId, deck, new Date());
    const where = deck === ROOT_DECK ? { userId } : { userId, contentId: deck };
    const cards = await prisma.userStudyCard.findMany({ where, select: { segmentKey: true, queue: true } });
    const queues: Record<string, number> = {};
    for (const card of cards) queues[card.queue] = (queues[card.queue] ?? 0) + 1;
    const totalLines = deck === ROOT_DECK ? 0 : await prisma.readingSentence.count({ where: { contentId: deck } });
    const info = await deckInfo(userId, deck);
    const preset = await prisma.userStudyPreset.findUnique({ where: { id: info.presetId }, select: { name: true } });
    res.json({
      config: queue.config,
      deck: { ...info, presetName: preset?.name ?? DEFAULT_PRESET_NAME },
      counts: queue.counts,
      today: { newDone: queue.newDone, reviewsDone: queue.reviewsDone },
      nextLearningAt: queue.card ? null : queue.nextLearningAt,
      queues,
      totalLines,
      cards: deck === ROOT_DECK ? {} : Object.fromEntries(cards.map((card) => [card.segmentKey, card.queue])),
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
    const config = await effectiveConfig(userId, contentId);
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
  '/:deck/next',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    res.json(await nextPayload(userId, await deckParam(req)));
  }),
);

studyRouter.post(
  '/cards/:id/answer',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const { answer, timeMs, deck } = z
      .object({
        answer: z.number().int().min(1).max(4),
        timeMs: z.number().int().min(0).max(3_600_000).default(0),
        deck: z.number().int().min(0).optional(),
      })
      .parse(req.body);
    const card = await prisma.userStudyCard.findFirst({ where: { id, userId } });
    if (!card || !APP_QUEUES.includes(card.queue) || card.queue === 'suspended') throw new HttpError(404, 'Cartão não encontrado');
    const config = await effectiveConfig(userId, card.contentId);
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
    const next = await nextPayload(userId, deck ?? card.contentId);
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

/** Ocultar ("bury") até o próximo dia de estudo. */
studyRouter.post(
  '/cards/:id/bury',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const card = await prisma.userStudyCard.findFirst({ where: { id, userId } });
    if (!card) throw new HttpError(404, 'Cartão não encontrado');
    const global = await loadGlobal(userId);
    await prisma.userStudyCard.update({ where: { id }, data: { buriedDay: dayNumber(new Date(), global) } });
    res.json({ id, buried: true });
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
  const config = await effectiveConfig(userId, contentId);
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
    const config = await effectiveConfig(userId, contentId);
    const preset = await presetForDeck(userId, await deckRow(userId, contentId));
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
      presetName: preset.name,
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
    const config = await effectiveConfig(userId, contentId);
    const preset = await presetForDeck(userId, await deckRow(userId, contentId));
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
      presetName: preset.name,
      deckConfig: legacyDeckConfig(config, Math.floor(Date.now() / 1000), preset.id, preset.name),
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
