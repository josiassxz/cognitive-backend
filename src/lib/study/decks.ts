// Baralhos, presets e fila de estudo no modelo do agendador v3 do Anki.
//
// Hierarquia: "Tunely" (contentId 0, raiz) → um baralho por livro. Cada baralho usa um preset
// de opções; limites diários vêm do preset, com sobreposição "Esse baralho" e "Somente hoje".
// Ao estudar a raiz, valem os limites de cada livro e os da raiz; ao estudar um livro, os da
// raiz só valem com "Os limites começam do deck superior" (opção global).
import type { Prisma, UserStudyCard, UserStudyDeck, UserStudyPreset } from '@prisma/client';
import { prisma } from '../prisma';
import {
  dayNumber,
  DEFAULT_PRESET_CONFIG,
  resolveGlobalConfig,
  resolvePresetConfig,
  type GlobalConfig,
  type PresetConfig,
  type StudyConfig,
} from './config';

export const ROOT_DECK = 0;
export const ROOT_DECK_NAME = 'Tunely';
export const DEFAULT_PRESET_NAME = 'Default';

type TodayLimit = { day: number; limit: number };

// ----------------------------------------------------------------------------- opções
export async function loadGlobal(userId: string): Promise<GlobalConfig> {
  const row = await prisma.userStudySettings.findUnique({ where: { userId } });
  return resolveGlobalConfig(row?.config);
}

export async function saveGlobal(userId: string, config: GlobalConfig) {
  const json = config as unknown as Prisma.InputJsonValue;
  await prisma.userStudySettings.upsert({ where: { userId }, create: { userId, config: json }, update: { config: json } });
}

export async function ensureDefaultPreset(userId: string): Promise<UserStudyPreset> {
  const existing = await prisma.userStudyPreset.findUnique({ where: { userId_name: { userId, name: DEFAULT_PRESET_NAME } } });
  if (existing) return existing;
  // Primeiro preset do usuário: herda opções antigas (versão sem presets), se houver.
  const legacy = await prisma.userStudySettings.findUnique({ where: { userId } });
  await prisma.userStudyPreset.createMany({
    data: [{ userId, name: DEFAULT_PRESET_NAME, config: resolvePresetConfig(legacy?.config) as unknown as Prisma.InputJsonValue }],
    skipDuplicates: true,
  });
  return prisma.userStudyPreset.findUniqueOrThrow({ where: { userId_name: { userId, name: DEFAULT_PRESET_NAME } } });
}

export async function deckRow(userId: string, contentId: number): Promise<UserStudyDeck | null> {
  return prisma.userStudyDeck.findUnique({ where: { userId_contentId: { userId, contentId } } });
}

export async function presetForDeck(userId: string, deck: UserStudyDeck | null): Promise<UserStudyPreset> {
  if (deck?.presetId) {
    const preset = await prisma.userStudyPreset.findFirst({ where: { id: deck.presetId, userId } });
    if (preset) return preset;
  }
  return ensureDefaultPreset(userId);
}

export async function effectiveConfig(userId: string, contentId: number): Promise<StudyConfig> {
  const [global, deck] = await Promise.all([loadGlobal(userId), deckRow(userId, contentId)]);
  const preset = await presetForDeck(userId, deck);
  return { ...resolvePresetConfig(preset.config), ...global };
}

function todayLimit(value: unknown, today: number): number | null {
  const parsed = value as TodayLimit | null;
  return parsed && typeof parsed.limit === 'number' && parsed.day === today ? parsed.limit : null;
}

/** Limites do baralho hoje: "Somente hoje" > "Esse baralho" > preset. */
export function deckLimits(deck: UserStudyDeck | null, preset: PresetConfig, today: number) {
  return {
    newLimit: todayLimit(deck?.newLimitToday, today) ?? deck?.newLimit ?? preset.newPerDay,
    reviewLimit: todayLimit(deck?.reviewLimitToday, today) ?? deck?.reviewLimit ?? preset.reviewsPerDay,
  };
}

/** Livros que viraram baralho para este usuário. */
export async function listBookDecks(userId: string): Promise<number[]> {
  const [cards, decks] = await Promise.all([
    prisma.userStudyCard.groupBy({ by: ['contentId'], where: { userId } }),
    prisma.userStudyDeck.findMany({ where: { userId, contentId: { gt: 0 } }, select: { contentId: true } }),
  ]);
  const ids = [...new Set([...cards.map(c => c.contentId), ...decks.map(d => d.contentId)])];
  const visible = await prisma.readingContent.findMany({
    where: { id: { in: ids }, OR: [{ userId }, { isPublic: true, sourceType: { not: 'custom-deck' } }] },
    select: { id: true },
  });
  return visible.map(content => content.id);
}

