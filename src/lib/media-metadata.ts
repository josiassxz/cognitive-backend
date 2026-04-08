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
