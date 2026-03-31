import {
  Engine,
  OutputFormat,
  PollyClient,
  SynthesizeSpeechCommand,
  TextType,
  VoiceId,
} from '@aws-sdk/client-polly';
import { writeFile } from 'node:fs/promises';
import { env } from '../config/env';
import type { TtsSentenceResult } from './azure-tts';

const polly = new PollyClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

type PollyMark = {
  type: string;
  value: string;
  time: number;
};

export async function synthesizeWithPolly(
  sentences: string[],
  outputPath: string,
  voice: VoiceId = VoiceId.Joanna,
): Promise<{ audioPath: string; durationMs: number; sentences: TtsSentenceResult[] }> {
  const sentenceResults: TtsSentenceResult[] = [];
  const audioBuffers: Buffer[] = [];
  let cumulativeMs = 0;
  for (let sentenceIndex = 0; sentenceIndex < sentences.length; sentenceIndex += 1) {
    const text = sentences[sentenceIndex];
    const marksResponse = await polly.send(
      new SynthesizeSpeechCommand({
        Text: text,
        TextType: TextType.TEXT,
        OutputFormat: OutputFormat.JSON,
        VoiceId: voice,
        Engine: Engine.NEURAL,
        SpeechMarkTypes: ['word'],
      }),
    );
    const marksText = await streamToString(marksResponse.AudioStream);
    const marks = marksText
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as PollyMark);
    const words = marks
      .filter((mark) => mark.type === 'word')
      .map((mark, wordIndex, arr) => {
        const next = arr[wordIndex + 1];
        const localStart = mark.time;
        const localEnd = next ? next.time : mark.time + 220;
        return {
          word: mark.value,
          startMs: cumulativeMs + localStart,
          endMs: cumulativeMs + Math.max(localEnd, localStart + 50),
        };
      });
    const audioResponse = await polly.send(
      new SynthesizeSpeechCommand({
        Text: text,
        TextType: TextType.TEXT,
        OutputFormat: OutputFormat.MP3,
        VoiceId: voice,
        Engine: Engine.NEURAL,
        SampleRate: '24000',
      }),
    );
    const audioBuffer = Buffer.from(await streamToBytes(audioResponse.AudioStream));
    audioBuffers.push(audioBuffer);
    const sentenceDurationMs = marks.length > 0 ? marks[marks.length - 1].time + 320 : 2000;
    const startMs = cumulativeMs;
    const endMs = cumulativeMs + sentenceDurationMs;
    sentenceResults.push({
      sentenceIndex,
      text,
      startMs,
      endMs,
      words,
    });
    cumulativeMs = endMs;
  }
  const fullAudio = Buffer.concat(audioBuffers);
  await writeFile(outputPath, fullAudio);
  return {
    audioPath: outputPath,
    durationMs: cumulativeMs,
    sentences: sentenceResults,
  };
}

async function streamToString(stream: unknown): Promise<string> {
  const bytes = await streamToBytes(stream);
  return Buffer.from(bytes).toString('utf-8');
}

async function streamToBytes(stream: unknown): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
