// Detect chapter boundaries in a flat list of paragraphs by looking for short
// paragraphs that match a chapter heading regex.

const CHAPTER_HEADING = /^(chapter|cap[ií]tulo|part)\b[\s\d ivxlcdm.:\-—–]*/i;

export type DetectedChapter = { title: string; paragraphs: string[] };

export function detectChapters(paragraphs: string[]): DetectedChapter[] {
  const chapters: DetectedChapter[] = [];
  let current: DetectedChapter | null = null;

  const isHeading = (text: string): boolean => {
    if (text.length > 80) return false;
    if (!CHAPTER_HEADING.test(text)) return false;
    // Reject sentences that just *mention* "chapter".
    return text.split(/\s+/).length <= 12;
  };

  for (const para of paragraphs) {
    if (isHeading(para)) {
      if (current && current.paragraphs.length > 0) chapters.push(current);
      current = { title: para.replace(/\s+/g, ' ').trim(), paragraphs: [] };
      continue;
    }
    if (!current) {
      current = { title: 'Content', paragraphs: [] };
    }
    current.paragraphs.push(para);
  }
  if (current && current.paragraphs.length > 0) chapters.push(current);
  if (chapters.length === 0 && paragraphs.length > 0) {
    return [{ title: 'Content', paragraphs: [...paragraphs] }];
  }
  return chapters;
}
