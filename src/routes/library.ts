import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import { HttpError } from "../utils/http-error";
import { prisma } from "../lib/prisma";
import { resolveMediaMetadata, extractPlaylistId, resolvePlaylistVideos } from "../lib/media-metadata";

const router = Router();
const MAX_ITEMS_PER_USER = 100;

// ── ITEMS ─────────────────────────────────────────────────────────────────────

// GET /library/items?type=youtube&favorite=true&page=1&limit=20
router.get(
  "/items",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { type, favorite, page = "1", limit = "20" } = req.query as Record<string, string>;

    const where: any = { userId };
    if (type) where.type = type;
    if (favorite === "true") where.isFavorite = true;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      prisma.userMediaItem.findMany({
        where,
        orderBy: { addedAt: "desc" },
        skip,
        take: limitNum,
      }),
      prisma.userMediaItem.count({ where }),
    ]);

    res.json({ items, total, page: pageNum, totalPages: Math.ceil(total / limitNum) });
  })
);

// POST /library/items — { url: string }
// Resposta discriminada:
//   { kind: "item",     item: UserMediaItem }
//   { kind: "playlist", playlist: UserPlaylist, itemCount, skipped }
router.post(
  "/items",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { url } = req.body as { url: string };

    if (!url || typeof url !== "string") {
      throw new HttpError(400, "URL é obrigatória.", "MISSING_URL");
    }

    try { new URL(url); } catch {
      throw new HttpError(400, "URL inválida.", "INVALID_URL");
    }

    // ── PLAYLIST ────────────────────────────────────────────────────────────
    const playlistId = extractPlaylistId(url);
    if (playlistId) {
      console.log(`[library.items] playlist detected playlistId=${playlistId}`);
      const result = await resolvePlaylistVideos(playlistId);
      if (result.kind !== "ok") {
        const messages: Record<typeof result.kind, [number, string, string]> = {
          private: [403, "Esta playlist é privada ou requer login no YouTube.", "PLAYLIST_PRIVATE"],
          not_found: [404, "Playlist não encontrada ou inacessível.", "PLAYLIST_NOT_FOUND"],
          network_error: [503, "YouTube indisponível. Tente novamente em instantes.", "PLAYLIST_NETWORK"],
        };
        const [status, msg, code] = messages[result.kind];
        console.log(`[library.items] playlist failed playlistId=${playlistId} kind=${result.kind}`);
        throw new HttpError(status, msg, code);
      }
      const { title: playlistTitle, videoIds } = result;
      console.log(`[library.items] playlist resolved playlistId=${playlistId} videos=${videoIds.length}`);

      const existingCount = await prisma.userMediaItem.count({ where: { userId } });
      const remaining = Math.max(0, MAX_ITEMS_PER_USER - existingCount);
      if (remaining === 0) {
        throw new HttpError(
          403,
          `Biblioteca cheia (máx. ${MAX_ITEMS_PER_USER} itens). Remova alguns para continuar.`,
          "LIBRARY_FULL",
        );
      }

      const playlist = await prisma.userPlaylist.create({
        data: { userId, title: playlistTitle, description: "", coverUrl: "" },
      });

      let position = 0;
      let skipped = 0;
      let coverUrl = "";
      for (const videoId of videoIds) {
        if (position >= remaining) {
          skipped += videoIds.length - position;
          break;
        }
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        let item = await prisma.userMediaItem.findFirst({
          where: { userId, youtubeId: videoId },
        });
        if (!item) {
          const meta = await resolveMediaMetadata(videoUrl);
          item = await prisma.userMediaItem.create({
            data: {
              userId,
              title: meta.title,
              type: "youtube",
              url: videoUrl,
              youtubeId: videoId,
              thumbnailUrl: meta.thumbnailUrl,
            },
          });
        }
        if (!coverUrl && item.thumbnailUrl) coverUrl = item.thumbnailUrl;
        await prisma.userPlaylistItem.create({
          data: { playlistId: playlist.id, mediaItemId: item.id, position },
        });
        position += 1;
      }

      let updatedPlaylist = playlist;
      if (coverUrl) {
        updatedPlaylist = await prisma.userPlaylist.update({
          where: { id: playlist.id },
          data: { coverUrl },
        });
      }

      res.status(201).json({
        kind: "playlist",
        playlist: {
          id: updatedPlaylist.id,
          title: updatedPlaylist.title,
          description: updatedPlaylist.description,
          coverUrl: updatedPlaylist.coverUrl,
          itemCount: position,
        },
        itemCount: position,
        skipped,
      });
      return;
    }

    // ── ITEM ÚNICO ──────────────────────────────────────────────────────────
    const count = await prisma.userMediaItem.count({ where: { userId } });
    if (count >= MAX_ITEMS_PER_USER) {
      throw new HttpError(
        403,
        `Biblioteca cheia (máx. ${MAX_ITEMS_PER_USER} itens). Remova alguns para continuar.`,
        "LIBRARY_FULL",
      );
    }

    const meta = await resolveMediaMetadata(url);

    const existing = await prisma.userMediaItem.findFirst({ where: { userId, url } });
    if (existing) {
      throw new HttpError(409, "Este item já está na sua biblioteca.", "ALREADY_EXISTS");
    }

    const item = await prisma.userMediaItem.create({
      data: {
        userId,
        title: meta.title,
        type: meta.type,
        url,
        youtubeId: meta.youtubeId ?? null,
        thumbnailUrl: meta.thumbnailUrl,
      },
    });

    res.status(201).json({ kind: "item", item });
  })
);

// DELETE /library/items/:id
router.delete(
  "/items/:id",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { id } = req.params;

    const item = await prisma.userMediaItem.findUnique({ where: { id } });
    if (!item || item.userId !== userId) throw new HttpError(404, "Item não encontrado.", "NOT_FOUND");

    await prisma.userMediaItem.delete({ where: { id } });
    res.status(204).end();
  })
);

