// EPUB v2 parser. Reads the OPF, builds spine + TOC, walks each spine item,
// filters front-/back-matter, and produces a NormalizedBook. Uses JSZip and
// fast-xml-parser, both already deps.
import path from 'node:path';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import { countWords } from '../shared/clean';
import { isFrontMatterHref, isFrontMatterTitle, looksLikeChapterTitle } from '../shared/front-matter';
import {
  PARSER_VERSION,
  type NormalizedBook,
  type NormalizedChapter,
} from '../types';
import { parseNavXhtml, parseNcx } from './toc';
import { htmlChapterToParagraphs } from './html-to-paragraphs';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
});

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function getText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  if (value && typeof value === 'object') {
    const text = (value as Record<string, unknown>)['#text'];
    if (typeof text === 'string') return text.trim();
    if (typeof text === 'number') return String(text);
  }
  return '';
}

function getRootFilePath(containerXml: string): string {
  const parsed = xmlParser.parse(containerXml) as Record<string, unknown>;
  const container = parsed.container as Record<string, unknown> | undefined;
  const rootfiles = container?.rootfiles as Record<string, unknown> | undefined;
  const rootfile = asArray(rootfiles?.rootfile)[0] as Record<string, unknown> | undefined;
  const fullPath = rootfile?.['full-path'];
  if (typeof fullPath !== 'string' || !fullPath.trim()) {
    throw new Error('Arquivo EPUB inválido: container sem rootfile');
  }
  return fullPath.trim();
}

export type ExtractEpubOptions = {
  originalFilename: string;
};

