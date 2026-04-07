// Public types for the v1 (legacy) extractor surface. Kept stable so existing
// code (reading-lab.ts) does not need to change shape.

export type UploadedBookType = 'epub' | 'pdf';

export type ExtractedEpubDocument = {
  id: string;
  href: string;
  title: string;
  html: string;
  text: string;
  chapterIndex?: number;
  sentenceStartIndex?: number;
  sentenceEndIndex?: number;
  audioStartMs?: number;
  audioEndMs?: number;
};

export type ExtractedEpubReaderPayload = {
  format: 'epub';
  version: 1;
  documents: ExtractedEpubDocument[];
};

export type ExtractedBookContent = {
  type: UploadedBookType;
  text: string;
  title: string;
  author: string;
  chapters: string[];
  readerPayload?: ExtractedEpubReaderPayload;
};
