// Convert a chapter's XHTML body into NormalizedParagraph[]. Uses
// node-html-parser (tiny, dependency-free) instead of regex stripping so we can
// reason about block-level structure properly.
import { parse, type HTMLElement, type Node } from 'node-html-parser';
import { cleanParagraphText } from '../shared/clean';
import type { NormalizedParagraph, NormalizedParagraphKind } from '../types';

const BLOCK_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'li']);
const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function isElement(node: Node): node is HTMLElement {
  return node.nodeType === 1;
}

function classifyParagraph(tag: string, text: string): NormalizedParagraphKind {
  if (HEADING_TAGS.has(tag)) return 'heading';
  // Treat *** / * * * scene-break paragraphs.
  if (/^\s*([*•·]\s*){2,}\s*$/.test(text)) return 'scene-break';
  if (text.startsWith('"') || text.startsWith("'") || text.startsWith('\u2014')) {
    return 'dialogue';
  }
  return 'paragraph';
}

function collectBlocks(node: Node, out: HTMLElement[]): void {
  if (!isElement(node)) return;
  const tag = node.tagName?.toLowerCase() ?? '';
  if (tag === 'hr') {
    // synthesize a scene-break marker by reusing a <p> shim — represented later
    out.push(node);
    return;
  }
  if (BLOCK_TAGS.has(tag)) {
    out.push(node);
    return;
  }
  for (const child of node.childNodes) collectBlocks(child, out);
}

export type HtmlToParagraphsResult = {
  paragraphs: NormalizedParagraph[];
  /** First heading text encountered, useful as a chapter title fallback. */
  firstHeading?: string;
};

export function htmlChapterToParagraphs(html: string): HtmlToParagraphsResult {
  const root = parse(html, { lowerCaseTagName: true, comment: false });
  const body = root.querySelector('body') ?? root;
  const blocks: HTMLElement[] = [];
  for (const child of body.childNodes) collectBlocks(child, blocks);

  const paragraphs: NormalizedParagraph[] = [];
  let firstHeading: string | undefined;
  let index = 0;
  for (const block of blocks) {
    const tag = block.tagName?.toLowerCase() ?? '';
    if (tag === 'hr') {
      paragraphs.push({ index: index++, text: '* * *', kind: 'scene-break' });
      continue;
    }
    const rawText = block.text ?? '';
    const text = cleanParagraphText(rawText);
    if (!text) continue;
    const kind = classifyParagraph(tag, text);
    if (kind === 'heading' && !firstHeading) firstHeading = text;
    paragraphs.push({ index: index++, text, kind });
  }

  return { paragraphs, firstHeading };
}
