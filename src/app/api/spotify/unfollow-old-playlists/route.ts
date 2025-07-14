import SpotifyWebApi from "spotify-web-api-node";
import { NextResponse } from "next/server";

const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_SUUND_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SUUND_CLIENT_SECRET,
});

export async function GET() {
  try {
    api.setRefreshToken(process.env.SPOTIFY_SUUND_REFRESH_TOKEN!);
    const data = await api.refreshAccessToken();
    api.setAccessToken(data.body["access_token"]);

    const playlists = await api.getUserPlaylists();

    if (!playlists || !playlists.body.items) {
      return NextResponse.json(
        { error: "No playlists found" },
        { status: 404 },
      );
    }

    const oldPlaylists = (
      await Promise.allSettled(
        playlists.body.items.map(async (playlist) => {
          const tracks = await api.getPlaylistTracks(playlist.id);
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
        await api.unfollowPlaylist(
          playlist.status === "fulfilled" && playlist.value !== null
            ? playlist.value.id
            : "",
        );
      });
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
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