// ----------------------------------------------------------------------------- fila
interface DeckState {
  contentId: number;
  config: StudyConfig;
  newRemaining: number;
  reviewRemaining: number;
  newDone: number;
  reviewsDone: number;
}

function seeded(id: number, seed: number): number {
  let h = (id * 2654435761 + seed * 97) >>> 0;
  h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d) >>> 0;
  return (h ^ (h >>> 13)) >>> 0;
}

async function deckState(userId: string, contentId: number, global: GlobalConfig, today: number): Promise<DeckState> {
  const deck = await deckRow(userId, contentId);
  const presetRow = await presetForDeck(userId, deck);
  const preset = resolvePresetConfig(presetRow.config);
  const where = contentId === ROOT_DECK ? { userId } : { userId, contentId };
  const [newDone, reviewsDone] = await Promise.all([
    prisma.userStudyCard.count({ where: { ...where, introducedDay: today } }),
    prisma.userStudyReview.count({ where: { ...where, day: today, kind: 1 } }),
  ]);
  const limits = deckLimits(deck, preset, today);
  // v3: novos estudados contam no limite de revisão, salvo "Novos cartões ignoram o limite de revisão".
  const reviewRemaining = Math.max(limits.reviewLimit - reviewsDone - (global.newIgnoresReviewLimit ? 0 : newDone), 0);
  const newRemaining = Math.max(Math.min(limits.newLimit - newDone, global.newIgnoresReviewLimit ? Infinity : reviewRemaining), 0);
  return { contentId, config: { ...preset, ...global }, newRemaining, reviewRemaining, newDone, reviewsDone };
}

/** Puxa as próximas frases do livro para a fila de novos até cobrir o limite do dia. */
// Regra do produto: o livro NUNCA entra inteiro no baralho. Só viram cartões as frases que o
// aluno marca como concluídas no linha a linha (ver routes/reading-segments.ts). Esta função
// fica desligada e só é mantida para uma eventual opção futura.
const AUTO_ADD_ENABLED = false;

async function topUpNewCards(userId: string, state: DeckState) {
  const { contentId, config } = state;
  if (!AUTO_ADD_ENABLED || !config.autoAddFromBook || state.newRemaining <= 0 || contentId === ROOT_DECK) return;
  const have = await prisma.userStudyCard.count({ where: { userId, contentId, queue: 'new' } });
  const missing = state.newRemaining - have;
  if (missing <= 0) return;
  const existing = new Set(
    (await prisma.userStudyCard.findMany({ where: { userId, contentId }, select: { segmentKey: true } })).map((r) => r.segmentKey),
  );
  const rows = await prisma.readingSentence.findMany({
    where: { contentId, translation: { not: '' } },
    select: { id: true, segmentKey: true, sentenceIndex: true, text: true },
    orderBy: { sentenceIndex: 'asc' },
  });
  let candidates = rows.filter((row) => !existing.has(row.segmentKey ?? `sent_${row.id}`) && row.text.trim().length > 0);
  if (config.insertionOrder === 'random') candidates = candidates.sort(() => Math.random() - 0.5);
  const picked = candidates.slice(0, missing);
  if (!picked.length) return;
  await prisma.userStudyCard.createMany({
    data: picked.map((row) => ({
      userId,
      contentId,
      segmentKey: row.segmentKey ?? `sent_${row.id}`,
      position: config.insertionOrder === 'random' ? Math.floor(Math.random() * 1_000_000) : row.sentenceIndex,
      ease: config.startingEase,
    })),
    skipDuplicates: true,
  });
}

/** Quantas frases o livro ainda pode fornecer (para contar novos sem criar cartões). */
async function availableFromBook(userId: string, contentId: number): Promise<number> {
  const [lines, inDeck] = await Promise.all([
    prisma.readingSentence.count({ where: { contentId, translation: { not: '' } } }),
    prisma.userStudyCard.count({ where: { userId, contentId } }),
  ]);
  return Math.max(lines - inDeck, 0);
}

function retrievability(card: UserStudyCard, today: number): number {
  const elapsed = card.lastReviewDay === null ? card.interval : Math.max(today - card.lastReviewDay, 0);
  const stability = (card.fsrs as { stability?: number } | null)?.stability ?? Math.max(card.interval, 1);
  return Math.pow(1 + elapsed / (9 * Math.max(stability, 0.1)), -1);
}

