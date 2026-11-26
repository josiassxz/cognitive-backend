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
