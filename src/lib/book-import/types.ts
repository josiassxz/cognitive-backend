// Spec 01 — canonical normalized book format. Both EPUB and PDF parsers must
// produce this exact shape; the legacy ExtractedBookContent is derived from it.

export const PARSER_VERSION = 2 as const;

export type UploadedBookType = 'epub' | 'pdf';

export type NormalizedParagraphKind =
  | 'paragraph'
  | 'heading'
  | 'scene-break'
  | 'dialogue';

export type NormalizedParagraph = {
  index: number;
  text: string;
  sentences?: string[];
  kind?: NormalizedParagraphKind;
};

export type NormalizedChapter = {
  index: number;
  title: string;
  /** original href inside the source container (epub spine href, etc). */
  href?: string;
  /** raw HTML for the chapter, when available (epub only). */
  html?: string;
  paragraphs: NormalizedParagraph[];
  wordCount: number;
};

export type NormalizedBookMeta = {
  sourceFileType: UploadedBookType;
  originalFilename: string;
  importedAt: string;
  parserVersion: number;
  /** PDF only — set when extracted text is too sparse for the page count. */
  needsOcr?: boolean;
};

export type NormalizedBook = {
  type: UploadedBookType;
  title: string;
  author?: string;
  language?: string;
  description?: string;
  subjects?: string[];
  chapters: NormalizedChapter[];
  meta: NormalizedBookMeta;
};
