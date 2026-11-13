// Entrega de mídia do driver filesystem: GET/HEAD /media/<chave>
//
// Autorização (uma das duas):
//   - URL temporária assinada (?exp=&sig=) emitida pela API para um usuário autenticado —
//     necessária porque <audio>/<img> e players nativos não enviam cabeçalho Bearer;
//   - sessão válida (cookie HttpOnly ou Bearer).
// Nunca há listagem de diretório nem acesso fora de MEDIA_ROOT.
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { Router, type Request, type Response } from 'express';
import { env } from '../config/env';
import { ACCESS_COOKIE, readCookie } from '../lib/cookies';
import { verifyToken } from '../lib/jwt';
import { resolveMediaPath, StorageKeyError, verifyMediaSignature } from '../lib/storage';

export const mediaRouter = Router();

const CONTENT_TYPES: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
  '.aac': 'audio/aac',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

function hasValidSession(req: Request): boolean {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : readCookie(req, ACCESS_COOKIE);
  if (!token) return false;
  try {
    return verifyToken(token).tokenType === 'access';
  } catch {
    return false;
  }
}

/** Interpreta `Range: bytes=...` (uma faixa). `null` = sem faixa; 'invalid' = 416. */
export function parseRange(header: string | undefined, size: number): { start: number; end: number } | null | 'invalid' {
  if (!header) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return 'invalid';
  const [, rawStart, rawEnd] = match;
  if (rawStart === '' && rawEnd === '') return 'invalid';
  if (rawStart === '') {
    const suffix = Number(rawEnd);
    if (suffix === 0 || size === 0) return 'invalid';
    return { start: Math.max(0, size - suffix), end: size - 1 };
  }
  const start = Number(rawStart);
  const end = rawEnd === '' ? size - 1 : Math.min(Number(rawEnd), size - 1);
  if (start >= size || start > end) return 'invalid';
  return { start, end };
}

async function serve(req: Request, res: Response): Promise<void> {
  if (env.STORAGE_DRIVER !== 'filesystem') {
    res.status(404).json({ error: 'Midia local desativada', code: 'NOT_FOUND' });
    return;
  }
  // Express já decodifica o caminho; req.params[0] é a chave relativa.
  const key = String((req.params as Record<string, string>)[0] ?? '');
  const signed = verifyMediaSignature(key, req.query.exp, req.query.sig);
  if (signed !== 'ok' && !hasValidSession(req)) {
    const expired = signed === 'expired';
    res.status(expired ? 403 : 401).json(
      expired
        ? { error: 'Link de midia expirado', code: 'MEDIA_URL_EXPIRED' }
        : { error: 'Nao autorizado', code: 'UNAUTHORIZED' },
    );
    return;
  }

  let absolutePath: string;
  try {
    absolutePath = resolveMediaPath(key);
  } catch (error) {
    if (error instanceof StorageKeyError) {
      res.status(400).json({ error: 'Caminho invalido', code: 'INVALID_PATH' });
      return;
    }
    throw error;
  }
  const contentType = CONTENT_TYPES[path.extname(absolutePath).toLowerCase()];
  if (!contentType) {
    res.status(404).json({ error: 'Arquivo nao encontrado', code: 'NOT_FOUND' });
    return;
  }
  let info;
  try {
    info = await stat(absolutePath);
  } catch {
    res.status(404).json({ error: 'Arquivo nao encontrado', code: 'NOT_FOUND' });
    return;
  }
  if (!info.isFile()) {
    res.status(404).json({ error: 'Arquivo nao encontrado', code: 'NOT_FOUND' });
    return;
  }

  const etag = `"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`;
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('ETag', etag);
  res.setHeader('Last-Modified', info.mtime.toUTCString());
  res.setHeader('Content-Type', contentType);
  // Privado: o link é por usuário e temporário; o navegador pode reutilizar enquanto vale.
  res.setHeader('Cache-Control', 'private, max-age=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.headers['if-none-match'] === etag && !req.headers.range) {
    res.status(304).end();
    return;
  }

  // If-Range com ETag diferente: ignora a faixa e manda o arquivo inteiro.
  const ifRange = req.headers['if-range'];
  const rangeHeader = ifRange && ifRange !== etag ? undefined : req.headers.range;
  const range = parseRange(rangeHeader, info.size);
  if (range === 'invalid') {
    res.setHeader('Content-Range', `bytes */${info.size}`);
    res.status(416).end();
    return;
  }
  const start = range ? range.start : 0;
  const end = range ? range.end : info.size - 1;
  res.status(range ? 206 : 200);
  if (range) res.setHeader('Content-Range', `bytes ${start}-${end}/${info.size}`);
  res.setHeader('Content-Length', String(info.size === 0 ? 0 : end - start + 1));
  if (req.method === 'HEAD' || info.size === 0) {
    res.end();
    return;
  }
  const stream = createReadStream(absolutePath, { start, end });
  stream.on('error', () => {
    if (!res.headersSent) res.status(500);
    res.destroy();
  });
  res.on('close', () => stream.destroy());
  stream.pipe(res);
}

function handler(req: Request, res: Response): void {
  serve(req, res).catch(() => {
    if (!res.headersSent) res.status(500).json({ error: 'Erro interno', code: 'INTERNAL_ERROR' });
  });
}

mediaRouter.get('/*', handler);
mediaRouter.head('/*', handler);
