import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import { HttpError } from "../utils/http-error";
import { prisma } from "../lib/prisma";

const router = Router();

// Extrai videoId de URLs do YouTube
function extractVideoId(url: string): string | null {
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /embed\/([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// Extrai playlistId
function extractPlaylistId(url: string): string | null {
  const m = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url);
}

// Busca transcript para um videoId usando youtube-transcript-plus
// Retorna null se não conseguiu
async function fetchTranscriptForVideo(videoId: string, languages: string[]): Promise<object[] | null> {
  try {
    // Importação dinâmica para compatibilidade com ESM
    const { YoutubeTranscript } = await import("youtube-transcript-plus");
    const result = await YoutubeTranscript.fetchTranscript(videoId, { lang: languages[0] ?? "en" });
    return result as object[];
  } catch {
    return null;
  }
}

// Busca transcript via Supadata (fallback quando youtube-transcript-plus falha)
async function fetchTranscriptSupadata(videoId: string, lang = "en"): Promise<object[] | null> {
  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(
      `https://api.supadata.ai/v1/youtube/transcript?videoId=${videoId}&lang=${lang}`,
      { headers: { "x-api-key": apiKey } }
    );
    if (!res.ok) return null;
    const data: any = await res.json();
    const content: any[] = data?.content ?? [];
    if (!content.length) return null;
    return content
      .filter((s: any) => s.text)
      .map((s: any) => ({
        text: String(s.text),
        offset: s.offset ?? s.start ?? 0,
        duration: s.duration ?? 0,
      }));
  } catch {
    return null;
  }
}

// Divide array em chunks de tamanho N
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

// Resolve videoIds de uma playlist via youtube-transcript-plus
async function resolvePlaylistVideoIds(playlistId: string): Promise<string[]> {
  try {
    const { YoutubeTranscript } = await import("youtube-transcript-plus");
    // A lib pode expor um método de playlist — usar fetch direto como fallback
    const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
    // Tenta resolver via oEmbed ou lista pública
    // Fallback: retornar array vazio se não suportado
    if (typeof (YoutubeTranscript as any).fetchPlaylist === "function") {
      const items = await (YoutubeTranscript as any).fetchPlaylist(playlistUrl);
      return items.map((i: any) => i.videoId ?? i.id).filter(Boolean);
    }
    return [];
  } catch {
    return [];
  }
}

// POST /api/v1/transcript
// Body: { url: string, source?: "client"|"server", languages?: string[], clientFailed?: boolean }
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { url, source = "client", languages = ["en"], clientFailed = false, transcript: clientTranscript } = req.body as {
      url: string;
      source?: string;
      languages?: string[];
      clientFailed?: boolean;
      transcript?: object[];
    };

    if (!url || typeof url !== "string") {
      throw new HttpError(400, "URL inválida. Use um link do YouTube.", "INVALID_URL");
    }

    if (!isYouTubeUrl(url)) {
      throw new HttpError(400, "URL inválida. Use um link do YouTube.", "NOT_YOUTUBE");
    }

    const playlistId = extractPlaylistId(url);

    // ── PLAYLIST ──────────────────────────────────────────────────────────────
    if (playlistId) {
      const allVideoIds = await resolvePlaylistVideoIds(playlistId);

      if (allVideoIds.length === 0) {
        throw new HttpError(400, "Não foi possível resolver os vídeos da playlist.", "PLAYLIST_EMPTY");
      }

      // Limitar a 50 vídeos
      const limited = allVideoIds.slice(0, 50);
      const skipped = allVideoIds.length - limited.length;

      const results: object[] = [];
      const chunks = chunkArray(limited, 5);

      for (const chunk of chunks) {
        const settled = await Promise.allSettled(
          chunk.map(async (videoId) => {
            // Verificar cache
            const cached = await prisma.transcript.findUnique({ where: { videoId } });
            if (cached) return { videoId, transcript: cached.transcript, source: "cache", cached: true };

            let transcript = await fetchTranscriptForVideo(videoId, languages);
            let itemSource = source;

            if (!transcript) {
              transcript = await fetchTranscriptSupadata(videoId, languages[0] ?? "en");
              itemSource = "supadata";
            }

            if (!transcript) return { videoId, error: "no_transcript" };

            await prisma.transcript.upsert({
              where: { videoId },
              create: { videoId, transcript, source: itemSource },
              update: { transcript, source: itemSource },
            });

            return { videoId, transcript, source: itemSource, cached: false };
          })
        );

        for (const r of settled) {
          if (r.status === "fulfilled") results.push(r.value);
          else results.push({ error: "failed" });
        }
      }

      const imported = results.filter((r: any) => !r.error).length;
      const failed = results.filter((r: any) => r.error).length;

      return res.json({
        type: "playlist",
        summary: { total: allVideoIds.length, imported, failed, skipped },
        items: results,
      });
    }

    // ── VÍDEO ÚNICO ───────────────────────────────────────────────────────────
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new HttpError(400, "URL inválida. Use um link do YouTube.", "INVALID_URL");
    }

    // Cache
    const cached = await prisma.transcript.findUnique({ where: { videoId } });
    if (cached) {
      return res.json({ videoId, transcript: cached.transcript, source: "cache", cached: true });
    }

    // ── Mobile conseguiu buscar o transcript: só salvar ───────────────────────
    if (source === "client" && Array.isArray(clientTranscript) && clientTranscript.length > 0) {
      await prisma.transcript.upsert({
        where: { videoId },
        create: { videoId, transcript: clientTranscript, source: "client" },
        update: { transcript: clientTranscript, source: "client" },
      });
      return res.json({ videoId, transcript: clientTranscript, source: "client", cached: false });
    }

    // ── Fallback: backend busca (mobile falhou ou source === "server") ─────────
    let transcript = await fetchTranscriptForVideo(videoId, languages);
    let finalSource = "server";

    if (!transcript) {
      transcript = await fetchTranscriptSupadata(videoId, languages[0] ?? "en");
      finalSource = "supadata";
    }

    if (!transcript) {
      throw new HttpError(503, "Não foi possível importar agora. Tente mais tarde.", "NO_TRANSCRIPT");
    }

    await prisma.transcript.upsert({
      where: { videoId },
      create: { videoId, transcript, source: finalSource },
      update: { transcript, source: finalSource },
    });

    return res.json({ videoId, transcript, source: finalSource, cached: false });
  })
);

// GET /api/v1/transcript/:videoId — consulta cache sem disparar fetch
router.get(
  "/:videoId",
  asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId || videoId.length !== 11) {
      throw new HttpError(400, "videoId inválido.", "INVALID_VIDEO_ID");
    }
    const cached = await prisma.transcript.findUnique({ where: { videoId } });
    if (!cached) {
      return res.status(404).json({ error: "not_found", code: "NOT_FOUND" });
    }
    return res.json({
      videoId,
      transcript: cached.transcript,
      source: "cache",
      cached: true,
    });
  })
);

export default router;
