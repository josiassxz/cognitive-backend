// Resolve metadados (título, thumbnail) a partir de uma URL de mídia.
// YouTube: usa oEmbed (sem API key, sem quota).
// Outros: tenta Open Graph via primeiros 8KB da página.

type MediaMeta = {
  title: string;
  thumbnailUrl: string;
  youtubeId?: string;
  type: "youtube" | "podcast" | "audio";
};

export function extractYoutubeId(url: string): string | null {
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

export function extractPlaylistId(url: string): string | null {
  // YouTube exibe playlists do usuário com prefixos PL, OL, FL, RD etc.
  // RD/UU são "Mix" geradas automaticamente — não tratamos como playlist
  // importável aqui. Mantemos só PL, OL, FL.
  const m = url.match(/[?&]list=((?:PL|OL|FL)[A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

export type PlaylistResolveResult =
  | { kind: "ok"; title: string; videoIds: string[] }
  | { kind: "private" }
  | { kind: "not_found" }
  | { kind: "network_error" };

const INNERTUBE_CLIENT_VERSION = "2.20260414.01.00";

function extractVideoIdsFromBrowse(data: unknown): string[] {
  const seen = new Set<string>();
  const ids: string[] = [];
  const walk = (node: unknown): void => {
    if (!node) return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    if (typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const renderer = obj.playlistVideoRenderer as { videoId?: string } | undefined;
    if (renderer?.videoId && typeof renderer.videoId === "string") {
      const id = renderer.videoId;
      if (id.length === 11 && !seen.has(id)) {
        seen.add(id);
        ids.push(id);
      }
    }
    for (const value of Object.values(obj)) walk(value);
  };
  walk(data);
  return ids;
}

function extractTitle(data: any): string {
  return (
    data?.metadata?.playlistMetadataRenderer?.title ??
    data?.header?.playlistHeaderRenderer?.title?.simpleText ??
    "Playlist"
  );
}

function extractContinuationToken(data: unknown): string | null {
  let found: string | null = null;
  const walk = (node: unknown): boolean => {
    if (found) return true;
    if (!node) return false;
    if (Array.isArray(node)) {
      for (const child of node) if (walk(child)) return true;
      return false;
    }
    if (typeof node !== "object") return false;
    const obj = node as Record<string, unknown>;
    const cmd = (obj.continuationItemRenderer as any)?.continuationEndpoint?.continuationCommand?.token;
    if (typeof cmd === "string" && cmd.length > 0) {
      found = cmd;
      return true;
    }
    for (const value of Object.values(obj)) if (walk(value)) return true;
    return false;
  };
  walk(data);
  return found;
}

/**
 * Devolve título + videoIds (ordenados) de uma playlist do YouTube usando a
 * API interna InnerTube — mesma usada pelo app oficial. Bypassa a página de
 * consentimento de cookies (que bloqueia scraping HTML fora dos EUA).
 *
 * Retorna kind="private" quando a playlist requer login, "not_found" quando
 * não existe, "network_error" em falhas de rede. Limita a 200 vídeos.
 */
export async function resolvePlaylistVideos(playlistId: string): Promise<PlaylistResolveResult> {
  const baseBody = {
    context: {
      client: {
        clientName: "WEB",
        clientVersion: INNERTUBE_CLIENT_VERSION,
        hl: "en",
        gl: "US",
      },
    },
  };

  let data: any;
  try {
    const res = await fetch("https://www.youtube.com/youtubei/v1/browse?prettyPrint=false", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...baseBody, browseId: `VL${playlistId}` }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return { kind: "network_error" };
    data = await res.json();
  } catch {
    return { kind: "network_error" };
  }

  const alert = data?.alerts?.[0]?.alertRenderer;
  if (alert?.type === "ERROR") {
    const msg = alert?.text?.runs?.[0]?.text ?? alert?.text?.simpleText ?? "";
    if (/does not exist/i.test(msg)) return { kind: "not_found" };
    if (/private|sign in/i.test(msg)) return { kind: "private" };
    return { kind: "not_found" };
  }

  const title = extractTitle(data);
  const ids = extractVideoIdsFromBrowse(data);

  // Continuation: playlists >100 vídeos vêm paginadas. Busca até bater 200
  // ou esgotar os tokens (cap de 3 chamadas extras = ~400 itens hard ceiling).
  let continuation = extractContinuationToken(data);
  let extraCalls = 0;
  while (continuation && ids.length < 200 && extraCalls < 3) {
    extraCalls += 1;
    try {
      const res = await fetch("https://www.youtube.com/youtubei/v1/browse?prettyPrint=false", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...baseBody, continuation }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) break;
      const more = await res.json();
      const moreIds = extractVideoIdsFromBrowse(more);
      const seen = new Set(ids);
      for (const id of moreIds) {
        if (!seen.has(id)) {
          ids.push(id);
          if (ids.length >= 200) break;
        }
      }
      continuation = extractContinuationToken(more);
    } catch {
      break;
    }
  }

  if (ids.length === 0) return { kind: "not_found" };
  return { kind: "ok", title, videoIds: ids.slice(0, 200) };
}

function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url);
}

function isAudioUrl(url: string): boolean {
  return /\.(mp3|ogg|aac|wav|m4a|flac)(\?|$)/i.test(url);
}

async function resolveYoutubeMetadata(url: string): Promise<MediaMeta> {
  const videoId = extractYoutubeId(url);
  const fallbackTitle = videoId ? `YouTube: ${videoId}` : "Playlist do YouTube";
  const fallbackThumb = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl, { signal: AbortSignal.timeout(8000) });
    if (response.ok) {
      const data = (await response.json()) as { title?: string; thumbnail_url?: string };
      return {
        title: data.title ?? fallbackTitle,
        thumbnailUrl: fallbackThumb || data.thumbnail_url || "",
        youtubeId: videoId ?? undefined,
        type: "youtube",
      };
    }
  } catch {}

  return {
    title: fallbackTitle,
    thumbnailUrl: fallbackThumb,
    youtubeId: videoId ?? undefined,
    type: "youtube",
  };
}

async function resolvePodcastMetadata(url: string): Promise<MediaMeta> {
  try {
    const response = await fetch(url, {
      headers: { Range: "bytes=0-8191" },
      signal: AbortSignal.timeout(8000),
    });
    const html = await response.text();

    const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/)?.[1];
    const ogImage = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)?.[1];
    const htmlTitle = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1];

    return {
      title: ogTitle ?? htmlTitle ?? new URL(url).hostname,
      thumbnailUrl: ogImage ?? "",
      type: "podcast",
    };
  } catch {
    return { title: new URL(url).hostname, thumbnailUrl: "", type: "podcast" };
  }
}

export async function resolveMediaMetadata(url: string): Promise<MediaMeta> {
  if (isYouTubeUrl(url)) return resolveYoutubeMetadata(url);
  if (isAudioUrl(url)) {
    const filename = url.split("/").pop()?.split("?")[0] ?? "Áudio";
    return { title: filename, thumbnailUrl: "", type: "audio" };
  }
  return resolvePodcastMetadata(url);
}