function sortReviews(cards: UserStudyCard[], order: PresetConfig['reviewOrder'], today: number, titles: Map<number, string>) {
  const deckKey = (card: UserStudyCard) => titles.get(card.contentId) ?? String(card.contentId);
  const due = (card: UserStudyCard) => card.dueDay ?? today;
  const random = (card: UserStudyCard) => seeded(card.id, today);
  const by: Record<PresetConfig['reviewOrder'], (a: UserStudyCard, b: UserStudyCard) => number> = {
    dueRandom: (a, b) => due(a) - due(b) || random(a) - random(b),
    dueDeck: (a, b) => due(a) - due(b) || deckKey(a).localeCompare(deckKey(b)),
    deckDue: (a, b) => deckKey(a).localeCompare(deckKey(b)) || due(a) - due(b),
    ascendingIntervals: (a, b) => a.interval - b.interval || random(a) - random(b),
    descendingIntervals: (a, b) => b.interval - a.interval || random(a) - random(b),
    ascendingEase: (a, b) => a.ease - b.ease || random(a) - random(b),
    descendingEase: (a, b) => b.ease - a.ease || random(a) - random(b),
    // Recuperabilidade: com FSRS usa a estabilidade; sem FSRS aproxima pelo intervalo (como o Anki faz no SM-2).
    ascendingRetrievability: (a, b) => retrievability(a, today) - retrievability(b, today) || random(a) - random(b),
    descendingRetrievability: (a, b) => retrievability(b, today) - retrievability(a, today) || random(a) - random(b),
    random: (a, b) => random(a) - random(b),
    added: (a, b) => a.createdAt.getTime() - b.createdAt.getTime() || a.id - b.id,
    reverseAdded: (a, b) => b.createdAt.getTime() - a.createdAt.getTime() || b.id - a.id,
    relativeOverdueness: (a, b) =>
      (today - due(b)) / Math.max(b.interval, 1) - (today - due(a)) / Math.max(a.interval, 1) || random(a) - random(b),
  };
  return [...cards].sort(by[order]);
}

function orderNew(cards: UserStudyCard[], config: PresetConfig, today: number, titles: Map<number, string>) {
  const deckKey = (card: UserStudyCard) => titles.get(card.contentId) ?? String(card.contentId);
  const random = (card: UserStudyCard) => seeded(card.id, today);
  const gather: Record<PresetConfig['newGatherPriority'], (a: UserStudyCard, b: UserStudyCard) => number> = {
    deck: (a, b) => deckKey(a).localeCompare(deckKey(b)) || a.position - b.position || a.id - b.id,
    deckThenRandom: (a, b) => deckKey(a).localeCompare(deckKey(b)) || random(a) - random(b),
    ascendingPosition: (a, b) => a.position - b.position || a.id - b.id,
    descendingPosition: (a, b) => b.position - a.position || b.id - a.id,
    randomNotes: (a, b) => random(a) - random(b),
    randomCards: (a, b) => random(a) - random(b),
  };
  return [...cards].sort(gather[config.newGatherPriority]);
}

function applySortOrder(cards: UserStudyCard[], config: PresetConfig, today: number) {
  // Um único modelo de cartão por frase: "Modelo do cartão" equivale à ordem de coleta.
  if (config.newSortOrder === 'template' || config.newSortOrder === 'gathered') return cards;
  return [...cards].sort((a, b) => seeded(a.id, today + 1) - seeded(b.id, today + 1));
}

/** Escolhe entre duas filas segundo a mistura do Anki. */
function mixPick<T>(primary: T[], secondary: T[], mode: PresetConfig['newReviewMix'], doneCount: number): T | null {
  if (!primary.length) return secondary[0] ?? null;
  if (!secondary.length) return primary[0];
  if (mode === 'reviewsFirst') return primary[0];
  if (mode === 'newFirst') return secondary[0];
  const every = Math.max(Math.floor(primary.length / secondary.length), 1);
  return (doneCount + 1) % (every + 1) === 0 ? secondary[0] : primary[0];
}

export interface QueueResult {
  card: UserStudyCard | null;
  counts: { new: number; learning: number; review: number };
  nextLearningAt: Date | null;
  config: StudyConfig;
  today: number;
  newDone: number;
  reviewsDone: number;
}

/**
 * Fila do dia para um baralho (livro) ou para a raiz "Tunely" (todos os livros).
 * `dryRun`: só conta (não cria cartões novos) — usado na lista de baralhos.
 */
