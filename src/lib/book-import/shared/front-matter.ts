// Heuristics to filter front-/back-matter chapters that should not be part of
// the normalized book (cover, title page, TOC, copyright, about, etc.).

const FRONT_MATTER_FILE_PATTERNS = [
  /(^|\/)cover(\.|_|-)/i,
  /(^|\/)title(\.|_|-|page)/i,
  /(^|\/)nav\./i,
  /(^|\/)toc\./i,
  /(^|\/)about\./i,
  /(^|\/)copyright/i,
  /(^|\/)dedication/i,
  /(^|\/)acknowledg/i,
  /(^|\/)colophon/i,
  /(^|\/)imprint/i,
];

const FRONT_MATTER_TITLE_PATTERNS = [
  /^cover$/i,
  /^title( page)?$/i,
  /^contents?$/i,
  /^table of contents$/i,
  /^toc$/i,
  /^about( this book| the author)?$/i,
  /^copyright( notice)?$/i,
  /^dedication$/i,
  /^acknowledg(e?ments)?$/i,
  /^colophon$/i,
  /^index$/i,
  /^imprint$/i,
  /^front matter$/i,
];

export function isFrontMatterHref(href: string | undefined | null): boolean {
  if (!href) return false;
  return FRONT_MATTER_FILE_PATTERNS.some((pattern) => pattern.test(href));
}

export function isFrontMatterTitle(title: string | undefined | null): boolean {
  if (!title) return false;
  const trimmed = title.trim();
  if (!trimmed) return false;
  return FRONT_MATTER_TITLE_PATTERNS.some((pattern) => pattern.test(trimmed));
}

/** True when the title looks like a real chapter ("Chapter 1: ..."). */
export function looksLikeChapterTitle(title: string | undefined | null): boolean {
  if (!title) return false;
  return /^(chapter|cap[ií]tulo|part)\b/i.test(title.trim());
}
