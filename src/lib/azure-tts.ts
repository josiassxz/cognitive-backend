import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { env } from '../config/env';

export interface TtsWordTimestamp {
  word: string;
  startMs: number;
  endMs: number;
}

export interface TtsSentenceResult {
  sentenceIndex: number;
  text: string;
  startMs: number;
  endMs: number;
  words: TtsWordTimestamp[];
}

export interface TtsResult {
  audioPath: string;
  durationMs: number;
  sentences: TtsSentenceResult[];
}

export async function synthesizeWithAzure(sentences: string[], outputPath: string, voice = 'en-US-JennyNeural'): Promise<TtsResult> {
  if (!env.AZURE_SPEECH_KEY || !env.AZURE_SPEECH_REGION) {
    throw new Error('Azure Speech credentials não configuradas');
  }
  const speechConfig = sdk.SpeechConfig.fromSubscription(env.AZURE_SPEECH_KEY, env.AZURE_SPEECH_REGION);
  speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz128KBitRateMonoMp3;
  speechConfig.speechSynthesisVoiceName = voice;
  const ssml = buildSsml(sentences, voice);
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(outputPath);
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  const wordBuffer: TtsWordTimestamp[] = [];
  const sentenceStartTimes: number[] = [];
  synthesizer.wordBoundary = (_, event: sdk.SpeechSynthesisWordBoundaryEventArgs) => {
    const startMs = Math.round(Number(event.audioOffset) / 10000);
    const durationMs = Math.round(event.duration / 10000);
    wordBuffer.push({
      word: event.text,
      startMs,
      endMs: startMs + durationMs,
    });
  };
  synthesizer.bookmarkReached = (_, event: sdk.SpeechSynthesisBookmarkEventArgs) => {
    const offsetMs = Math.round(Number(event.audioOffset) / 10000);
    sentenceStartTimes.push(offsetMs);
  };
  return await new Promise((resolve, reject) => {
    synthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        synthesizer.close();
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          const totalDurationMs = Math.round(Number(result.audioDuration) / 10000);
          resolve({
            audioPath: outputPath,
            durationMs: totalDurationMs,
            sentences: distributeWordsToSentences(sentences, wordBuffer, sentenceStartTimes, totalDurationMs),
          });
          return;
        }
        reject(new Error(`Azure TTS falhou: ${sdk.ResultReason[result.reason]} — ${result.errorDetails}`));
      },
      (error) => {
        synthesizer.close();
        reject(new Error(`Azure TTS error: ${String(error)}`));
      },
    );
  });
}

function buildSsml(sentences: string[], voice: string): string {
  const sentenceSsml = sentences.map((text, index) => `<bookmark mark="s${index}"/><s>${escapeXml(text)}</s>`).join('\n');
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US"><voice name="${voice}"><prosody rate="0%" pitch="0%">${sentenceSsml}</prosody></voice></speak>`;
}

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function distributeWordsToSentences(sentences: string[], allWords: TtsWordTimestamp[], sentenceStarts: number[], totalDurationMs: number) {
  const results: TtsSentenceResult[] = [];
  for (let index = 0; index < sentences.length; index += 1) {
    const startMs = sentenceStarts[index] ?? (index > 0 ? results[index - 1]?.endMs ?? 0 : 0);
    const endMs = sentenceStarts[index + 1] ?? totalDurationMs;
    const words = allWords.filter((word) => word.startMs >= startMs && word.endMs <= endMs);
    results.push({
      sentenceIndex: index,
      text: sentences[index],
      startMs,
      endMs,
      words,
    });
  }
  return results;
}
