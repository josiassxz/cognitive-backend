// Agendador dos cartões de estudo. Reimplementa o comportamento do agendador v3 do Anki
// (SM-2: passos de aprendizado/reaprendizado, graduação, facilidade, bônus, fuzz, sanguessuga)
// e usa ts-fsrs quando o FSRS está ligado — como o Anki faz com o crate `fsrs`.
// Referência: ankitects/anki rslib/src/scheduler/states/{steps,learning,review,relearning,fuzz}.rs
import { createEmptyCard, fsrs, Rating, State, type Card as FsrsCard, type Grade, type StepUnit } from 'ts-fsrs';
import { weekdayIndex, type StudyConfig } from './config';

export type CardType = 'new' | 'learning' | 'review' | 'relearning';
export type Answer = 1 | 2 | 3 | 4; // Errei | Difícil | Bom | Fácil (como no Anki)

export interface CardSched {
  id: number;
  type: CardType;
  /** Passos restantes (como `left % 1000` no Anki). */
  remainingSteps: number;
  /** Intervalo de revisão atual, em dias (em reaprendizado: o intervalo que valerá ao graduar). */
  interval: number;
  ease: number;
  reps: number;
  lapses: number;
  leech: boolean;
  lastReviewDay: number | null;
  lastReviewAt: Date | null;
  fsrs: FsrsCardJson | null;
}

export interface FsrsCardJson {
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number;
  last_review?: string | null;
}

export interface Outcome {
  type: CardType;
  remainingSteps: number;
  interval: number;
  ease: number;
  lapses: number;
  leech: boolean;
  /** Atraso até o próximo encontro: segundos (aprendizado) ou dias (revisão). */
  delay: { secs: number } | { days: number };
  fsrs: FsrsCardJson | null;
  /** Revlog do Anki: 0 aprendizado, 1 revisão, 2 reaprendizado. */
  revlogKind: 0 | 1 | 2;
  /** Acabou de virar sanguessuga nesta resposta. */
  becameLeech: boolean;
}

const DAY_SECS = 86_400;
const MIN_EASE = 1.3;

// ----------------------------------------------------------------------------- passos
function toSecs(minutes: number): number {
  return Math.floor(minutes * 60);
}

function roundInDays(secs: number): number {
  return secs > DAY_SECS ? Math.round(secs / DAY_SECS) * DAY_SECS : secs;
}

export class Steps {
  constructor(private readonly steps: number[]) {}

  get empty(): boolean {
    return this.steps.length === 0;
  }

  private index(remaining: number): number {
    const total = this.steps.length;
    return Math.min(Math.max(total - (remaining % 1000), 0), Math.max(total - 1, 0));
  }

  private secsAt(index: number): number | null {
    const value = this.steps[index];
    return value === undefined ? null : toSecs(value);
  }

  againDelay(): number | null {
    return this.secsAt(0);
  }

  hardDelay(remaining: number): number | null {
    const idx = this.index(remaining);
    const current = this.secsAt(idx) ?? this.secsAt(0);
    if (current === null) return null;
    if (idx !== 0) return current;
    const next = this.secsAt(1);
    if (next !== null) return roundInDays(Math.floor((current + next) / 2));
    return roundInDays(Math.min(Math.floor((current * 3) / 2), current + DAY_SECS));
  }

  goodDelay(remaining: number): number | null {
    return this.secsAt(this.index(remaining) + 1);
  }

  remainingForGood(remaining: number): number {
    return Math.max(this.steps.length - (this.index(remaining) + 1), 0);
  }

  remainingForFailed(): number {
    return this.steps.length;
  }
}

// ----------------------------------------------------------------------------- fuzz
const FUZZ_RANGES = [
  { start: 2.5, end: 7, factor: 0.15 },
  { start: 7, end: 20, factor: 0.1 },
  { start: 20, end: Number.MAX_VALUE, factor: 0.05 },
];

function fuzzDelta(interval: number): number {
  if (interval < 2.5) return 0;
  return FUZZ_RANGES.reduce((delta, range) => delta + range.factor * Math.max(Math.min(interval, range.end) - range.start, 0), 1);
}

