// Abstração de storage com dois drivers:
//   - filesystem: arquivos em MEDIA_ROOT, entregues por /media com URL temporária assinada
//   - s3:         bucket compatível com S3 e URLs pré-assinadas (comportamento anterior)
//
// Valores aceitos nos campos de mídia do banco (audioUrl/coverUrl):
//   - "media://<chave relativa>"     → chave no driver ativo
//   - URL https do bucket S3 antigo  → chave extraída; no driver filesystem é servida de
//                                      MEDIA_ROOT se o arquivo existir lá (backup local do bucket)
//   - qualquer outra URL             → devolvida como está
import { createHmac, timingSafeEqual } from 'node:crypto';
import { constants as fsConstants } from 'node:fs';
import { access, copyFile, mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { env } from '../config/env';

const MEDIA_SCHEME = 'media://';

export class StorageKeyError extends Error {}

/** Normaliza e valida uma chave relativa. Rejeita traversal, caminhos absolutos e bytes nulos. */
export function normalizeStorageKey(rawKey: string): string {
  if (typeof rawKey !== 'string' || rawKey.length === 0 || rawKey.length > 1024 || rawKey.includes('\0')) {
    throw new StorageKeyError('chave de mídia inválida');
  }
  if (rawKey.includes('\\') || rawKey.startsWith('/')) {
    throw new StorageKeyError('chave de mídia inválida');
  }
  const segments = rawKey.split('/');
  if (segments.some((segment) => segment === '' || segment === '.' || segment === '..')) {
    throw new StorageKeyError('chave de mídia inválida');
  }
  return segments.join('/');
}

export function mediaRoot(): string {
  return path.resolve(env.MEDIA_ROOT);
}

/** Caminho absoluto de uma chave dentro de MEDIA_ROOT (com dupla checagem de contenção). */
export function resolveMediaPath(rawKey: string): string {
  const key = normalizeStorageKey(rawKey);
  const root = mediaRoot();
  const absolute = path.resolve(root, key);
  if (absolute !== root && !absolute.startsWith(root + path.sep)) {
    throw new StorageKeyError('chave de mídia fora da raiz');
  }
  return absolute;
}

function urlSecret(): string {
  return env.MEDIA_URL_SECRET || `media:${env.JWT_SECRET}`;
}

function signature(key: string, expiresAt: number): string {
  return createHmac('sha256', urlSecret()).update(`${key}\n${expiresAt}`).digest('base64url');
}

/** URL temporária para /media. Com PUBLIC_BASE_URL vazio devolve caminho relativo à origem. */
export function signMediaUrl(rawKey: string, ttlSeconds = env.MEDIA_URL_TTL_SECONDS): string {
  const key = normalizeStorageKey(rawKey);
  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;
  const encoded = key.split('/').map(encodeURIComponent).join('/');
  const base = env.PUBLIC_BASE_URL.replace(/\/+$/, '');
  return `${base}/media/${encoded}?exp=${expiresAt}&sig=${signature(key, expiresAt)}`;
}

export function verifyMediaSignature(rawKey: string, exp: unknown, sig: unknown): 'ok' | 'expired' | 'invalid' {
  if (typeof exp !== 'string' || typeof sig !== 'string' || !/^\d{1,12}$/.test(exp)) return 'invalid';
  let key: string;
  try {
    key = normalizeStorageKey(rawKey);
  } catch {
    return 'invalid';
  }
  const expected = Buffer.from(signature(key, Number(exp)));
  const received = Buffer.from(sig);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return 'invalid';
  return Number(exp) * 1000 < Date.now() ? 'expired' : 'ok';
}

async function fileExists(absolutePath: string): Promise<boolean> {
  try {
    await access(absolutePath, fsConstants.R_OK);
    return (await stat(absolutePath)).isFile();
  } catch {
    return false;
  }
}

export async function mediaFileExists(rawKey: string): Promise<boolean> {
  try {
    return await fileExists(resolveMediaPath(rawKey));
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------------------- S3 (lazy)
// O cliente só é criado quando o driver S3 é realmente usado: sem credenciais AWS o
// restante da API continua funcionando e a falha fica localizada e explicativa.
type S3Module = typeof import('@aws-sdk/client-s3');
let s3ClientPromise: Promise<{ client: InstanceType<S3Module['S3Client']>; sdk: S3Module }> | null = null;

async function getS3() {
  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('Storage S3 selecionado, mas AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY não estão configurados');
  }
  if (!s3ClientPromise) {
    s3ClientPromise = import('@aws-sdk/client-s3').then((sdk) => ({
      sdk,
      client: new sdk.S3Client({
        region: env.AWS_REGION,
        credentials: { accessKeyId: env.AWS_ACCESS_KEY_ID, secretAccessKey: env.AWS_SECRET_ACCESS_KEY },
      }),
    }));
  }
  return s3ClientPromise;
}

async function uploadToS3(localPath: string, cloudKey: string, contentType: string): Promise<string> {
  const { client, sdk } = await getS3();
  const fileBuffer = await readFile(localPath);
  const maxAttempts = 3;
  let lastError: unknown = undefined;
  const publicUrl = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${cloudKey}`;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await client.send(
        new sdk.PutObjectCommand({
          Bucket: env.AWS_S3_BUCKET,
          Key: cloudKey,
          Body: fileBuffer,
          ContentType: contentType,
          ContentLength: fileBuffer.length,
        }),
      );
      try {
        const probe = await client.send(new sdk.HeadObjectCommand({ Bucket: env.AWS_S3_BUCKET, Key: cloudKey }));
        if ((probe.ContentLength ?? 0) <= 0) {
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
      if (!retryable || attempt === maxAttempts) break;
      await new Promise((resolve) => setTimeout(resolve, attempt * 400));
    }
  }
  const err = lastError as { name?: string; message?: string; Code?: string; $metadata?: { httpStatusCode?: number } };
  const details = `${err.name ?? 'StorageError'}:${err.Code ?? ''}:${err.$metadata?.httpStatusCode ?? ''}:${err.message ?? ''}`;
  throw new Error(`Storage upload failed (${details})`);
}

/** Extrai a chave de uma URL/URI do bucket configurado (legado). */
export function extractCloudKeyFromUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('s3://')) {
    const withoutScheme = trimmed.slice(5);
    const slashIndex = withoutScheme.indexOf('/');
    if (slashIndex < 0) return null;
    if (withoutScheme.slice(0, slashIndex) !== env.AWS_S3_BUCKET) return null;
    return decodeURIComponent(withoutScheme.slice(slashIndex + 1));
  }
  try {
    const parsed = new URL(trimmed);
    const expectedPrefix = `${env.AWS_S3_BUCKET.toLowerCase()}.s3.`;
    if (!parsed.hostname.toLowerCase().startsWith(expectedPrefix)) return null;
    const pathname = parsed.pathname.startsWith('/') ? parsed.pathname.slice(1) : parsed.pathname;
    return decodeURIComponent(pathname);
  } catch {
    return null;
  }
}

// ----------------------------------------------------------------------------- API pública
/** Valor a gravar no banco para uma chave do driver ativo. */
export function mediaRef(storageKey: string): string {
  return storageKey ? `${MEDIA_SCHEME}${normalizeStorageKey(storageKey)}` : '';
}

/**
 * Envia um arquivo local ao storage e devolve o valor a gravar no banco
 * (URL pública no S3; "media://<chave>" no filesystem).
 */
export async function uploadToStorage(localPath: string, cloudKey: string, contentType = 'audio/mpeg'): Promise<string> {
  if (env.STORAGE_DRIVER === 's3') {
    return uploadToS3(localPath, cloudKey, contentType);
  }
  const target = resolveMediaPath(cloudKey);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(localPath, target);
  return mediaRef(cloudKey);
}

/**
 * Converte o valor gravado no banco em URL tocável no ambiente atual.
 * Nunca lança: mídia indisponível vira string vazia ou a URL original.
 */
export async function getPlayableStorageUrl(value: string | null | undefined): Promise<string> {
  if (!value) return '';
  try {
    const isRef = value.startsWith(MEDIA_SCHEME);
    const key = isRef ? value.slice(MEDIA_SCHEME.length) : extractCloudKeyFromUrl(value);
    if (!key) return value;
    if (env.STORAGE_DRIVER === 's3') {
      const { client, sdk } = await getS3();
      const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');
      return await getSignedUrl(client, new sdk.GetObjectCommand({ Bucket: env.AWS_S3_BUCKET, Key: key }), {
        expiresIn: 60 * 60,
      });
    }
    if (await mediaFileExists(key)) return signMediaUrl(key);
    // Referência local sem arquivo: não há o que tocar. URL externa antiga: devolve como está.
    return isRef ? '' : value;
  } catch (error) {
    console.error('[storage] falha ao resolver URL de mídia:', error instanceof Error ? error.message : error);
    return value.startsWith(MEDIA_SCHEME) ? '' : value;
  }
}
