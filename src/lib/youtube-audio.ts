import { exec, execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { promisify } from 'node:util';

const execAsync = promisify(exec);
const execFileAsync = promisify(execFile);

export interface ExtractedAudio {
  localPath: string;
  durationMs: number;
}

export async function extractYoutubeAudio(youtubeId: string): Promise<ExtractedAudio> {
  const outputPath = `/tmp/yt-${youtubeId}.mp3`;
  if (existsSync(outputPath)) {
    const durationMs = await getAudioDurationMs(outputPath);
    return { localPath: outputPath, durationMs };
  }
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;
  const cookiesFile = (process.env.YTDLP_COOKIES_FILE ?? '').trim();
  const visitorData = (process.env.YTDLP_VISITOR_DATA ?? '').trim();
  const ytDlpArgs = [
    '-x',
    '--audio-format',
    'mp3',
    '--audio-quality',
    '128K',
    '--no-playlist',
    '--socket-timeout',
    '30',
    '--retries',
    '3',
    '--fragment-retries',
    '3',
    '--extractor-retries',
    '2',
    '--sleep-requests',
    '1',
    '--remote-components',
    'ejs:github',
    '--js-runtimes',
    'node',
    '--extractor-args',
    'youtube:player_client=mweb,web',
    '-o',
    outputPath,
    url,
  ];
  if (cookiesFile && existsSync(cookiesFile)) {
    ytDlpArgs.unshift(cookiesFile);
    ytDlpArgs.unshift('--cookies');
  }
  if (visitorData) {
    ytDlpArgs.unshift(`youtube:visitor_data=${visitorData}`);
    ytDlpArgs.unshift('--extractor-args');
  }
  try {
    await execFileAsync('yt-dlp', ytDlpArgs, { timeout: 180_000 });
    const durationMs = await getAudioDurationMs(outputPath);
    return { localPath: outputPath, durationMs };
  } catch (error) {
    if (existsSync(outputPath)) {
      await unlink(outputPath).catch(() => undefined);
    }
    const rawMessage = error instanceof Error ? error.message : 'erro desconhecido';
    const isBotOrRateLimit =
      rawMessage.includes('HTTP Error 429') ||
      rawMessage.includes('Sign in to confirm you’re not a bot') ||
      rawMessage.includes('Unable to download webpage');
    if (isBotOrRateLimit) {
      throw new Error(
        `Falha ao extrair áudio por bloqueio do YouTube (429/bot check). Defina YTDLP_COOKIES_FILE com cookies válidos exportados do YouTube e tente novamente. Erro original: ${rawMessage}`,
      );
    }
    throw new Error(`Falha ao extrair áudio: ${rawMessage}`);
  }
}

async function getAudioDurationMs(filePath: string): Promise<number> {
  try {
    const { stdout } = await execAsync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`);
    const duration = Number.parseFloat(stdout.trim());
    if (!Number.isFinite(duration) || duration <= 0) return 0;
    return Math.round(duration * 1000);
  } catch {
    return 0;
  }
}

export async function cleanupTempFile(localPath: string): Promise<void> {
  if (existsSync(localPath)) {
    await unlink(localPath).catch(() => undefined);
  }
}
