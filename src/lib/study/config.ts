// Opções de estudo no modelo do Anki:
// - Opções GLOBAIS da coleção (ícone 🌐 no Anki): FSRS, "novos ignoram o limite de revisão",
//   "os limites começam do deck superior", horário de virada do dia, antecipação.
// - PRESETS de opções (nome + config), compartilhados entre baralhos ("Default (usado por N baralhos)").
// Cada livro é um baralho filho de "Tunely" e usa um preset.
// Padrões = padrões do Anki 25 (ankitects/anki rslib/src/deckconfig).
import { z } from 'zod';

const minutes = z.number().positive().max(60 * 24 * 365);

export const globalConfigSchema = z.object({
  fsrs: z.boolean().default(false),
  newIgnoresReviewLimit: z.boolean().default(false),
  applyAllParentLimits: z.boolean().default(false),
  nextDayStartsAt: z.number().int().min(0).max(23).default(4),
  learnAheadMinutes: z.number().int().min(0).max(240).default(20),
  // Minutos a leste de UTC (Brasil = -180); atualizado pelo cliente.
  tzOffsetMinutes: z.number().int().min(-14 * 60).max(14 * 60).default(-180),
});

export const presetConfigSchema = z.object({
  // Limites Diários
  newPerDay: z.number().int().min(0).max(99999).default(20),
  reviewsPerDay: z.number().int().min(0).max(99999).default(200),
  // Novos Cartões
  learnSteps: z.array(minutes).max(20).default([1, 10]),
  graduatingInterval: z.number().int().min(1).max(36500).default(1),
  easyInterval: z.number().int().min(1).max(36500).default(4),
  insertionOrder: z.enum(['due', 'random']).default('due'),
  // Falhas
  relearnSteps: z.array(minutes).max(20).default([10]),
  minimumInterval: z.number().int().min(1).max(36500).default(1),
  leechThreshold: z.number().int().min(0).max(999).default(8),
  leechAction: z.enum(['tag', 'suspend']).default('tag'),
  // Ordem de Exibição
  newGatherPriority: z.enum(['deck', 'deckThenRandom', 'ascendingPosition', 'descendingPosition', 'randomNotes', 'randomCards']).default('deck'),
  newSortOrder: z.enum(['template', 'gathered', 'templateThenRandom', 'randomNoteThenTemplate', 'random']).default('template'),
  newReviewMix: z.enum(['mix', 'reviewsFirst', 'newFirst']).default('mix'),
  interdayLearningMix: z.enum(['mix', 'reviewsFirst', 'newFirst']).default('mix'),
  reviewOrder: z
    .enum([
      'dueRandom', 'dueDeck', 'deckDue', 'ascendingIntervals', 'descendingIntervals', 'ascendingEase', 'descendingEase',
      'ascendingRetrievability', 'descendingRetrievability', 'relativeOverdueness', 'random', 'added', 'reverseAdded',
    ])
    .default('dueRandom'),
  // FSRS (por preset)
  desiredRetention: z.number().min(0.7).max(0.99).default(0.9),
  fsrsParams: z.array(z.number()).max(21).default([]),
  // Ocultar
  buryNew: z.boolean().default(false),
  buryReviews: z.boolean().default(false),
  buryInterdayLearning: z.boolean().default(false),
  // Áudio
  disableAutoplay: z.boolean().default(false),
  skipQuestionWhenReplayingAnswer: z.boolean().default(false),
  // Cronômetro
  maxAnswerSeconds: z.number().int().min(1).max(7200).default(60),
  showTimer: z.boolean().default(false),
  stopTimerOnAnswer: z.boolean().default(false),
  // Avanço Automático
  secondsToShowQuestion: z.number().min(0).max(600).default(0),
  secondsToShowAnswer: z.number().min(0).max(600).default(0),
  waitForAudio: z.boolean().default(true),
  questionAction: z.enum(['showAnswer', 'showReminder']).default('showAnswer'),
  answerAction: z.enum(['buryCard', 'answerAgain', 'answerGood', 'answerHard', 'showReminder']).default('buryCard'),
  // Dias de Descanso (segunda..domingo): 0 mínimo, 0.5 reduzido, 1 normal
  easyDays: z.array(z.number().min(0).max(1)).length(7).default([1, 1, 1, 1, 1, 1, 1]),
  // Avançado
  maximumInterval: z.number().int().min(1).max(36500).default(36500),
  startingEase: z.number().min(1.31).max(5).default(2.5),
  easyBonus: z.number().min(1).max(5).default(1.3),
  intervalModifier: z.number().min(0.5).max(2).default(1),
  hardInterval: z.number().min(0.5).max(1.3).default(1.2),
  newInterval: z.number().min(0).max(1).default(0),
  customScheduling: z.string().max(20000).default(''),
  // Tunely (cartão gerado a partir das frases)
  cardType: z.enum(['en-pt', 'audio-first', 'pt-en']).default('en-pt'),
  // Desligado por regra: só frases marcadas como concluídas viram cartões.
  autoAddFromBook: z.boolean().default(false),
});

export type GlobalConfig = z.infer<typeof globalConfigSchema>;
export type PresetConfig = z.infer<typeof presetConfigSchema>;
/** Configuração efetiva de um baralho: preset + globais. */
export type StudyConfig = PresetConfig & GlobalConfig;

export const DEFAULT_GLOBAL_CONFIG: GlobalConfig = globalConfigSchema.parse({});
export const DEFAULT_PRESET_CONFIG: PresetConfig = presetConfigSchema.parse({});
export const DEFAULT_STUDY_CONFIG: StudyConfig = { ...DEFAULT_PRESET_CONFIG, ...DEFAULT_GLOBAL_CONFIG };

function resolveWith<S extends z.ZodObject<z.ZodRawShape>>(schema: S, raw: unknown): z.infer<S> {
  const base: Record<string, unknown> = { ...schema.parse({}) };
  if (raw && typeof raw === 'object') {
    const shape = schema.shape as Record<string, z.ZodTypeAny>;
    for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
      const field = shape[key];
      if (!field) continue;
      const parsed = field.safeParse(value);
      if (parsed.success) base[key] = parsed.data;
    }
  }
  return schema.parse(base);
}

/** Mescla o JSON guardado com os padrões, descartando valores inválidos campo a campo. */
export const resolveGlobalConfig = (raw: unknown): GlobalConfig => resolveWith(globalConfigSchema, raw);
export const resolvePresetConfig = (raw: unknown): PresetConfig => resolveWith(presetConfigSchema, raw);
export const resolveStudyConfig = (raw: unknown): StudyConfig => ({ ...resolvePresetConfig(raw), ...resolveGlobalConfig(raw) });

/** Número do dia de estudo: muda no horário "próximo dia começa às", no fuso do usuário. */
export function dayNumber(at: Date, config: Pick<GlobalConfig, 'tzOffsetMinutes' | 'nextDayStartsAt'>): number {
  return Math.floor((at.getTime() + config.tzOffsetMinutes * 60_000 - config.nextDayStartsAt * 3_600_000) / 86_400_000);
}

/** Instante em que começa o dia de estudo `day`. */
export function dayStart(day: number, config: Pick<GlobalConfig, 'tzOffsetMinutes' | 'nextDayStartsAt'>): Date {
  return new Date(day * 86_400_000 - config.tzOffsetMinutes * 60_000 + config.nextDayStartsAt * 3_600_000);
}

/** Índice segunda=0..domingo=6 do dia de estudo (01/01/1970 foi quinta). */
export function weekdayIndex(day: number): number {
  return (((day + 3) % 7) + 7) % 7;
}
