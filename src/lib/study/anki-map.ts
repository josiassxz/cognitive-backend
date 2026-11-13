// Conversão entre o preset do Tunely e o formato de preset do Anki ("schema 11", usado no
// .apkg e pelo AnkiConnect getDeckConfig/saveDeckConfig). Valores de enum conforme
// ankitects/anki proto/anki/deck_config.proto e rslib/src/deckconfig/schema11.rs.
import { presetConfigSchema, type PresetConfig, type StudyConfig } from './config';

const GATHER: Record<PresetConfig['newGatherPriority'], number> = {
  deck: 0, ascendingPosition: 1, descendingPosition: 2, randomNotes: 3, randomCards: 4, deckThenRandom: 5,
};
const SORT: Record<PresetConfig['newSortOrder'], number> = {
  template: 0, gathered: 1, templateThenRandom: 2, randomNoteThenTemplate: 3, random: 4,
};
const REVIEW_ORDER: Record<PresetConfig['reviewOrder'], number> = {
  dueRandom: 0, dueDeck: 1, deckDue: 2, ascendingIntervals: 3, descendingIntervals: 4, ascendingEase: 5, descendingEase: 6,
  ascendingRetrievability: 7, random: 8, added: 9, reverseAdded: 10, descendingRetrievability: 11, relativeOverdueness: 12,
};
const MIX: Record<PresetConfig['newReviewMix'], number> = { mix: 0, reviewsFirst: 1, newFirst: 2 };
const QUESTION_ACTION: Record<PresetConfig['questionAction'], number> = { showAnswer: 0, showReminder: 1 };
const ANSWER_ACTION: Record<PresetConfig['answerAction'], number> = {
  buryCard: 0, answerAgain: 1, answerGood: 2, answerHard: 3, showReminder: 4,
};

function invert<K extends string>(map: Record<K, number>): Map<number, K> {
  return new Map(Object.entries(map).map(([key, value]) => [value as number, key as K]));
}

/** Preset no formato do Anki (dconf). */
export function legacyDeckConfig(config: StudyConfig, mod: number, id = 1_731_500_000_201, name = 'Tunely') {
  return {
    id,
    name,
    mod,
    usn: -1,
    dyn: false,
    maxTaken: config.maxAnswerSeconds,
    autoplay: !config.disableAutoplay,
    timer: config.showTimer ? 1 : 0,
    replayq: !config.skipQuestionWhenReplayingAnswer,
    new: {
      bury: config.buryNew,
      delays: config.learnSteps,
      initialFactor: Math.round(config.startingEase * 1000),
      ints: [config.graduatingInterval, config.easyInterval, 0],
      order: config.insertionOrder === 'random' ? 0 : 1,
      perDay: config.newPerDay,
    },
    lapse: {
      delays: config.relearnSteps,
      leechAction: config.leechAction === 'suspend' ? 0 : 1,
      leechFails: config.leechThreshold,
      minInt: config.minimumInterval,
      mult: config.newInterval,
    },
    rev: {
      bury: config.buryReviews,
      ease4: config.easyBonus,
      ivlFct: config.intervalModifier,
      maxIvl: config.maximumInterval,
      perDay: config.reviewsPerDay,
      hardFactor: config.hardInterval,
    },
    newMix: MIX[config.newReviewMix],
    interdayLearningMix: MIX[config.interdayLearningMix],
    reviewOrder: REVIEW_ORDER[config.reviewOrder],
    newSortOrder: SORT[config.newSortOrder],
    newGatherPriority: GATHER[config.newGatherPriority],
    buryInterdayLearning: config.buryInterdayLearning,
    desiredRetention: config.desiredRetention,
    ...(config.fsrsParams.length ? { fsrsParams6: config.fsrsParams } : {}),
    easyDaysPercentages: config.easyDays,
    stopTimerOnAnswer: config.stopTimerOnAnswer,
    secondsToShowQuestion: config.secondsToShowQuestion,
    secondsToShowAnswer: config.secondsToShowAnswer,
    questionAction: QUESTION_ACTION[config.questionAction],
    answerAction: ANSWER_ACTION[config.answerAction],
    waitForAudio: config.waitForAudio,
  };
}

