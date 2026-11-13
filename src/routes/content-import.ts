// POST /api/admin/content-import — recebe um pacote do audio-pipeline.
// Autorização: token de máquina do worker (X-Import-Token = IMPORT_API_TOKEN) OU usuário admin.
// Nunca anônimo: sem IMPORT_API_TOKEN configurado, só admins autenticados conseguem importar.
import { timingSafeEqual } from 'node:crypto';
import { Router, type NextFunction, type Request, type Response } from 'express';
import { env } from '../config/env';
import { authMiddleware, requireAdmin } from '../middleware/auth';
import { importContentPackage } from '../services/content-import';
import { asyncHandler } from '../utils/async-handler';

export const contentImportRouter = Router();

function importTokenMatches(req: Request): boolean {
  const provided = req.headers['x-import-token'];
  if (!env.IMPORT_API_TOKEN || typeof provided !== 'string') return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(env.IMPORT_API_TOKEN);
  return a.length === b.length && timingSafeEqual(a, b);
}

function importAuth(req: Request, res: Response, next: NextFunction): void {
  if (importTokenMatches(req)) {
    next();
    return;
  }
  authMiddleware(req, res, () => requireAdmin(req, res, next));
}

contentImportRouter.post(
  '/',
  importAuth,
  asyncHandler(async (req, res) => {
    const flag = (value: unknown) => value === '1' || value === 'true';
    const report = await importContentPackage(req.body, {
      dryRun: flag(req.query.dryRun),
      force: flag(req.query.force),
      userId: req.userId ?? null,
    });
    res.status(report.action === 'created' && !report.dryRun ? 201 : 200).json(report);
  }),
);
