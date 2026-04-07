// Parse EPUB3 nav.xhtml and legacy toc.ncx into a unified
// { href -> chapter title } map. Strips fragment identifiers from hrefs.
import { XMLParser } from 'fast-xml-parser';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  preserveOrder: false,
});

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function stripFragment(href: string): string {
  return href.split('#')[0].trim();
}

export type TocEntry = { href: string; title: string };

/**
 * Walk an arbitrary parsed XML node and pull out every <a href=...> with text.
 * The EPUB3 nav can be deeply nested (nested <ol>) so a recursive walker is
 * the simplest correct approach.
 */
function collectAnchors(node: unknown, out: TocEntry[]): void {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const child of node) collectAnchors(child, out);
    return;
  }
  const record = node as Record<string, unknown>;
  if (typeof record.href === 'string' && (typeof record['#text'] === 'string' || typeof record['#text'] === 'number')) {
    out.push({ href: stripFragment(record.href), title: String(record['#text']).trim() });
  }
  for (const key of Object.keys(record)) {
    if (key === 'href' || key === '#text') continue;
    collectAnchors(record[key], out);
  }
}

export function parseNavXhtml(xml: string): TocEntry[] {
  const parsed = xmlParser.parse(xml) as Record<string, unknown>;
  const out: TocEntry[] = [];
  collectAnchors(parsed, out);
  // dedupe by href, keep first
  const seen = new Set<string>();
  return out.filter((entry) => {
    if (!entry.href || seen.has(entry.href)) return false;
    seen.add(entry.href);
    return true;
  });
}

type NcxNavPoint = {
  navLabel?: { text?: unknown } | unknown;
  content?: { src?: unknown } | unknown;
  navPoint?: NcxNavPoint | NcxNavPoint[];
};

function walkNavPoints(point: NcxNavPoint | NcxNavPoint[] | undefined, out: TocEntry[]): void {
  for (const node of asArray(point)) {
    const label = node.navLabel as { text?: unknown } | undefined;
    const labelText = label?.text;
    const title =
      typeof labelText === 'string'
        ? labelText.trim()
        : labelText && typeof labelText === 'object' && '#text' in (labelText as Record<string, unknown>)
          ? String((labelText as Record<string, unknown>)['#text'] ?? '').trim()
          : '';
    const content = node.content as { src?: unknown } | undefined;
    const src = typeof content?.src === 'string' ? content.src : '';
    if (src) out.push({ href: stripFragment(src), title });
    if (node.navPoint) walkNavPoints(node.navPoint, out);
  }
}

export function parseNcx(xml: string): TocEntry[] {
  const parsed = xmlParser.parse(xml) as Record<string, unknown>;
  const ncx = parsed.ncx as Record<string, unknown> | undefined;
  const navMap = ncx?.navMap as { navPoint?: NcxNavPoint | NcxNavPoint[] } | undefined;
  if (!navMap) return [];
  const out: TocEntry[] = [];
  walkNavPoints(navMap.navPoint, out);
  return out;
}
