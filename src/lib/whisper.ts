import { createReadStream } from 'node:fs';
import OpenAI from 'openai';
import { env } from '../config/env';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export interface WhisperWord {
  word: string;
  start: number;
  end: number;
}

export interface WhisperSegment {
  id: number;
  text: string;
  start: number;
  end: number;
  words: WhisperWord[];
}

export interface WhisperResult {
  text: string;
  segments: WhisperSegment[];
  duration: number;
}

export async function transcribeWithWhisper(audioPath: string, language = 'en'): Promise<WhisperResult> {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY não configurada');
  }
  const response = await openai.audio.transcriptions.create({
    file: createReadStream(audioPath),
    model: 'whisper-1',
    language,
    response_format: 'verbose_json',
    timestamp_granularities: ['word', 'segment'],
  });
  const result = response as unknown as {
    text: string;
    segments?: WhisperSegment[];
    duration?: number;
    words?: WhisperWord[];
  };
  const segments = result.segments ?? [];
  if (result.words && segments.length > 0) {
    for (const segment of segments) {
      segment.words = result.words.filter((word) => word.start >= segment.start && word.end <= segment.end);
    }
  }
  return {
    text: result.text ?? '',
    segments,
    duration: result.duration ?? 0,
  };
}
