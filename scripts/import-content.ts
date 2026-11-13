// Importa pacotes do audio-pipeline direto no banco (sem HTTP).
//   npx tsx scripts/import-content.ts <pacote.json|pasta> [--dry-run] [--force]
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { prisma } from '../src/lib/prisma';
import { importContentPackage } from '../src/services/content-import';

async function main() {
  const args = process.argv.slice(2);
  const target = args.find((arg) => !arg.startsWith('--'));
  if (!target) {
    console.error('uso: npx tsx scripts/import-content.ts <pacote.json|pasta> [--dry-run] [--force]');
    process.exit(2);
  }
  const files = statSync(target).isDirectory()
    ? readdirSync(target).filter((name) => name.endsWith('.import.json')).sort().map((name) => path.join(target, name))
    : [target];
  let failed = 0;
  for (const file of files) {
    try {
      const report = await importContentPackage(JSON.parse(readFileSync(file, 'utf8')), {
        dryRun: args.includes('--dry-run'),
        force: args.includes('--force'),
      });
      console.log(JSON.stringify({ file: path.basename(file), ...report }));
    } catch (error) {
      failed += 1;
      console.error(JSON.stringify({ file: path.basename(file), error: error instanceof Error ? error.message : String(error) }));
    }
  }
  await prisma.$disconnect();
  process.exit(failed ? 1 : 0);
}

void main();