export function constrainedFuzzBounds(interval: number, minimum: number, maximum: number): [number, number] {
  const min = Math.min(minimum, maximum);
  const ivl = Math.min(Math.max(interval, min), maximum);
  const delta = fuzzDelta(ivl);
  let lower = Math.round(ivl - delta);
  let upper = Math.round(ivl + delta);
  lower = Math.min(Math.max(lower, min), maximum);
  upper = Math.min(Math.max(upper, min), maximum);
  if (upper === lower && upper > 2 && upper < maximum) upper = lower + 1;
  return [lower, upper];
}

export function withFuzz(fuzzFactor: number | null, interval: number, minimum: number, maximum: number): number {
  if (fuzzFactor === null) return Math.min(Math.max(Math.round(interval), minimum), maximum);
  const [lower, upper] = constrainedFuzzBounds(interval, minimum, maximum);
  return Math.floor(lower + fuzzFactor * (1 + upper - lower));
}

/** Fator de fuzz determinístico por cartão + repetições (como o seed do Anki). */
export function fuzzFactorFor(cardId: number, reps: number): number {
  let h = (cardId * 2654435761 + reps * 40503) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  h = (h ^ (h >>> 16)) >>> 0;
  return h / 4294967296;
}

// ----------------------------------------------------------------------------- SM-2
interface Ctx {
  steps: Steps;
  relearn: Steps;
  config: StudyConfig;
  fuzz: number | null;
  today: number;
}

/**
 * Fuzz com "Dias de Descanso": dentro da faixa de fuzz, os dias da semana marcados como
 * Reduzido/Mínimo recebem menos (ou nenhuma) revisão, como o balanceador do Anki.
 */
export function fuzzedWithEasyDays(
  fuzz: number | null, interval: number, minimum: number, maximum: number, today: number, easyDays: number[],
): number {
  if (fuzz === null || easyDays.every((weight) => weight >= 1)) return withFuzz(fuzz, interval, minimum, maximum);
  const [lower, upper] = constrainedFuzzBounds(interval, minimum, maximum);
  const weights: number[] = [];
  for (let days = lower; days <= upper; days++) weights.push(easyDays[weekdayIndex(today + days)] ?? 1);
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  if (total <= 0) return withFuzz(fuzz, interval, minimum, maximum);
  let target = fuzz * total;
  for (let i = 0; i < weights.length; i++) {
    target -= weights[i];
    if (target < 0) return lower + i;
  }
  return upper;
}

function fuzzed(ctx: Ctx, interval: number, minimum: number, maximum: number): number {
  return fuzzedWithEasyDays(ctx.fuzz, interval, minimum, maximum, ctx.today, ctx.config.easyDays);
}

function minMax(ctx: Ctx, minimum: number): [number, number] {
  const maximum = Math.max(ctx.config.maximumInterval, 1);
  return [Math.min(Math.max(minimum, 1), maximum), maximum];
}

function leechMet(lapses: number, threshold: number): boolean {
  if (threshold <= 0) return false;
  const half = Math.max(Math.ceil(threshold / 2), 1);
  return lapses >= threshold && (lapses - threshold) % half === 0;
}

function constrainPassing(ctx: Ctx, interval: number, minimum: number, fuzz: boolean): number {
  const [min, max] = minMax(ctx, minimum);
  const value = interval * ctx.config.intervalModifier;
  return fuzz ? fuzzed(ctx, value, min, max) : Math.min(Math.max(Math.round(value), min), max);
}

function learnOutcome(card: CardSched, answer: Answer, ctx: Ctx): Outcome {
  const { steps, config } = ctx;
  const remaining = card.type === 'new' ? steps.remainingForFailed() : card.remainingSteps;
  const base = { ease: config.startingEase, lapses: card.lapses, leech: card.leech, fsrs: null, revlogKind: 0 as const, becameLeech: false };
  const graduate = (days: number): Outcome => {
    const [min, max] = minMax(ctx, 1);
    const interval = fuzzed(ctx, days, min, max);
    return { ...base, type: 'review', remainingSteps: 0, interval, delay: { days: interval } };
  };
  const learn = (secs: number, left: number): Outcome => ({
    ...base, type: 'learning', remainingSteps: left, interval: 0, delay: { secs },
  });
  if (answer === 4) {
    const [min, max] = minMax(ctx, 1);
    const interval = fuzzed(ctx, config.easyInterval, min, max);
    return { ...base, type: 'review', remainingSteps: 0, interval, delay: { days: interval } };
  }
  if (answer === 1) {
    const delay = steps.againDelay();
    return delay === null ? graduate(config.graduatingInterval) : learn(delay, steps.remainingForFailed());
  }
  if (answer === 2) {
    const delay = steps.hardDelay(remaining);
    return delay === null ? graduate(config.graduatingInterval) : learn(delay, remaining);
  }
  const delay = steps.goodDelay(remaining);
  return delay === null ? graduate(config.graduatingInterval) : learn(delay, steps.remainingForGood(remaining));
}

