import { EnrichedSong } from "@/app/types/Playlist";
import { redis } from "@/lib/redis";

const normalize = (s: string) => s.trim().toLowerCase();

const buildKey = (title: string, artist: string) =>
  `track:${normalize(title)}-${normalize(artist)}`;

export async function getCachedSong(
  title: string,
  artist: string,
): Promise<EnrichedSong | null> {
  const key = buildKey(title, artist);
  return await redis.get<EnrichedSong>(key);
}

export async function cacheSong(song: EnrichedSong) {
  const key = buildKey(song.title, song.artist);
  await redis.set(key, song);
}
