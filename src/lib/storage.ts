import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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
  const publicUrl = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${cloudKey}`;
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
      try {
        const probe = await s3.send(
          new HeadObjectCommand({
            Bucket: env.AWS_S3_BUCKET,
            Key: cloudKey,
          }),
        );
        const uploadedSize = probe.ContentLength ?? 0;
        if (uploadedSize <= 0) {
          throw new Error(`UploadedObjectEmpty:${cloudKey}`);
        }
      } catch (error) {
        const err = error as { name?: string; Code?: string };
        const code = (err.Code ?? err.name ?? '').toLowerCase();
        if (!code.includes('accessdenied') && !code.includes('forbidden')) {
          throw error;
        }
      }
      return publicUrl;
    } catch (error) {
      lastError = error;
      const err = error as { name?: string; Code?: string; $metadata?: { httpStatusCode?: number } };
      const status = err.$metadata?.httpStatusCode ?? 0;
      const code = (err.Code ?? err.name ?? '').toLowerCase();
      const retryable =
        status === 500 ||
        status === 503 ||
        code.includes('internalerror') ||
        code.includes('slowdown') ||
        code.includes('requesttimeout') ||
        code.includes('serviceunavailable');
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
}

function extractCloudKeyFromUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('s3://')) {
    const withoutScheme = trimmed.slice(5);
    const slashIndex = withoutScheme.indexOf('/');
    if (slashIndex < 0) return null;
    const bucket = withoutScheme.slice(0, slashIndex);
    if (bucket !== env.AWS_S3_BUCKET) return null;
    return decodeURIComponent(withoutScheme.slice(slashIndex + 1));
  }
  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    const expectedPrefix = `${env.AWS_S3_BUCKET.toLowerCase()}.s3.`;
    if (!host.startsWith(expectedPrefix)) {
      return null;
    }
    const pathname = parsed.pathname.startsWith('/') ? parsed.pathname.slice(1) : parsed.pathname;
    return decodeURIComponent(pathname);
  } catch {
    return null;
  }
}

export async function getPlayableStorageUrl(value: string): Promise<string> {
  const key = extractCloudKeyFromUrl(value);
  if (!key) {
    return value;
  }
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn: 60 * 60 });
}
