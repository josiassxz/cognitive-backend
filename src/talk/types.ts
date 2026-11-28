// Módulo Talk: histórias com áudio dos livros e pontos de decisão (4 opções, ler em voz alta).
export type TalkRef = { c: number; k: string };
export type TalkStep =
  | ({ type: 'line' } & TalkRef)
  | { type: 'choice'; options: TalkRef[]; correct: number };
export type TalkStoryDef = {
  slug: string;
  title: string;
  level: string;
  description: string;
  /** contentId cuja capa ilustra a história. */
  cover: number;
  kind: 'book' | 'remix';
  steps: TalkStep[];
};

// Diálogos ramificados (cenas fechadas, vozes geradas com Kokoro). "audio" é uma chave de mídia.
export type TalkDialogueLine = { text: string; pt: string; audio: string };
export type TalkFlags = Record<string, string>;
export type TalkDialogueOption = TalkDialogueLine & {
  /** a mesma fala na voz feminina do aluno */
  audioF?: string;
  next: string | null;
  react?: TalkDialogueLine;
  /** memória: o que esta resposta registra (ex.: { drink: "tea" }) */
  set?: TalkFlags;
};
export type TalkSpeechNode = TalkDialogueLine & {
  speaker: string;
  next?: string;
  options?: TalkDialogueOption[];
  end?: boolean;
  /** pista revelada por esta fala (id em TalkTownSeason.clues) */
  clue?: string;
  set?: TalkFlags;
};
/** Desvio pela memória, sem fala: segue o primeiro `if` verdadeiro ("flag", "!flag", "flag=valor"; null = padrão). */
export type TalkBranchNode = { branch: { if: string | null; next: string }[] };
export type TalkDialogueNode = TalkSpeechNode | TalkBranchNode;
export type TalkDialogueDef = {
  slug: string;
  title: string;
  level: string;
  description: string;
  intro: string;
  cast: Record<string, { name: string; role: string; side?: string }>;
  start: string;
  /** Mínimo e máximo de perguntas num caminho do início ao fim. */
  decisions: [number, number];
  nodes: Record<string, TalkDialogueNode>;
  /** Falas de "impaciência" de cada personagem quando o aluno demora a responder. */
  nudges?: Record<string, TalkDialogueLine[]>;
  ambience?: string;
  place?: string;
  placeLabel?: string;
  time?: string;
  episode?: number;
};
/** Tunely Town: uma história (temporada) contínua, com memória entre episódios e pistas. */
export type TalkTownSeason = {
  /** pasta/identificador estável: "s01", "s02"… */
  id: string;
  season: number;
  title: string;
  subtitle: string;
  /** faixa de nível, ex.: "A2–B1" */
  level: string;
  genre: string;
  clues: Record<string, { title: string; note: string }>;
  /** "a história lembra": condição ("flag=valor" | "flag") → frase em pt-BR para o caderno */
  memories?: Record<string, string>;
  episodes: TalkDialogueDef[];
};
