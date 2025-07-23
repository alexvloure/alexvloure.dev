import { getSpotifyClient, SpotifyAccount } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

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
    const client = await getSpotifyClient(SpotifyAccount.SUUND);

    await client.addTracksToPlaylist(playlistId, tracks);

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
