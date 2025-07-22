import { NextRequest, NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_SUUND2_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SUUND2_CLIENT_SECRET,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { playlistId, tracks } = body;

  if (!playlistId || !tracks || tracks.length === 0) {
    return NextResponse.json(
      { error: "Playlist ID and tracks are required" },
      { status: 400 },
    );
  }

  try {
    api.setRefreshToken(process.env.SPOTIFY_SUUND2_REFRESH_TOKEN!);
    const data = await api.refreshAccessToken();
    api.setAccessToken(data.body["access_token"]);

    await api.addTracksToPlaylist(playlistId, tracks);

    return NextResponse.json(
      { message: "Tracks added successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to add tracks to playlist", error: err },
      { status: 500 },
    );
  }
}
