import { NextResponse } from "next/server";
import { getSpotifyAccessToken, spotifyApi } from "@/lib/spotify";

export async function GET() {
  try {
    const token = await getSpotifyAccessToken();
    spotifyApi.setAccessToken(token);

    const playlists = await spotifyApi.getUserPlaylists();

    if (!playlists || !playlists.body.items) {
      return NextResponse.json(
        { error: "No playlists found" },
        { status: 404 },
      );
    }

    const oldPlaylists = (
      await Promise.allSettled(
        playlists.body.items.map(async (playlist) => {
          const tracks = await spotifyApi.getPlaylistTracks(playlist.id);
          const today = new Date();
          if (!tracks.body.items.length) return null;
          const timeDiff =
            today.getTime() - new Date(tracks.body.items[0].added_at).getTime();
          const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
          if (timeDiff > thirtyDaysInMs) {
            return playlist;
          }
          return null;
        }),
      )
    ).filter((playlist) => playlist !== null);

    if (oldPlaylists.length === 0) {
      return NextResponse.json(
        { message: "No old playlists to delete" },
        { status: 200 },
      );
    } else {
      oldPlaylists.forEach(async (playlist) => {
        await spotifyApi.unfollowPlaylist(
          playlist.status === "fulfilled" && playlist.value !== null
            ? playlist.value.id
            : "",
        );
      });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    JSON.stringify({ message: "Old playlists deleted" }),
    { status: 200 },
  );
}
