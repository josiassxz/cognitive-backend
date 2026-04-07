// Per-paragraph text cleanup: strip soft hyphens, normalize curly quotes to
// straight ASCII, collapse whitespace, drop internal newlines.

export function cleanParagraphText(input: string): string {
  if (!input) return '';
  return input
    .replace(/\u00AD/g, '') // soft hyphen
    .replace(/\u00A0/g, ' ') // nbsp
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, '\u2014')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function countWords(text: string): number {
  if (!text) return 0;
  const matches = text.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}