type Legacy = {
  name?: string;
  maxTaken?: number; autoplay?: boolean; timer?: number; replayq?: boolean;
  new?: { bury?: boolean; delays?: number[]; initialFactor?: number; ints?: number[]; order?: number; perDay?: number };
  lapse?: { delays?: number[]; leechAction?: number; leechFails?: number; minInt?: number; mult?: number };
  rev?: { bury?: boolean; ease4?: number; ivlFct?: number; maxIvl?: number; perDay?: number; hardFactor?: number };
  newMix?: number; interdayLearningMix?: number; reviewOrder?: number; newSortOrder?: number; newGatherPriority?: number;
  buryInterdayLearning?: boolean; desiredRetention?: number; fsrsParams6?: number[]; fsrsParams5?: number[]; fsrsWeights?: number[];
  easyDaysPercentages?: number[]; stopTimerOnAnswer?: boolean; secondsToShowQuestion?: number; secondsToShowAnswer?: number;
  questionAction?: number; answerAction?: number; waitForAudio?: boolean;
};

/** Converte um preset do Anki (getDeckConfig) em opções do Tunely. Campos inválidos são ignorados. */
export function fromLegacyDeckConfig(raw: unknown): Partial<PresetConfig> {
  const c = (raw ?? {}) as Legacy;
  const out: Record<string, unknown> = {};
  const num = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : undefined);
  const set = (key: keyof PresetConfig, value: unknown) => {
    if (value === undefined) return;
    const parsed = presetConfigSchema.shape[key].safeParse(value);
    if (parsed.success) out[key] = parsed.data;
  };
  set('newPerDay', num(c.new?.perDay));
  set('learnSteps', Array.isArray(c.new?.delays) ? c.new.delays.filter((n) => n > 0) : undefined);
  set('graduatingInterval', num(c.new?.ints?.[0]));
  set('easyInterval', num(c.new?.ints?.[1]));
  set('startingEase', num(c.new?.initialFactor) !== undefined ? (c.new?.initialFactor as number) / 1000 : undefined);
  set('insertionOrder', c.new?.order === 0 ? 'random' : c.new?.order === 1 ? 'due' : undefined);
  set('buryNew', c.new?.bury);
  set('relearnSteps', Array.isArray(c.lapse?.delays) ? c.lapse.delays.filter((n) => n > 0) : undefined);
  set('newInterval', num(c.lapse?.mult));
  set('minimumInterval', num(c.lapse?.minInt));
  set('leechThreshold', num(c.lapse?.leechFails));
  set('leechAction', c.lapse?.leechAction === 0 ? 'suspend' : c.lapse?.leechAction === 1 ? 'tag' : undefined);
  set('reviewsPerDay', num(c.rev?.perDay));
  set('easyBonus', num(c.rev?.ease4));
  set('intervalModifier', num(c.rev?.ivlFct));
  set('maximumInterval', num(c.rev?.maxIvl));
  set('hardInterval', num(c.rev?.hardFactor));
  set('buryReviews', c.rev?.bury);
  set('maxAnswerSeconds', num(c.maxTaken));
  set('disableAutoplay', typeof c.autoplay === 'boolean' ? !c.autoplay : undefined);
  set('skipQuestionWhenReplayingAnswer', typeof c.replayq === 'boolean' ? !c.replayq : undefined);
  set('showTimer', typeof c.timer === 'number' ? c.timer === 1 : undefined);
  set('newReviewMix', invert(MIX).get(c.newMix as number));
  set('interdayLearningMix', invert(MIX).get(c.interdayLearningMix as number));
  set('reviewOrder', invert(REVIEW_ORDER).get(c.reviewOrder as number));
  set('newSortOrder', invert(SORT).get(c.newSortOrder as number));
  set('newGatherPriority', invert(GATHER).get(c.newGatherPriority as number));
  set('buryInterdayLearning', c.buryInterdayLearning);
  set('desiredRetention', num(c.desiredRetention) || undefined);
  const params = [c.fsrsParams6, c.fsrsParams5, c.fsrsWeights].find((p) => Array.isArray(p) && p.length > 0);
  set('fsrsParams', params);
  set('easyDays', Array.isArray(c.easyDaysPercentages) && c.easyDaysPercentages.length === 7 ? c.easyDaysPercentages : undefined);
  set('stopTimerOnAnswer', c.stopTimerOnAnswer);
  set('secondsToShowQuestion', num(c.secondsToShowQuestion));
  set('secondsToShowAnswer', num(c.secondsToShowAnswer));
  set('questionAction', invert(QUESTION_ACTION).get(c.questionAction as number));
  set('answerAction', invert(ANSWER_ACTION).get(c.answerAction as number));
  set('waitForAudio', c.waitForAudio);
  return out as Partial<PresetConfig>;
}
