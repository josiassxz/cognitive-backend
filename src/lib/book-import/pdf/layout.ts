// Detect repeating header/footer lines across pages and strip page numbers.
// We only have plain text per page (pdf-parse), so "header" = first non-empty
// line and "footer" = last non-empty line.

const PAGE_NUMBER_LINE = /^\s*\d{1,4}\s*$/;
const ROMAN_PAGE_NUMBER = /^\s*[ivxlcdm]{1,6}\s*$/i;

function nonEmptyLines(page: string): string[] {
  return page.split('\n').map((l) => l.trim()).filter(Boolean);
}

export function stripRepeatingChrome(pages: string[]): string[] {
  if (pages.length === 0) return pages;
  const headerCounts = new Map<string, number>();
  const footerCounts = new Map<string, number>();
  for (const page of pages) {
    const lines = nonEmptyLines(page);
    if (lines.length === 0) continue;
    const head = lines[0];
    const foot = lines[lines.length - 1];
    headerCounts.set(head, (headerCounts.get(head) ?? 0) + 1);
    footerCounts.set(foot, (footerCounts.get(foot) ?? 0) + 1);
  }
  const threshold = Math.max(2, Math.ceil(pages.length * 0.3));
  const repeatingHeaders = new Set(
    Array.from(headerCounts.entries())
      .filter(([line, count]) => count >= threshold && line.length < 120)
      .map(([line]) => line),
  );
  const repeatingFooters = new Set(
    Array.from(footerCounts.entries())
      .filter(([line, count]) => count >= threshold && line.length < 120)
      .map(([line]) => line),
  );

  return pages.map((page) => {
    const lines = page.split('\n');
    // Trim leading repeating header.
    let start = 0;
    while (start < lines.length && lines[start].trim() === '') start += 1;
    if (start < lines.length && repeatingHeaders.has(lines[start].trim())) {
      lines[start] = '';
    }
    // Trim trailing repeating footer.
    let end = lines.length - 1;
    while (end >= 0 && lines[end].trim() === '') end -= 1;
    if (end >= 0 && repeatingFooters.has(lines[end].trim())) {
      lines[end] = '';
    }
    // Drop standalone page-number lines anywhere.
    return lines
      .map((line) => (PAGE_NUMBER_LINE.test(line) || ROMAN_PAGE_NUMBER.test(line) ? '' : line))
      .join('\n');
  });
}
