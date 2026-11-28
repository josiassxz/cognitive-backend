// Livros favoritos do aluno (atalho na biblioteca). Montado em /api/reading-lab/favorites.
//
//   GET  /api/reading-lab/favorites               { ids } — mais recentes primeiro
//   PUT  /api/reading-lab/favorites/:contentId    { favorite } — marca/desmarca (idempotente)
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { CUSTOM_DECK_SOURCE, loadVisibleContent } from './reading-segments';

export const favoritesRouter = Router();

const bodySchema = z.object({ favorite: z.boolean() });

favoritesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const rows = await prisma.userFavoriteBook.findMany({
      // Mesma regra de visibilidade da biblioteca: público, ou privado do próprio aluno.
      where: {
        userId,
        content: { sourceType: { not: CUSTOM_DECK_SOURCE }, OR: [{ isPublic: true }, { userId }] },
      },
      orderBy: { createdAt: 'desc' },
      select: { contentId: true },
    });
    res.json({ ids: rows.map((row) => row.contentId) });
  }),
);

favoritesRouter.put(
  '/:contentId',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = z.coerce.number().int().positive().parse(req.params.contentId);
    const { favorite } = bodySchema.parse(req.body);
    const content = await loadVisibleContent(contentId, req.userRole, userId);
    // Baralhos criados pelo aluno não são livros da biblioteca.
    if (content.sourceType === CUSTOM_DECK_SOURCE) throw new HttpError(404, 'Conteúdo não encontrado');
    if (favorite) {
      await prisma.userFavoriteBook.upsert({
        where: { userId_contentId: { userId, contentId } },
        create: { userId, contentId },
        update: {},
      });
    } else {
      await prisma.userFavoriteBook.deleteMany({ where: { userId, contentId } });
    }
    res.json({ contentId, favorite });
  }),
);
