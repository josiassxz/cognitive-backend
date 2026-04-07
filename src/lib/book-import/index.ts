// Public entrypoint for the book import pipeline.
//
// Branches between v1 (legacy) and v2 (NormalizedBook) based on the
// BOOK_IMPORT_PARSER environment variable. Default is v2. Both branches return
// the same legacy `ExtractedBookContent` shape so consumers (reading-lab.ts) do
// not need to change.
import { extractEpub } from './epub/parser';
import { extractPdf } from './pdf/parser';
import { extractBookContentFromUploadV1, inferBookType } from './legacy';
import { deriveExtractedBookContent } from './shared/derive-reader-payload';
import { PARSER_VERSION, type NormalizedBook } from './types';
import type {
  ExtractedBookContent,
  ExtractedEpubDocument,
  ExtractedEpubReaderPayload,
  UploadedBookType,
} from './legacy-types';

export type {
  ExtractedBookContent,
  ExtractedEpubDocument,
  ExtractedEpubReaderPayload,
  UploadedBookType,
};
export type { NormalizedBook, NormalizedChapter, NormalizedParagraph } from './types';
export { PARSER_VERSION };

function selectedParser(): 'v1' | 'v2' {
  const raw = (process.env.BOOK_IMPORT_PARSER ?? '').trim().toLowerCase();
  if (raw === 'v1') return 'v1';
  return 'v2';
}

export async function extractNormalizedBookFromUpload(params: {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}): Promise<NormalizedBook> {
  const type = inferBookType(params.originalName, params.mimeType);
  if (!type) throw new Error('Formato de arquivo não suportado. Envie .epub ou .pdf');
  if (type === 'pdf') {
    return extractPdf(params.buffer, { originalFilename: params.originalName });
  }
  return extractEpub(params.buffer, { originalFilename: params.originalName });
}

export async function extractBookContentFromUpload(params: {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}): Promise<ExtractedBookContent> {
  if (selectedParser() === 'v1') {
    return extractBookContentFromUploadV1(params);
  }
  const normalized = await extractNormalizedBookFromUpload(params);
  return deriveExtractedBookContent(normalized);
}