function failingInterval(scheduled: number, ctx: Ctx): number {
  const [min, max] = minMax(ctx, ctx.config.minimumInterval);
  return fuzzed(ctx, Math.max(scheduled, 1) * ctx.config.newInterval, min, max);
}

function reviewOutcome(card: CardSched, answer: Answer, ctx: Ctx, today: number): Outcome {
  const { config } = ctx;
  const scheduled = card.interval;
  const elapsed = card.lastReviewDay === null ? scheduled : Math.max(today - card.lastReviewDay, 0);
  const daysLate = elapsed - scheduled;
  const keep = { lapses: card.lapses, leech: card.leech, fsrs: null, revlogKind: 1 as const, becameLeech: false };

  if (answer === 1) {
    const lapses = card.lapses + 1;
    const becameLeech = leechMet(lapses, config.leechThreshold);
    const interval = Math.max(Math.round(failingInterval(scheduled, ctx)), 1);
    const ease = Math.max(card.ease - 0.2, MIN_EASE);
    const delay = ctx.relearn.againDelay();
    const common = { ...keep, lapses, leech: card.leech || becameLeech, becameLeech, ease, interval };
    return delay === null
      ? { ...common, type: 'review', remainingSteps: 0, delay: { days: interval } }
      : { ...common, type: 'relearning', remainingSteps: ctx.relearn.remainingForFailed(), delay: { secs: delay } };
  }

  let hard: number;
  let good: number;
  let easy: number;
  const current = Math.max(scheduled, 1);
  if (daysLate < 0) {
    // revisão antecipada
    hard = constrainPassing(ctx, Math.max(elapsed * config.hardInterval, current * (config.hardInterval / 2)), 0, false);
    good = constrainPassing(ctx, Math.max(elapsed * card.ease, current), 0, false);
    const reducedBonus = config.easyBonus - (config.easyBonus - 1) / 2;
    easy = constrainPassing(ctx, Math.max(elapsed * card.ease, current) * reducedBonus, 0, false);
  } else {
    const late = Math.max(daysLate, 0);
    const hardMin = config.hardInterval <= 1 ? 0 : scheduled + 1;
    hard = constrainPassing(ctx, current * config.hardInterval, hardMin, true);
    const goodMin = config.hardInterval <= 1 ? scheduled + 1 : hard + 1;
    good = constrainPassing(ctx, (current + late / 2) * card.ease, goodMin, true);
    easy = constrainPassing(ctx, (current + late) * card.ease * config.easyBonus, good + 1, true);
  }
  const pick = answer === 2 ? hard : answer === 3 ? good : easy;
  const ease = answer === 2 ? Math.max(card.ease - 0.15, MIN_EASE) : answer === 4 ? card.ease + 0.15 : card.ease;
  return { ...keep, type: 'review', remainingSteps: 0, interval: pick, ease, delay: { days: pick } };
}

function relearnOutcome(card: CardSched, answer: Answer, ctx: Ctx): Outcome {
  const keep = { lapses: card.lapses, leech: card.leech, ease: card.ease, fsrs: null, revlogKind: 2 as const, becameLeech: false };
  const toReview = (interval: number): Outcome => ({ ...keep, type: 'review', remainingSteps: 0, interval, delay: { days: interval } });
  if (answer === 4) return toReview(card.interval + 1);
  if (answer === 1) {
    const interval = Math.max(Math.round(failingInterval(card.interval, ctx)), 1);
    const delay = ctx.relearn.againDelay();
    return delay === null
      ? toReview(card.interval)
      : { ...keep, type: 'relearning', interval, remainingSteps: ctx.relearn.remainingForFailed(), delay: { secs: delay } };
  }
  if (answer === 2) {
    const delay = ctx.relearn.hardDelay(card.remainingSteps);
    return delay === null ? toReview(card.interval) : { ...keep, type: 'relearning', interval: card.interval, remainingSteps: card.remainingSteps, delay: { secs: delay } };
  }
  const delay = ctx.relearn.goodDelay(card.remainingSteps);
  return delay === null
    ? toReview(card.interval)
    : { ...keep, type: 'relearning', interval: card.interval, remainingSteps: ctx.relearn.remainingForGood(card.remainingSteps), delay: { secs: delay } };
}