export async function buildQueue(userId: string, scope: number, now: Date, options: { dryRun?: boolean } = {}): Promise<QueueResult> {
  const global = await loadGlobal(userId);
  const today = dayNumber(now, global);
  const children = scope === ROOT_DECK ? await listBookDecks(userId) : [scope];
  const states = await Promise.all(children.map((id) => deckState(userId, id, global, today)));
  const useParent = scope === ROOT_DECK || global.applyAllParentLimits;
  const parent = useParent ? await deckState(userId, ROOT_DECK, global, today) : null;
  const scopeState = scope === ROOT_DECK ? (parent as DeckState) : states[0];
  const config = scopeState.config;

  if (!options.dryRun) await Promise.all(states.map((state) => topUpNewCards(userId, state)));

  const contentIds = children;
  const notBuried = { OR: [{ buriedDay: null }, { buriedDay: { lt: today } }] };
  const aheadLimit = new Date(now.getTime() + global.learnAheadMinutes * 60_000);
  const endOfToday = new Date(now.getTime() + 36 * 3_600_000);
  const [learning, reviews, fresh, contents] = await Promise.all([
    prisma.userStudyCard.findMany({ where: { userId, contentId: { in: contentIds }, queue: 'learning', dueAt: { lte: endOfToday }, ...notBuried }, orderBy: { dueAt: 'asc' } }),
    prisma.userStudyCard.findMany({ where: { userId, contentId: { in: contentIds }, queue: 'review', dueDay: { lte: today }, ...notBuried } }),
    prisma.userStudyCard.findMany({ where: { userId, contentId: { in: contentIds }, queue: 'new', ...notBuried }, orderBy: [{ position: 'asc' }, { id: 'asc' }] }),
    prisma.readingContent.findMany({ where: { id: { in: contentIds } }, select: { id: true, title: true } }),
  ]);
  const titles = new Map(contents.map((c) => [c.id, c.title]));

  // Aprendizado entre dias: passo ≥ 1 dia; vence no dia (não na hora) e conta como revisão.
  const isInterday = (card: UserStudyCard) =>
    !!card.dueAt && !!card.lastReviewAt && card.dueAt.getTime() - card.lastReviewAt.getTime() >= 86_400_000;
  const interday = learning.filter((card) => isInterday(card) && dayNumber(card.dueAt as Date, global) <= today);
  const intraday = learning.filter((card) => !isInterday(card));

  // Limites por baralho e do pai.
  const stateById = new Map(states.map((s) => [s.contentId, s]));
  const capPerDeck = (cards: UserStudyCard[], key: 'reviewRemaining' | 'newRemaining') => {
    const used = new Map<number, number>();
    return cards.filter((card) => {
      const limit = stateById.get(card.contentId)?.[key] ?? 0;
      const count = used.get(card.contentId) ?? 0;
      if (count >= limit) return false;
      used.set(card.contentId, count + 1);
      return true;
    });
  };
  const capParent = <T>(cards: T[], key: 'reviewRemaining' | 'newRemaining') => (parent ? cards.slice(0, parent[key]) : cards);

  const reviewLike = capParent(capPerDeck(sortReviews([...reviews, ...interday], config.reviewOrder, today, titles), 'reviewRemaining'), 'reviewRemaining');
  const interdayIds = new Set(interday.map((c) => c.id));
  const dueReviews = reviewLike.filter((c) => !interdayIds.has(c.id));
  const dueInterday = reviewLike.filter((c) => interdayIds.has(c.id));
  const newCards = applySortOrder(capParent(capPerDeck(orderNew(fresh, config, today, titles), 'newRemaining'), 'newRemaining'), config, today);

  let newCount = newCards.length;
  if (options.dryRun) {
    // Conta também as frases que ainda seriam puxadas do livro.
    let extraTotal = 0;
    for (const state of states) {
      if (!AUTO_ADD_ENABLED || !state.config.autoAddFromBook) continue;
      const have = newCards.filter((c) => c.contentId === state.contentId).length;
      const room = Math.max(state.newRemaining - have, 0);
      if (room > 0) extraTotal += Math.min(room, await availableFromBook(userId, state.contentId));
    }
    newCount = parent ? Math.min(newCount + extraTotal, parent.newRemaining) : newCount + extraTotal;
  }

  const intradayNow = intraday.filter((c) => (c.dueAt as Date) <= now);
  const intradayAhead = intraday.filter((c) => (c.dueAt as Date) <= aheadLimit);
  let card: UserStudyCard | null = intradayNow[0] ?? null;
  if (!card) {
    const doneTotal = scopeState.reviewsDone + scopeState.newDone;
    const reviewSide = mixPick(dueReviews, dueInterday, config.interdayLearningMix, scopeState.reviewsDone);
    const reviewQueue = reviewSide ? [reviewSide, ...[...dueReviews, ...dueInterday].filter((c) => c.id !== reviewSide.id)] : [];
    card = mixPick(reviewQueue, newCards, config.newReviewMix, doneTotal);
  }
  if (!card) card = intradayAhead[0] ?? null;
  const pendingLearning = intraday.filter((c) => (c.dueAt as Date) > aheadLimit);

  return {
    card,
    counts: { new: newCount, learning: intradayAhead.length + dueInterday.length, review: dueReviews.length },
    nextLearningAt: card ? null : (pendingLearning[0]?.dueAt ?? null),
    config,
    today,
    newDone: scopeState.newDone,
    reviewsDone: scopeState.reviewsDone,
  };
}

/** Preset padrão para quem ainda não tem nenhum. */
export function presetDefaults(): PresetConfig {
  return DEFAULT_PRESET_CONFIG;
}
