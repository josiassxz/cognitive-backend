// PDF v2 parser. We keep using `pdf-parse` because its TextResult.pages array
// already gives us per-page text — pdfjs-dist would only matter if we needed
// font/x-y info for richer chapter detection, which the spec marks optional.
// Documented in book-import.reference.md.
import { PDFParse } from 'pdf-parse';
import { countWords } from '../shared/clean';
import {
  PARSER_VERSION,
  type NormalizedBook,
  type NormalizedChapter,
  type NormalizedParagraph,
} from '../types';
import { stripRepeatingChrome } from './layout';
import { reflowParagraphs, splitParagraphs } from './reflow';
import { detectChapters } from './chapter-detection';

export type ExtractPdfOptions = {
  originalFilename: string;
};

function classify(text: string): NormalizedParagraph['kind'] {
  if (/^\s*([*•·]\s*){2,}\s*$/.test(text)) return 'scene-break';
  if (text.startsWith('"') || text.startsWith('\u2014')) return 'dialogue';
  return 'paragraph';
}

export async function extractPdf(buffer: Buffer, options: ExtractPdfOptions): Promise<NormalizedBook> {
  const parser = new PDFParse({ data: buffer });
  try {
    const textResult = await parser.getText();
    let title = '';
    let author = '';
    try {
      const info = await parser.getInfo();
      title = typeof info.info?.Title === 'string' ? info.info.Title.trim() : '';
      author = typeof info.info?.Author === 'string' ? info.info.Author.trim() : '';
    } catch {
      /* no-op */
    }

    const rawPages = (textResult.pages ?? []).map((page) => page.text ?? '');
    const cleanedPages = stripRepeatingChrome(rawPages);
    const joined = cleanedPages.join('\n\n');
    const reflowed = reflowParagraphs(joined);
    const paragraphs = splitParagraphs(reflowed);

    const detected = detectChapters(paragraphs);
    const chapters: NormalizedChapter[] = detected.map((ch, index) => {
      const normalizedParas: NormalizedParagraph[] = ch.paragraphs.map((text, idx) => ({
        index: idx,
        text,
        kind: classify(text),
      }));
      return {
        index,
        title: ch.title,
        paragraphs: normalizedParas,
        wordCount: normalizedParas.reduce((sum, p) => sum + countWords(p.text), 0),
      };
    });

    const totalChars = chapters.reduce((sum, c) => sum + c.paragraphs.reduce((s, p) => s + p.text.length, 0), 0);
    const pageCount = rawPages.length || 1;
    const needsOcr = totalChars / pageCount < 80;

    return {
      type: 'pdf',
      title: title || options.originalFilename.replace(/\.[^/.]+$/, ''),
      author: author || undefined,
      chapters,
      meta: {
        sourceFileType: 'pdf',
        originalFilename: options.originalFilename,
        importedAt: new Date().toISOString(),
        parserVersion: PARSER_VERSION,
        ...(needsOcr ? { needsOcr: true } : {}),
      },
    };
  } finally {
    await parser.destroy();
  }
}
