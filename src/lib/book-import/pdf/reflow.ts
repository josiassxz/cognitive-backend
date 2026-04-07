// Dehyphenate end-of-line word breaks and reflow paragraph wrapping. Single
// newline between non-empty lines = soft wrap → space; double newline = real
// paragraph break.

export function dehyphenate(text: string): string {
  // Join "exam-\nple" into "example".
  return text.replace(/([A-Za-zÀ-ÿ])-\n([a-zà-ÿ])/g, '$1$2');
}

export function reflowParagraphs(text: string): string {
  const dehyphenated = dehyphenate(text);
  // Normalize line endings.
  const normalized = dehyphenated.replace(/\r\n?/g, '\n');
  // Protect double newlines.
  const PARA = '\u0001';
  const protectedText = normalized.replace(/\n{2,}/g, PARA);
  // Soft wrap → space.
  const joined = protectedText.replace(/\n+/g, ' ');
  // Restore paragraph breaks.
  return joined.replace(new RegExp(PARA, 'g'), '\n\n');
}

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}
