// Moved verbatim from cognitive-backend/src/routes/reading-lab.ts so the
// book-import pipeline and the reading-lab route share one implementation.

export function segmentIntoSentences(text: string): string[] {
  const normalizedText = text.replace(/\r/g, '\n').trim();
  if (!normalizedText) return [];
  const blocks = normalizedText
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const sentences: string[] = [];
  for (const block of blocks) {
    const line = block
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!line) continue;
    const isChapterHeading = /^(chapter|cap[ií]tulo)\s+([a-z0-9ivxlcdm-]+)$/i.test(line);
    const isEndHeading = /^-+\s*the end\s*-+$/i.test(line);
    const isLikelyShortHeading = !/[.!?]$/.test(line) && line.length <= 100 && line.split(/\s+/).length <= 10;
    if (isChapterHeading || isEndHeading || isLikelyShortHeading) {
      sentences.push(line);
      continue;
    }
    const parts = line
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length === 0) {
      sentences.push(line);
      continue;
    }
    sentences.push(...parts);
  }
  return sentences;
}
