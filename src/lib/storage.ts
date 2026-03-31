import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { env } from '../config/env';

const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToStorage(localPath: string, cloudKey: string, contentType = 'audio/mpeg') {
  const fileInfo = await stat(localPath);
  const stream = createReadStream(localPath);
  await s3.send(
    new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: cloudKey,
      Body: stream,
      ContentType: contentType,
      ContentLength: fileInfo.size,
    }),
  );
  return `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${cloudKey}`;
}
