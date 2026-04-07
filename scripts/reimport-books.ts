/* eslint-disable no-console */
// Re-import script for ReadingContent rows that originated from an ebook
// upload. Looks up each row's `sourceFileName` inside the directory passed via
// `--source-dir`, re-runs the v2 extractor, and rewrites `fullText` (the
// reader payload wrapper) inside a single transaction per row.
//
// Usage:
//   npx tsx scripts/reimport-books.ts --source-dir /path/to/originals
//
// The script does NOT re-synthesize TTS audio. Rows whose source file is
// missing on disk are skipped with a log line.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { extractBookContentFromUpload, PARSER_VERSION } from '../src/lib/book-import';
import { prisma } from '../src/lib/prisma';

type Args = { sourceDir: string };

function parseArgs(argv: string[]): Args {
  const args: Args = { sourceDir: '' };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (flag === '--source-dir' || flag === '-s') {
      args.sourceDir = argv[i + 1] ?? '';
      i += 1;
    }
  }
  if (!args.sourceDir) {
    throw new Error('Missing required --source-dir <path>');
  }
  return args;
}

function inferMimeType(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.epub')) return 'application/epub+zip';
  if (lower.endsWith('.pdf')) return 'application/pdf';
  return 'application/octet-stream';
}

function serializeReaderPayload(payload: unknown): string {
  return JSON.stringify({
    kind: 'epub_reader_payload',
    version: 1,
    parserVersion: PARSER_VERSION,
    payload,
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const absSourceDir = path.resolve(args.sourceDir);
  console.log(`[reimport] scanning ReadingContent where sourceType = 'ebook_upload'`);
  console.log(`[reimport] source-dir: ${absSourceDir}`);

  const rows = await prisma.readingContent.findMany({
    where: { sourceType: 'ebook_upload' },
    select: { id: true, title: true, sourceFileName: true, sourceFileType: true },
    orderBy: { id: 'asc' },
  });
  console.log(`[reimport] found ${rows.length} candidate rows`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of rows) {
    if (!row.sourceFileName) {
      console.warn(`[reimport] skip id=${row.id} (${row.title}): empty sourceFileName`);
      skipped += 1;
      continue;
    }
    const filePath = path.join(absSourceDir, row.sourceFileName);
    let buffer: Buffer;
    try {
      buffer = await readFile(filePath);
    } catch {
      console.warn(`[reimport] skip id=${row.id} (${row.title}): file not found at ${filePath}`);
      skipped += 1;
      continue;
    }
    try {
      const extracted = await extractBookContentFromUpload({
        buffer,
        originalName: row.sourceFileName,
        mimeType: inferMimeType(row.sourceFileName),
      });
      const newFullText = extracted.readerPayload
        ? serializeReaderPayload(extracted.readerPayload)
        : extracted.text;
      await prisma.$transaction(async (tx) => {
        await tx.readingContent.update({
          where: { id: row.id },
          data: { fullText: newFullText },
        });
      });
      updated += 1;
      console.log(`[reimport] updated id=${row.id} (${row.title})`);
    } catch (error) {
      failed += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[reimport] FAIL id=${row.id} (${row.title}): ${message}`);
    }
  }

  console.log('---');
  console.log(`[reimport] total=${rows.length} updated=${updated} skipped=${skipped} failed=${failed}`);
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect().catch(() => undefined);
  process.exit(1);
});
