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
export type TalkDialogueOption = TalkDialogueLine & { next: string | null; react?: TalkDialogueLine };
export type TalkDialogueNode = TalkDialogueLine & {
  speaker: string;
  next?: string;
  options?: TalkDialogueOption[];
  end?: boolean;
};
export type TalkDialogueDef = {
  slug: string;
  title: string;
  level: string;
  description: string;
  intro: string;
  cast: Record<string, { name: string; role: string }>;
  start: string;
  /** Mínimo e máximo de perguntas num caminho do início ao fim. */
  decisions: [number, number];
  nodes: Record<string, TalkDialogueNode>;
};
