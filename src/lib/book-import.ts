import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { decode } from 'he';
import JSZip from 'jszip';
import { PDFParse } from 'pdf-parse';

export type UploadedBookType = 'epub' | 'pdf';

export type ExtractedBookContent = {
  type: UploadedBookType;
  text: string;
  title: string;
  author: string;
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

async function extractFromPdf(buffer: Buffer): Promise<ExtractedBookContent> {
  const parser = new PDFParse({ data: buffer });
  try {
    const [textResult, infoResult] = await Promise.all([parser.getText(), parser.getInfo()]);
    const titleFromInfo = typeof infoResult.info?.Title === 'string' ? infoResult.info.Title.trim() : '';
    const authorFromInfo = typeof infoResult.info?.Author === 'string' ? infoResult.info.Author.trim() : '';
    return {
      type: 'pdf',
      text: normalizeText(textResult.text ?? ''),
      title: titleFromInfo,
      author: authorFromInfo,
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
    const chapterText = htmlToText(html);
    if (chapterText) chapters.push(chapterText);
  }
  const titleNode = metadata ? metadata['dc:title'] ?? metadata.title : '';
  const authorNode = metadata ? metadata['dc:creator'] ?? metadata.creator : '';
  const title = getNodeText(asArray(titleNode)[0]);
  const author = getNodeText(asArray(authorNode)[0]);
  return {
    type: 'epub',
    text: normalizeText(chapters.join('\n\n')),
    title,
    author,
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
