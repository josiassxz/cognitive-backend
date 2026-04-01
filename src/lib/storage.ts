import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { readFile } from 'node:fs/promises';
import { env } from '../config/env';

const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToStorage(localPath: string, cloudKey: string, contentType = 'audio/mpeg') {
  const fileBuffer = await readFile(localPath);
  const maxAttempts = 3;
  let lastError: unknown = undefined;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: env.AWS_S3_BUCKET,
          Key: cloudKey,
          Body: fileBuffer,
          ContentType: contentType,
          ContentLength: fileBuffer.length,
        }),
      );
      return `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${cloudKey}`;
    } catch (error) {
      lastError = error;
      const err = error as { name?: string; Code?: string; $metadata?: { httpStatusCode?: number } };
      const status = err.$metadata?.httpStatusCode ?? 0;
      const code = (err.Code ?? err.name ?? '').toLowerCase();
      const retryable =
        status === 500 || status === 503 || code.includes('internalerror') || code.includes('slowdown') || code.includes('requesttimeout');
      if (!retryable || attempt === maxAttempts) {
        break;
      }
      const waitMs = attempt * 400;
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
  const err = lastError as { name?: string; message?: string; Code?: string; $metadata?: { httpStatusCode?: number } };
  const details = `${err.name ?? 'StorageError'}:${err.Code ?? ''}:${err.$metadata?.httpStatusCode ?? ''}:${err.message ?? ''}`;
  throw new Error(`Storage upload failed (${details})`);
  return `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${cloudKey}`;
}