// ----------------------------------------------------------------------------- FSRS
function stepUnits(steps: number[]): StepUnit[] {
  return steps.map((m) => `${m}m` as StepUnit);
}

function toFsrsCard(json: FsrsCardJson | null, now: Date): FsrsCard {
  if (!json) return createEmptyCard(now);
  return {
    ...json,
    due: new Date(json.due),
    state: json.state as State,
    last_review: json.last_review ? new Date(json.last_review) : undefined,
  };
}

function fromFsrsCard(card: FsrsCard): FsrsCardJson {
  return {
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    learning_steps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    last_review: card.last_review ? card.last_review.toISOString() : null,
  };
}

/** Cartão FSRS inicial a partir do estado SM-2 (para quem liga o FSRS com cartões já estudados). */
function seedFsrsFromSm2(card: CardSched, now: Date): FsrsCardJson | null {
  if (card.fsrs || card.type === 'new') return card.fsrs;
  const empty = createEmptyCard(now);
  return fromFsrsCard({
    ...empty,
    state: card.type === 'review' ? State.Review : card.type === 'learning' ? State.Learning : State.Relearning,
    stability: Math.max(card.interval, 0.5),
    difficulty: Math.min(Math.max(11 - card.ease * 2, 1), 10),
    scheduled_days: card.interval,
    reps: card.reps,
    lapses: card.lapses,
    last_review: card.lastReviewAt ?? now,
  });
}

function fsrsOutcome(card: CardSched, answer: Answer, config: StudyConfig, now: Date, today: number): Outcome {
  const validParams = [17, 19, 21].includes(config.fsrsParams.length);
  const scheduler = fsrs({
    ...(validParams ? { w: config.fsrsParams } : {}),
    request_retention: config.desiredRetention,
    maximum_interval: config.maximumInterval,
    enable_fuzz: true,
    enable_short_term: true,
    learning_steps: stepUnits(config.learnSteps),
    relearning_steps: stepUnits(config.relearnSteps),
  });
  const before = toFsrsCard(seedFsrsFromSm2(card, now), now);
  const { card: next } = scheduler.next(before, now, answer as Grade);
  const json = fromFsrsCard(next);
  const lapses = next.lapses;
  const becameLeech = answer === Rating.Again && lapses > card.lapses && leechMet(lapses, config.leechThreshold);
  const revlogKind: 0 | 1 | 2 = before.state === State.Review ? 1 : before.state === State.Relearning ? 2 : 0;
  const leech = card.leech || becameLeech;
  if (next.state === State.Review) {
    const days = Math.max(Math.round((next.due.getTime() - now.getTime()) / 86_400_000), 1);
    return { type: 'review', remainingSteps: 0, interval: days, ease: card.ease, lapses, leech, delay: { days }, fsrs: json, revlogKind, becameLeech };
  }
  const secs = Math.max(Math.round((next.due.getTime() - now.getTime()) / 1000), 0);
  void today;
  return {
    type: next.state === State.Relearning ? 'relearning' : 'learning',
    remainingSteps: next.learning_steps,
    interval: card.interval,
    ease: card.ease,
    lapses,
    leech,
    delay: { secs },
    fsrs: json,
    revlogKind,
    becameLeech,
  };
}

// ----------------------------------------------------------------------------- API
export function answerCard(card: CardSched, answer: Answer, config: StudyConfig, now: Date, today: number): Outcome {
  if (config.fsrs) return fsrsOutcome(card, answer, config, now, today);
  const ctx: Ctx = {
    steps: new Steps(config.learnSteps),
    relearn: new Steps(config.relearnSteps),
    config,
    fuzz: fuzzFactorFor(card.id, card.reps),
    today,
  };
  if (card.type === 'new' || card.type === 'learning') return learnOutcome(card, answer, ctx);
  if (card.type === 'relearning') return relearnOutcome(card, answer, ctx);
  return reviewOutcome(card, answer, ctx, today);
}

/** Intervalos que cada botão daria (para mostrar sobre os botões, como no Anki). */
export function previewAnswers(card: CardSched, config: StudyConfig, now: Date, today: number) {
  return ([1, 2, 3, 4] as Answer[]).map((answer) => ({ answer, delay: answerCard(card, answer, config, now, today).delay }));
}
