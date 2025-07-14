export type GeneratePlaylistResponse = {
  name: string;
  tracks: Song[];
};

export type Song = {
  title: string;
  artist: string;
};

export type EnrichedSong = {
  title: string;
  artist: string;
  album: string;
  durationMs: number;
  spotifyId?: string;
  previewUrl?: string;
  albumImage?: string;
};
