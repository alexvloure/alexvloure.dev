export type PlaylistResponse = {
  playlist: Playlist;
};

export type Playlist = Song[];

export type Song = {
  title: string;
  artist: string;
  album: string;
};

export type EnrichedSong = {
  title: string;
  artist: string;
  album: string;
  spotifyUrl?: string;
  previewUrl?: string;
  albumImage?: string;
};
