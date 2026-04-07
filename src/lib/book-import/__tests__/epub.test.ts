import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { extractEpub } from '../epub/parser';
import { PARSER_VERSION } from '../types';

const FIXTURES = path.join(__dirname, 'fixtures');

function loadFixture(name: string): Buffer {
  return readFileSync(path.join(FIXTURES, name));
}

describe('extractEpub', () => {
  it('parses 01_two_wallets_two_worlds with full metadata and 4 chapters', async () => {
    const buffer = loadFixture('01_two_wallets_two_worlds.epub');
    const book = await extractEpub(buffer, { originalFilename: '01_two_wallets_two_worlds.epub' });

    expect(book.type).toBe('epub');
    expect(book.title.toLowerCase()).toContain('two wallets');
    expect(book.author).toBeTruthy();
    expect(book.language).toBe('en');
    expect(book.meta.parserVersion).toBe(PARSER_VERSION);
    expect(book.chapters).toHaveLength(4);
    expect(book.chapters[0].title).toMatch(/^Chapter 1/);

    const firstParagraph = book.chapters[0].paragraphs.find((p) => p.kind !== 'heading');
    expect(firstParagraph?.text.startsWith('Anna is a teacher')).toBe(true);

    // No front-matter chapters slipped through.
    for (const chapter of book.chapters) {
      expect(chapter.title).not.toMatch(/cover/i);
      expect(chapter.title).not.toMatch(/title page/i);
      expect(chapter.title).not.toMatch(/about/i);
    }
  });

  it('parses 77_the_glass_kingdom and reports a sensible chapter count', async () => {
    const buffer = loadFixture('77_the_glass_kingdom.epub');
    const book = await extractEpub(buffer, { originalFilename: '77_the_glass_kingdom.epub' });
    // 77_the_glass_kingdom.epub has a prologue-like opener "The Glass Kingdom",
    // 10 numbered chapters and a "Glossary" entry. Front matter (cover, title,
    // about) is filtered, leaving 12 chapter entries.
    expect(book.chapters).toHaveLength(12);
    expect(book.chapters[0].title).toBe('The Glass Kingdom');
    expect(book.chapters[1].title).toMatch(/^Chapter 1/);
    for (const chapter of book.chapters) {
      expect(chapter.title).not.toMatch(/^cover$/i);
      expect(chapter.title).not.toMatch(/^title page$/i);
      expect(chapter.title).not.toMatch(/^about/i);
    }
  });

  it('is idempotent: parsing the same buffer twice produces equal output (excluding importedAt)', async () => {
    const buffer = loadFixture('01_two_wallets_two_worlds.epub');
    const a = await extractEpub(buffer, { originalFilename: '01_two_wallets_two_worlds.epub' });
    const b = await extractEpub(buffer, { originalFilename: '01_two_wallets_two_worlds.epub' });
    const stripImportedAt = (book: typeof a) => ({ ...book, meta: { ...book.meta, importedAt: 'fixed' } });
    expect(stripImportedAt(a)).toEqual(stripImportedAt(b));
  });
});