export async function extractEpub(buffer: Buffer, options: ExtractEpubOptions): Promise<NormalizedBook> {
  const zip = await JSZip.loadAsync(buffer);
  const containerFile = zip.file('META-INF/container.xml');
  if (!containerFile) throw new Error('Arquivo EPUB inválido: META-INF/container.xml ausente');
  const opfPath = getRootFilePath(await containerFile.async('string'));
  const opfFile = zip.file(opfPath);
  if (!opfFile) throw new Error('Arquivo EPUB inválido: OPF ausente');
  const opfXml = await opfFile.async('string');
  const opfParsed = xmlParser.parse(opfXml) as Record<string, unknown>;
  const pkg = (opfParsed.package ?? opfParsed['opf:package']) as Record<string, unknown> | undefined;
  if (!pkg) throw new Error('Arquivo EPUB inválido: package OPF ausente');

  const metadata = (pkg.metadata ?? pkg['opf:metadata']) as Record<string, unknown> | undefined;
  const manifestNode = (pkg.manifest ?? pkg['opf:manifest']) as Record<string, unknown> | undefined;
  const spineNode = (pkg.spine ?? pkg['opf:spine']) as Record<string, unknown> | undefined;

  const opfDir = path.posix.dirname(opfPath);
  const resolveFromOpf = (href: string): string =>
    opfDir === '.' || opfDir === '' ? href : path.posix.normalize(path.posix.join(opfDir, href));

  type ManifestEntry = { id: string; href: string; mediaType: string; properties: string };
  const manifestById = new Map<string, ManifestEntry>();
  const manifestItems = asArray(manifestNode?.item as Record<string, unknown> | Record<string, unknown>[] | undefined);
  for (const item of manifestItems) {
    const id = typeof item.id === 'string' ? item.id : '';
    const href = typeof item.href === 'string' ? item.href : '';
    const mediaType = typeof item['media-type'] === 'string' ? item['media-type'] : '';
    const properties = typeof item.properties === 'string' ? item.properties : '';
    if (id && href) manifestById.set(id, { id, href, mediaType, properties });
  }

  // Build TOC map: href (relative to opfDir) -> chapter title.
  const tocMap = new Map<string, string>();
  // Prefer EPUB3 nav (manifest item with properties="nav").
  const navEntry = Array.from(manifestById.values()).find((entry) => entry.properties.split(/\s+/).includes('nav'));
  if (navEntry) {
    const navPath = resolveFromOpf(navEntry.href);
    const navFile = zip.file(navPath);
    if (navFile) {
      const navXml = await navFile.async('string');
      const entries = parseNavXhtml(navXml);
      const navDir = path.posix.dirname(navEntry.href);
      for (const entry of entries) {
        const normalized = navDir === '.' || navDir === '' ? entry.href : path.posix.normalize(path.posix.join(navDir, entry.href));
        if (!tocMap.has(normalized)) tocMap.set(normalized, entry.title);
      }
    }
  }
  // Fallback: NCX.
  if (tocMap.size === 0) {
    const ncxEntry = Array.from(manifestById.values()).find((entry) => entry.mediaType === 'application/x-dtbncx+xml');
    if (ncxEntry) {
      const ncxFile = zip.file(resolveFromOpf(ncxEntry.href));
      if (ncxFile) {
        const ncxXml = await ncxFile.async('string');
        const entries = parseNcx(ncxXml);
        const ncxDir = path.posix.dirname(ncxEntry.href);
        for (const entry of entries) {
          const normalized = ncxDir === '.' || ncxDir === '' ? entry.href : path.posix.normalize(path.posix.join(ncxDir, entry.href));
          if (!tocMap.has(normalized)) tocMap.set(normalized, entry.title);
        }
      }
    }
  }

  // Walk the spine.
  const spineItems = asArray(spineNode?.itemref as Record<string, unknown> | Record<string, unknown>[] | undefined);
  type SpineUsable = { id: string; manifestHref: string; resolvedPath: string; title: string };
  const usable: SpineUsable[] = [];
  for (const itemRef of spineItems) {
    const idRef = typeof itemRef.idref === 'string' ? itemRef.idref.trim() : '';
    if (!idRef) continue;
    const entry = manifestById.get(idRef);
    if (!entry) continue;
    if (entry.mediaType && !/x?html/i.test(entry.mediaType)) continue;
    if (isFrontMatterHref(entry.href)) continue;
    const resolvedPath = resolveFromOpf(entry.href);
    const title = tocMap.get(entry.href) ?? '';
    if (isFrontMatterTitle(title)) continue;
    usable.push({ id: idRef, manifestHref: entry.href, resolvedPath, title });
  }

  // Fallback: if spine yielded zero, scan all xhtml files (with warning).
  let spineSource: SpineUsable[] = usable;
  if (spineSource.length === 0) {
    console.warn('[book-import] EPUB spine yielded 0 chapters; falling back to all xhtml files');
    const fallback: SpineUsable[] = [];
    const filePaths = Object.keys(zip.files)
      .filter((p) => /\.(xhtml|html|htm)$/i.test(p) && !isFrontMatterHref(p))
      .sort((a, b) => a.localeCompare(b));
    for (const filePath of filePaths) {
      fallback.push({ id: `fallback-${fallback.length + 1}`, manifestHref: filePath, resolvedPath: filePath, title: '' });
    }
    spineSource = fallback;
  }

  const chapters: NormalizedChapter[] = [];
  for (const item of spineSource) {
    const file = zip.file(item.resolvedPath);
    if (!file) continue;
    const html = await file.async('string');
    const { paragraphs, firstHeading } = htmlChapterToParagraphs(html);
    if (paragraphs.length === 0) continue;
    const title = item.title || firstHeading || `Chapter ${chapters.length + 1}`;
    if (isFrontMatterTitle(title)) continue;
    // Drop chapters whose only content is the heading itself (often title pages).
    const bodyParagraphs = paragraphs.filter((p) => p.kind !== 'heading');
    if (bodyParagraphs.length === 0 && !looksLikeChapterTitle(title)) continue;
    const wordCount = paragraphs.reduce((sum, p) => sum + countWords(p.text), 0);
    chapters.push({
      index: chapters.length,
      title,
      href: item.resolvedPath,
      html,
      paragraphs,
      wordCount,
    });
  }

  // Metadata.
  const titleNode = metadata ? (metadata['dc:title'] ?? metadata.title) : '';
  const authorNode = metadata ? (metadata['dc:creator'] ?? metadata.creator) : '';
  const langNode = metadata ? (metadata['dc:language'] ?? metadata.language) : '';
  const descNode = metadata ? (metadata['dc:description'] ?? metadata.description) : '';
  const subjNode = metadata ? (metadata['dc:subject'] ?? metadata.subject) : '';
  const title = getText(asArray(titleNode)[0]);
  const author = getText(asArray(authorNode)[0]);
  const language = getText(asArray(langNode)[0]);
  const description = getText(asArray(descNode)[0]);
  const subjects = asArray(subjNode).map((s) => getText(s)).filter(Boolean);

  return {
    type: 'epub',
    title,
    author: author || undefined,
    language: language || undefined,
    description: description || undefined,
    subjects: subjects.length > 0 ? subjects : undefined,
    chapters,
    meta: {
      sourceFileType: 'epub',
      originalFilename: options.originalFilename,
      importedAt: new Date().toISOString(),
      parserVersion: PARSER_VERSION,
    },
  };
}