// PATCH /library/items/:id/favorite — toggle
router.patch(
  "/items/:id/favorite",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { id } = req.params;

    const item = await prisma.userMediaItem.findUnique({ where: { id } });
    if (!item || item.userId !== userId) throw new HttpError(404, "Item não encontrado.", "NOT_FOUND");

    const updated = await prisma.userMediaItem.update({
      where: { id },
      data: { isFavorite: !item.isFavorite },
      select: { id: true, isFavorite: true },
    });

    res.json(updated);
  })
);

// ── PLAYLISTS ─────────────────────────────────────────────────────────────────

// GET /library/playlists
router.get(
  "/playlists",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;

    const playlists = await prisma.userPlaylist.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { items: true } } },
    });

    res.json({
      playlists: playlists.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        coverUrl: p.coverUrl,
        itemCount: p._count.items,
        createdAt: p.createdAt,
      })),
    });
  })
);

// POST /library/playlists — { title, description? }
router.post(
  "/playlists",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { title, description = "" } = req.body as { title: string; description?: string };

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      throw new HttpError(400, "Título da playlist é obrigatório.", "MISSING_TITLE");
    }

    const playlist = await prisma.userPlaylist.create({
      data: { userId, title: title.trim(), description },
    });

    res.status(201).json({ ...playlist, itemCount: 0 });
  })
);

// GET /library/playlists/:id
router.get(
  "/playlists/:id",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { id } = req.params;

    const playlist = await prisma.userPlaylist.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { position: "asc" },
          include: { mediaItem: true },
        },
      },
    });

    if (!playlist || playlist.userId !== userId) {
      throw new HttpError(404, "Playlist não encontrada.", "NOT_FOUND");
    }

    res.json({
      id: playlist.id,
      title: playlist.title,
      description: playlist.description,
      coverUrl: playlist.coverUrl,
      items: playlist.items.map((i) => ({ position: i.position, mediaItem: i.mediaItem })),
    });
  })
);

// PATCH /library/playlists/:id — { title?, description? }
router.patch(
  "/playlists/:id",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { id } = req.params;
    const { title, description } = req.body as { title?: string; description?: string };

    const playlist = await prisma.userPlaylist.findUnique({ where: { id } });
    if (!playlist || playlist.userId !== userId) throw new HttpError(404, "Playlist não encontrada.", "NOT_FOUND");

    const updated = await prisma.userPlaylist.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(description !== undefined ? { description } : {}),
      },
    });

    res.json(updated);
  })
);

// DELETE /library/playlists/:id
router.delete(
  "/playlists/:id",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { id } = req.params;

    const playlist = await prisma.userPlaylist.findUnique({ where: { id } });
    if (!playlist || playlist.userId !== userId) throw new HttpError(404, "Playlist não encontrada.", "NOT_FOUND");

    await prisma.userPlaylist.delete({ where: { id } });
    res.status(204).end();
  })
);

// POST /library/playlists/:id/items — { mediaItemId }
router.post(
  "/playlists/:id/items",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { id: playlistId } = req.params;
    const { mediaItemId } = req.body as { mediaItemId: string };

    const playlist = await prisma.userPlaylist.findUnique({ where: { id: playlistId } });
    if (!playlist || playlist.userId !== userId) throw new HttpError(404, "Playlist não encontrada.", "NOT_FOUND");

    const mediaItem = await prisma.userMediaItem.findUnique({ where: { id: mediaItemId } });
    if (!mediaItem || mediaItem.userId !== userId) throw new HttpError(404, "Item não encontrado.", "NOT_FOUND");

    const lastItem = await prisma.userPlaylistItem.findFirst({
      where: { playlistId },
      orderBy: { position: "desc" },
    });
    const position = (lastItem?.position ?? -1) + 1;

    const entry = await prisma.userPlaylistItem.create({
      data: { playlistId, mediaItemId, position },
    });

    // Atualizar coverUrl da playlist com thumbnail do primeiro item
    if (position === 0 && mediaItem.thumbnailUrl) {
      await prisma.userPlaylist.update({
        where: { id: playlistId },
        data: { coverUrl: mediaItem.thumbnailUrl },
      });
    }

    res.status(201).json(entry);
  })
);

// DELETE /library/playlists/:id/items/:itemId
router.delete(
  "/playlists/:id/items/:itemId",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { id: playlistId, itemId: mediaItemId } = req.params;

    const playlist = await prisma.userPlaylist.findUnique({ where: { id: playlistId } });
    if (!playlist || playlist.userId !== userId) throw new HttpError(404, "Playlist não encontrada.", "NOT_FOUND");

    await prisma.userPlaylistItem.deleteMany({ where: { playlistId, mediaItemId } });
    res.status(204).end();
  })
);

// PATCH /library/playlists/:id/reorder — { order: string[] } (mediaItemIds)
router.patch(
  "/playlists/:id/reorder",
  asyncHandler(async (req, res) => {
    const userId = req.userId!;
    const { id: playlistId } = req.params;
    const { order } = req.body as { order: string[] };

    const playlist = await prisma.userPlaylist.findUnique({ where: { id: playlistId } });
    if (!playlist || playlist.userId !== userId) throw new HttpError(404, "Playlist não encontrada.", "NOT_FOUND");

    if (!Array.isArray(order)) throw new HttpError(400, "order deve ser um array.", "INVALID_ORDER");

    await Promise.all(
      order.map((mediaItemId, position) =>
        prisma.userPlaylistItem.updateMany({
          where: { playlistId, mediaItemId },
          data: { position },
        })
      )
    );

    res.json({ reordered: order.length });
  })
);

export default router;
