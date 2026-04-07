# Book import — reference

Spec: [`specs/01-book-import-pipeline.spec.md`](../../../specs/01-book-import-pipeline.spec.md).

This document captures (a) the canonical EPUB shape we extract from, (b) the
`NormalizedBook` output contract that both the EPUB and PDF parsers must
produce, and (c) the rationale for the dependencies chosen.

## 1. Canonical EPUB shape — `graded-readers/`

All four reference EPUBs (`01_two_wallets_two_worlds.epub`,
`03_rent_day_blues.epub`, `25_the_two_minute_architect.epub`,
`77_the_glass_kingdom.epub`) are structurally identical.

```
mimetype
META-INF/container.xml          -> points at EPUB/content.opf
EPUB/content.opf                (OPF v3: package/metadata/manifest/spine)
EPUB/nav.xhtml                  (EPUB3 nav, <nav epub:type="toc"><ol>...)
EPUB/toc.ncx                    (legacy NCX, navMap > navPoint)
EPUB/cover.xhtml                front matter (<img>)
EPUB/title.xhtml                front matter (<div class="title-page">)
EPUB/chapter_001.xhtml ... chapter_NNN.xhtml
EPUB/about.xhtml                back matter
EPUB/style/book.css
EPUB/images/cover.jpg
```

Per chapter file:

```html
<html lang="en">
  <head><title>Chapter 1: The Two Neighbors</title>...</head>
  <body>
    <h2>Chapter 1: The Two Neighbors</h2>
    <p>Anna is a teacher. ...</p>
    <p>...</p>
  </body>
</html>
```

Notes:

- One paragraph = one `<p>`. No nested block formatting.
- Dialogue uses straight ASCII quotes (`"..."`).
- No scene-break separators (`* * *`, `<hr/>`) in the four fixtures, but the
  parser still recognises them.
- No soft hyphens (`\u00AD`) and no curly quotes in the fixtures, but the
  cleaner normalizes both anyway because real-world EPUBs have them.
- Spine order is: `cover.xhtml -> title.xhtml -> chapter_001..NNN -> about.xhtml`.
- TOC titles already say "Chapter N: ...". We use the TOC as the primary source
  of chapter titles and fall back to the first `<h1-6>` in the body if the TOC
  is missing or unmapped.

OPF metadata fields used: `dc:title`, `dc:creator`, `dc:language`,
`dc:description`, `dc:subject` (multiple).

### Front-matter detection

A spine item is dropped if any of the following holds:

- Its href matches `cover|title|nav|toc|about|copyright|dedication|acknowledg|colophon|index|imprint`
- Its TOC-supplied title matches `^cover|title page|contents|toc|about|copyright|dedication|acknowledgments|colophon|index|imprint|front matter$`
- After parsing, the chapter has no non-heading paragraphs **and** the title
  does not look like a real chapter (`^chapter|capítulo|part`).

If after all that the spine yields zero usable chapters, we log a warning and
fall back to "all xhtml files in the zip in alphabetical order".

## 2. `NormalizedBook` output contract

```ts
type NormalizedBook = {
  type: 'epub' | 'pdf';
  title: string;
  author?: string;
  language?: string;
  description?: string;
  subjects?: string[];
  chapters: NormalizedChapter[];
  meta: {
    sourceFileType: 'epub' | 'pdf';
    originalFilename: string;
    importedAt: string;          // ISO timestamp
    parserVersion: number;       // PARSER_VERSION
    needsOcr?: boolean;          // PDF only
  };
};

type NormalizedChapter = {
  index: number;
  title: string;
  href?: string;
  html?: string;
  paragraphs: NormalizedParagraph[];
  wordCount: number;
};

type NormalizedParagraph = {
  index: number;
  text: string;
  sentences?: string[];
  kind?: 'paragraph' | 'heading' | 'scene-break' | 'dialogue';
};
```

The legacy `ExtractedBookContent` (with `text`, `title`, `author`, `chapters:
string[]`, `readerPayload`) is *derived* from `NormalizedBook` via
`shared/derive-reader-payload.ts`. The legacy shape is what
`reading-lab.ts /import-book` consumes; we did not change the route's contract.

## 3. Dependency choices

| Dep | Status | Why |
| --- | --- | --- |
| `jszip` | already a dep | Reused for EPUB unzip. No alternative needed. |
| `fast-xml-parser` | already a dep | Reused for OPF / NCX / nav parsing. |
| `node-html-parser` | **added** | Tiny, no runtime deps. Replaces the regex-based `htmlToText` so we can walk block elements (`<p>`, `<h1-6>`, `<blockquote>`, `<li>`, `<hr>`) and classify them. `cheerio` would have pulled in a much larger tree for the same functionality. |
| `pdf-parse` | already a dep | Kept for v2. `TextResult.pages` already gives us per-page plain text, which is enough for the layered cleanup pipeline (header/footer detection, dehyphenation, reflow, chapter detection). Switching to `pdfjs-dist` would only matter if we needed font/x-y info for richer chapter detection — flagged as a future improvement, not blocking. |

The feature flag `BOOK_IMPORT_PARSER` (`v1` | `v2`, default `v2`) routes
between the legacy monolith (`book-import/legacy.ts`) and the v2 pipeline. The
v1 path remains usable verbatim for both EPUB and PDF during the transition.

## 4. PDF pipeline notes

`pdf/parser.ts` is a layered pipeline:

1. **Extract** per-page text via `pdf-parse` `TextResult.pages`.
2. **Strip chrome**: a line that appears as the first or last non-empty line of
   ≥30% of pages is treated as a recurring header/footer and removed.
   Standalone numeric (or roman) page-number lines are removed everywhere.
3. **Reflow**: dehyphenate `word-\nword` -> `wordword`, soft-wrap newlines ->
   space, double newlines -> paragraph break.
4. **Split** the reflowed text into paragraphs by blank lines.
5. **Detect chapters** via `/^(chapter|cap[ií]tulo|part)\b.../i` matched on
   short paragraphs. Falls back to a single `Content` chapter if no headings.
6. **OCR fallback marker**: if total cleaned characters / page count < 80, we
   set `meta.needsOcr = true`. The route does not yet act on this flag; it is
   carried through for downstream consumers.
