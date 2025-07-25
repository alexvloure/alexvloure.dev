import { getSpotifyClient, SpotifyAccount } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description } = body;

  if (!name || !description) {
    return new Response(JSON.stringify({ error: "Name is required" }), {
      status: 400,
    });
  }

  try {
    const client = await getSpotifyClient(SpotifyAccount.SUUND);

    const response = await client.createPlaylist(name, {
      description: description,
      collaborative: false,
    });

    return NextResponse.json(
      {
        message: "Playlist created successfully",
        playlistId: response.body.id,
        playlistUrl: response.body.external_urls.spotify,
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create playlist", error: err },
      { status: 500 },
    );
  }
}
