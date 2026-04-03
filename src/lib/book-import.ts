import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { decode } from 'he';
import JSZip from 'jszip';
import { PDFParse } from 'pdf-parse';

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

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
});

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeText(text: string): string {
  return text
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeInlineText(text: string): string {
  return text
    .replace(/[ \t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function looksLikeHeading(line: string): boolean {
  const normalized = normalizeInlineText(line);
  if (!normalized || normalized.length > 100) return false;
  if (/^(chapter|cap[ií]tulo)\s+([a-z0-9ivxlcdm-]+)$/i.test(normalized)) return true;
  if (/^-+\s*the end\s*-+$/i.test(normalized)) return true;
  if (/[.!?]$/.test(normalized)) return false;
  const letters = normalized.match(/[A-Za-z]/g) ?? [];
  const upperLetters = normalized.match(/[A-Z]/g) ?? [];
  const upperRatio = letters.length > 0 ? upperLetters.length / letters.length : 0;
  if (letters.length >= 4 && upperRatio >= 0.72) return true;
  const words = normalized.split(/\s+/);
  if (words.length > 8) return false;
  const titleCaseWords = words.filter((word) => /^[A-Z][a-zA-Z'’\-]*$/.test(word)).length;
  return titleCaseWords >= Math.max(1, words.length - 1);
}

function normalizeParagraphBlock(block: string): string {
  const lines = block
    .split('\n')
    .map((line) => normalizeInlineText(line))
    .filter(Boolean);
  if (lines.length === 0) return '';
  if (lines.length === 1) return lines[0];
  return normalizeInlineText(lines.join(' '));
}

function splitAndFormatBookText(rawText: string): { text: string; chapters: string[] } {
  const baseText = normalizeText(rawText);
  if (!baseText) return { text: '', chapters: [] };
  const rawBlocks = baseText
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const blocks = rawBlocks
    .map((block) => {
      const normalizedParagraph = normalizeParagraphBlock(block);
      if (!normalizedParagraph) {
        return null;
      }
      const lines = block
        .split('\n')
        .map((line) => normalizeInlineText(line))
        .filter(Boolean);
      const heading = lines.length === 1 && looksLikeHeading(lines[0]);
      if (heading) {
        return { kind: 'heading' as const, text: lines[0] };
      }
      return { kind: 'paragraph' as const, text: normalizedParagraph };
    })
    .filter((block): block is { kind: 'heading' | 'paragraph'; text: string } => Boolean(block));
  const chapterTitles: string[] = [];
  for (const block of blocks) {
    if (block.kind === 'heading' && /^(chapter|cap[ií]tulo)\s+([a-z0-9ivxlcdm-]+)$/i.test(block.text)) {
      chapterTitles.push(block.text);
    }
  }
  const formattedText = blocks
    .map((block) => block.text)
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return {
    text: formattedText,
    chapters: chapterTitles,
  };
}

function htmlToText(rawHtml: string): string {
  const withoutScript = rawHtml
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<head[\s\S]*?<\/head>/gi, ' ');
  const withBlockBreaks = withoutScript.replace(/<\/?(p|div|section|article|h1|h2|h3|h4|h5|h6|li|ul|ol|br|hr|tr|td|blockquote)[^>]*>/gi, '\n');
  const textOnly = withBlockBreaks.replace(/<[^>]+>/g, ' ');
  return normalizeText(
    decode(textOnly)
      .replace(/\u00a0/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n[ \t]+/g, '\n'),
  );
}

function getNodeText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (value && typeof value === 'object' && '#text' in (value as Record<string, unknown>)) {
    const text = (value as Record<string, unknown>)['#text'];
    return typeof text === 'string' ? text.trim() : '';
  }
  return '';
}

function inferBookType(originalName: string, mimeType: string): UploadedBookType | null {
  const lowerName = originalName.toLowerCase();
  const lowerMime = mimeType.toLowerCase();
  if (lowerName.endsWith('.epub') || lowerMime.includes('epub')) return 'epub';
  if (lowerName.endsWith('.pdf') || lowerMime.includes('pdf')) return 'pdf';
  return null;
}

function normalizeEpubPath(basePath: string, relativePath: string): string {
  const cleanRelative = relativePath.split('#')[0].split('?')[0].trim();
  if (!cleanRelative) return '';
  if (/^[a-z]+:\/\//i.test(cleanRelative)) return cleanRelative;
  const normalizedBase = basePath === '.' ? '' : basePath;
  return path.posix.normalize(path.posix.join(normalizedBase, cleanRelative));
}

function getMimeByPath(filePath: string): string {
  const extension = path.posix.extname(filePath).toLowerCase();
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg';
  if (extension === '.png') return 'image/png';
  if (extension === '.gif') return 'image/gif';
  if (extension === '.webp') return 'image/webp';
  if (extension === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

async function loadImageDataUrl(zip: JSZip, resourcePath: string): Promise<string | null> {
  const file = zip.file(resourcePath);
  if (!file) return null;
  const bytes = await file.async('uint8array');
  const mimeType = getMimeByPath(resourcePath);
  const base64 = Buffer.from(bytes).toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

async function inlineCssAndImages(params: { zip: JSZip; html: string; documentPath: string }): Promise<string> {
  let html = params.html;
  const documentDir = path.posix.dirname(params.documentPath);
  const stylesheetRegex = /<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  const stylesheets: Array<{ original: string; href: string }> = [];
  let styleMatch = stylesheetRegex.exec(html);
  while (styleMatch) {
    stylesheets.push({ original: styleMatch[0], href: styleMatch[1] });
    styleMatch = stylesheetRegex.exec(html);
  }
  for (const stylesheet of stylesheets) {
    const stylePath = normalizeEpubPath(documentDir, stylesheet.href);
    if (!stylePath || /^[a-z]+:\/\//i.test(stylePath)) continue;
    const file = params.zip.file(stylePath);
    if (!file) continue;
    const css = await file.async('string');
    html = html.replace(stylesheet.original, `<style>${css}</style>`);
  }
  const imageAttrRegex = /(src|poster)=["']([^"']+)["']/gi;
  const imageEntries: Array<{ attr: string; source: string }> = [];
  let imageMatch = imageAttrRegex.exec(html);
  while (imageMatch) {
    imageEntries.push({ attr: imageMatch[1], source: imageMatch[2] });
    imageMatch = imageAttrRegex.exec(html);
  }
  for (const image of imageEntries) {
    const normalizedSource = image.source.trim();
    if (!normalizedSource || normalizedSource.startsWith('data:') || /^[a-z]+:\/\//i.test(normalizedSource)) continue;
    const assetPath = normalizeEpubPath(documentDir, normalizedSource);
    if (!assetPath) continue;
    const dataUrl = await loadImageDataUrl(params.zip, assetPath);
    if (!dataUrl) continue;
    const escapedSource = image.source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const replaceRegex = new RegExp(`${image.attr}=["']${escapedSource}["']`, 'g');
    html = html.replace(replaceRegex, `${image.attr}="${dataUrl}"`);
  }
  return html;
}

function buildReaderDocumentHtml(html: string): string {
  const hasHtmlTag = /<html[\s>]/i.test(html);
  if (hasHtmlTag) {
    return html;
  }
  return `<html><head><meta charset="utf-8" /></head><body>${html}</body></html>`;
}

function inferTitleFromText(text: string, fallbackIndex: number): string {
  const firstTextLine = text.split('\n').map((line) => line.trim()).find(Boolean) ?? '';
  const titleFromText = firstTextLine.length <= 90 ? firstTextLine : '';
  return titleFromText || `Chapter ${fallbackIndex}`;
}

async function extractFromPdf(buffer: Buffer): Promise<ExtractedBookContent> {
  const parser = new PDFParse({ data: buffer });
  try {
    const [textResult, infoResult] = await Promise.all([parser.getText(), parser.getInfo()]);
    const titleFromInfo = typeof infoResult.info?.Title === 'string' ? infoResult.info.Title.trim() : '';
    const authorFromInfo = typeof infoResult.info?.Author === 'string' ? infoResult.info.Author.trim() : '';
    const formatted = splitAndFormatBookText(textResult.text ?? '');
    return {
      type: 'pdf',
      text: formatted.text,
      title: titleFromInfo,
      author: authorFromInfo,
      chapters: formatted.chapters,
    };
  } finally {
    await parser.destroy();
  }
}

function getRootFilePath(containerXml: string): string {
  const parsed = xmlParser.parse(containerXml) as Record<string, unknown>;
  const container = parsed.container as Record<string, unknown> | undefined;
  const rootfiles = container?.rootfiles as Record<string, unknown> | undefined;
  const rootfile = rootfiles?.rootfile;
  const rootfileNode = asArray(rootfile)[0] as Record<string, unknown> | undefined;
  const fullPath = rootfileNode?.['full-path'];
  if (typeof fullPath !== 'string' || !fullPath.trim()) {
    throw new Error('Arquivo EPUB inválido: container sem rootfile');
  }
  return fullPath.trim();
}

async function extractFromEpub(buffer: Buffer): Promise<ExtractedBookContent> {
  const zip = await JSZip.loadAsync(buffer);
  const containerFile = zip.file('META-INF/container.xml');
  if (!containerFile) {
    throw new Error('Arquivo EPUB inválido: META-INF/container.xml ausente');
  }
  const containerXml = await containerFile.async('string');
  const opfPath = getRootFilePath(containerXml);
  const opfFile = zip.file(opfPath);
  if (!opfFile) {
    throw new Error('Arquivo EPUB inválido: OPF ausente');
  }
  const opfXml = await opfFile.async('string');
  const parsed = xmlParser.parse(opfXml) as Record<string, unknown>;
  const pkg = (parsed.package ?? parsed['opf:package']) as Record<string, unknown> | undefined;
  if (!pkg) {
    throw new Error('Arquivo EPUB inválido: package OPF ausente');
  }
  const metadata = (pkg.metadata ?? pkg['opf:metadata']) as Record<string, unknown> | undefined;
  const manifestNode = (pkg.manifest ?? pkg['opf:manifest']) as Record<string, unknown> | undefined;
  const spineNode = (pkg.spine ?? pkg['opf:spine']) as Record<string, unknown> | undefined;
  const manifestItems = asArray(manifestNode?.item as Record<string, unknown> | Record<string, unknown>[] | undefined);
  const manifestById = new Map<string, { href: string; mediaType: string }>();
  for (const item of manifestItems) {
    const id = typeof item.id === 'string' ? item.id.trim() : '';
    const href = typeof item.href === 'string' ? item.href.trim() : '';
    const mediaType = typeof item['media-type'] === 'string' ? item['media-type'].trim() : '';
    if (id && href) {
      manifestById.set(id, { href, mediaType });
    }
  }
  const spineItems = asArray(spineNode?.itemref as Record<string, unknown> | Record<string, unknown>[] | undefined);
  const opfDir = path.posix.dirname(opfPath);
  const chapters: string[] = [];
  const documents: ExtractedEpubDocument[] = [];
  for (const itemRef of spineItems) {
    const idRef = typeof itemRef.idref === 'string' ? itemRef.idref.trim() : '';
    if (!idRef) continue;
    const manifestEntry = manifestById.get(idRef);
    if (!manifestEntry) continue;
    if (manifestEntry.mediaType && !manifestEntry.mediaType.includes('html') && !manifestEntry.mediaType.includes('xhtml')) {
      continue;
    }
    const resolvedPath = opfDir === '.' ? manifestEntry.href : path.posix.join(opfDir, manifestEntry.href);
    const contentFile = zip.file(resolvedPath);
    if (!contentFile) continue;
    const html = await contentFile.async('string');
    const inlinedHtml = await inlineCssAndImages({ zip, html, documentPath: resolvedPath });
    const chapterText = htmlToText(html);
    if (!chapterText) continue;
    chapters.push(chapterText);
    documents.push({
      id: idRef,
      href: resolvedPath,
      title: inferTitleFromText(chapterText, documents.length + 1),
      html: buildReaderDocumentHtml(inlinedHtml),
      text: chapterText,
    });
  }
  if (documents.length === 0) {
    const contentFiles = Object.keys(zip.files)
      .filter((filePath) => /\.(xhtml|html|htm)$/i.test(filePath))
      .filter((filePath) => !/\/(nav|toc)\.(xhtml|html|htm)$/i.test(filePath))
      .sort((left, right) => left.localeCompare(right, undefined, { sensitivity: 'base' }));
    for (const filePath of contentFiles) {
      const file = zip.file(filePath);
      if (!file) continue;
      const html = await file.async('string');
      const chapterText = htmlToText(html);
      if (!chapterText) continue;
      const inlinedHtml = await inlineCssAndImages({ zip, html, documentPath: filePath });
      chapters.push(chapterText);
      documents.push({
        id: `fallback-${documents.length + 1}`,
        href: filePath,
        title: inferTitleFromText(chapterText, documents.length + 1),
        html: buildReaderDocumentHtml(inlinedHtml),
        text: chapterText,
      });
    }
  }
  const expandedDocuments = documents;
  if (expandedDocuments.length !== documents.length) {
    chapters.length = 0;
    for (const document of expandedDocuments) {
      chapters.push(document.text);
    }
  }
  const titleNode = metadata ? metadata['dc:title'] ?? metadata.title : '';
  const authorNode = metadata ? metadata['dc:creator'] ?? metadata.creator : '';
  const title = getNodeText(asArray(titleNode)[0]);
  const author = getNodeText(asArray(authorNode)[0]);
  const formatted = splitAndFormatBookText(chapters.join('\n\n'));
  return {
    type: 'epub',
    text: formatted.text,
    title,
    author,
    chapters: formatted.chapters,
    readerPayload: {
      format: 'epub',
      version: 1,
      documents: expandedDocuments,
    },
  };
}

export async function extractBookContentFromUpload(params: {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}): Promise<ExtractedBookContent> {
  const type = inferBookType(params.originalName, params.mimeType);
  if (!type) {
    throw new Error('Formato de arquivo não suportado. Envie .epub ou .pdf');
  }
  if (type === 'pdf') {
    return extractFromPdf(params.buffer);
  }
  return extractFromEpub(params.buffer);
}
