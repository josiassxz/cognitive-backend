// Opções do baralho de estudo — espelham as "Opções do baralho" do Anki (padrões do Anki 25).
// Referência de comportamento: ankitects/anki, rslib/src/deckconfig e rslib/src/scheduler/states.
import { z } from 'zod';

const minutes = z.number().positive().max(60 * 24 * 365);

export const studyConfigSchema = z.object({
  // --- Limites diários
  newPerDay: z.number().int().min(0).max(9999).default(20),
  reviewsPerDay: z.number().int().min(0).max(99999).default(200),
  // --- Novos cartões
  learnSteps: z.array(minutes).max(20).default([1, 10]),
  graduatingInterval: z.number().int().min(1).max(36500).default(1),
  easyInterval: z.number().int().min(1).max(36500).default(4),
  // due = ordem do livro; random = embaralhado
  insertionOrder: z.enum(['due', 'random']).default('due'),
  // Puxar automaticamente as próximas frases do livro até o limite diário de novos.
  autoAddFromBook: z.boolean().default(true),
  // --- Lapsos
  relearnSteps: z.array(minutes).max(20).default([10]),
  minimumInterval: z.number().int().min(1).max(36500).default(1),
  leechThreshold: z.number().int().min(0).max(999).default(8),
  leechAction: z.enum(['tag', 'suspend']).default('tag'),
  // --- Ordem de exibição
  newReviewMix: z.enum(['mix', 'newFirst', 'reviewsFirst']).default('mix'),
  // --- Avançado (SM-2)
  maximumInterval: z.number().int().min(1).max(36500).default(36500),
  startingEase: z.number().min(1.31).max(5).default(2.5),
  easyBonus: z.number().min(1).max(5).default(1.3),
  intervalModifier: z.number().min(0.5).max(2).default(1),
  hardInterval: z.number().min(0.5).max(1.3).default(1.2),
  newInterval: z.number().min(0).max(1).default(0),
  // --- FSRS
  fsrs: z.boolean().default(false),
  desiredRetention: z.number().min(0.7).max(0.99).default(0.9),
  // --- Dia / tempo
  nextDayStartsAt: z.number().int().min(0).max(23).default(4),
  learnAheadMinutes: z.number().int().min(0).max(240).default(20),
  maxAnswerSeconds: z.number().int().min(30).max(600).default(60),
  showTimer: z.boolean().default(false),
  // --- Cartão e áudio
  cardType: z.enum(['en-pt', 'audio-first', 'pt-en']).default('en-pt'),
  autoplayAudio: z.boolean().default(true),
  replayQuestionAudio: z.boolean().default(true),
  // Minutos a leste de UTC (Brasil = -180); atualizado pelo cliente.
  tzOffsetMinutes: z.number().int().min(-14 * 60).max(14 * 60).default(-180),
});

export type StudyConfig = z.infer<typeof studyConfigSchema>;

export const DEFAULT_STUDY_CONFIG: StudyConfig = studyConfigSchema.parse({});

/** Mescla o JSON guardado com os padrões, descartando valores inválidos campo a campo. */
export function resolveStudyConfig(raw: unknown): StudyConfig {
  const base: Record<string, unknown> = { ...DEFAULT_STUDY_CONFIG };
  if (raw && typeof raw === 'object') {
    const shape = studyConfigSchema.shape as Record<string, z.ZodTypeAny>;
    for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
      const field = shape[key];
      if (!field) continue;
      const parsed = field.safeParse(value);
      if (parsed.success) base[key] = parsed.data;
    }
  }
  return studyConfigSchema.parse(base);
}

/** Número do dia de estudo: muda no horário "próximo dia começa às", no fuso do usuário. */
export function dayNumber(at: Date, config: Pick<StudyConfig, 'tzOffsetMinutes' | 'nextDayStartsAt'>): number {
  return Math.floor((at.getTime() + config.tzOffsetMinutes * 60_000 - config.nextDayStartsAt * 3_600_000) / 86_400_000);
}

/** Instante em que começa o dia de estudo `day`. */
export function dayStart(day: number, config: Pick<StudyConfig, 'tzOffsetMinutes' | 'nextDayStartsAt'>): Date {
  return new Date(day * 86_400_000 - config.tzOffsetMinutes * 60_000 + config.nextDayStartsAt * 3_600_000);
}
