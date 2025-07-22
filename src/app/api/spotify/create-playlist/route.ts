import { NextRequest, NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_SUUND2_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SUUND2_CLIENT_SECRET,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return new Response(JSON.stringify({ error: "Name is required" }), {
      status: 400,
    });
  }

  try {
    api.setRefreshToken(process.env.SPOTIFY_SUUND2_REFRESH_TOKEN!);
    const data = await api.refreshAccessToken();
    api.setAccessToken(data.body["access_token"]);

    const response = await api.createPlaylist(name, {
      description: "AI generated playlist",
      collaborative: false,
    });

    console.log("Playlist created:", response);

    return NextResponse.json(
      {
        message: "Playlist created successfully",
        playlistId: response.body.id,
        playlistUrl: response.body.external_urls.spotify,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error creating playlist:", err);
    return NextResponse.json(
      { message: "Failed to create playlist", error: err },
      { status: 500 },
    );
  }
}
