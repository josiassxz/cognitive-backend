// Bridge: convert a NormalizedBook into the legacy ExtractedBookContent shape
// (text + chapters + readerPayload) so existing routes keep working without
// schema changes.
import type { ExtractedBookContent, ExtractedEpubDocument, ExtractedEpubReaderPayload } from '../legacy-types';
import type { NormalizedBook } from '../types';

function paragraphToText(text: string): string {
  return text;
}

function chapterPlainText(chapter: NormalizedBook['chapters'][number]): string {
  const lines: string[] = [];
  for (const para of chapter.paragraphs) {
    if (para.kind === 'heading') {
      lines.push(para.text);
    } else if (para.kind === 'scene-break') {
      lines.push('* * *');
    } else {
      lines.push(paragraphToText(para.text));
    }
  }
  return lines.join('\n\n');
}

function chapterToHtml(chapter: NormalizedBook['chapters'][number]): string {
  if (chapter.html) return chapter.html;
  const body = chapter.paragraphs
    .map((p) => {
      if (p.kind === 'heading') return `<h2>${escapeHtml(p.text)}</h2>`;
      if (p.kind === 'scene-break') return `<hr/>`;
      return `<p>${escapeHtml(p.text)}</p>`;
    })
    .join('\n');
  return `<html><head><meta charset="utf-8"/><title>${escapeHtml(chapter.title)}</title></head><body>${body}</body></html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function deriveExtractedBookContent(book: NormalizedBook): ExtractedBookContent {
  const documents: ExtractedEpubDocument[] = book.chapters.map((chapter, index) => ({
    id: `ch-${index + 1}`,
    href: chapter.href ?? `chapter_${index + 1}.xhtml`,
    title: chapter.title,
    html: chapterToHtml(chapter),
    text: chapterPlainText(chapter),
  }));
  const readerPayload: ExtractedEpubReaderPayload | undefined =
    book.type === 'epub' && documents.length > 0
      ? { format: 'epub', version: 1, documents }
      : undefined;
  const fullText = book.chapters.map((chapter) => `${chapter.title}\n\n${chapterPlainText(chapter)}`).join('\n\n');
  return {
    type: book.type,
    text: fullText,
    title: book.title,
    author: book.author ?? '',
    chapters: book.chapters.map((c) => c.title),
    readerPayload,
  };
}
