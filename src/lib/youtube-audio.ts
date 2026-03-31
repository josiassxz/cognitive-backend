import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

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
  try {
    await execAsync(
      `yt-dlp -x --audio-format mp3 --audio-quality 128K --no-playlist --socket-timeout 30 -o "${outputPath}" "https://www.youtube.com/watch?v=${youtubeId}"`,
      { timeout: 120_000 },
    );
    const durationMs = await getAudioDurationMs(outputPath);
    return { localPath: outputPath, durationMs };
  } catch (error) {
    if (existsSync(outputPath)) {
      await unlink(outputPath).catch(() => undefined);
    }
    throw new Error(`Falha ao extrair áudio: ${error instanceof Error ? error.message : 'erro desconhecido'}`);
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
