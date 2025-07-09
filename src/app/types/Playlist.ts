export type PlaylistResponse = {
  playlist: Playlist;
};

export type Playlist = Song[];

export type Song = {
  title: string;
  artist: string;
  album: string;
};
