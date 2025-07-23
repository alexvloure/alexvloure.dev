import { getSpotifyClient, SpotifyAccount } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await getSpotifyClient(SpotifyAccount.ALEX);

    const recentTracks = await client.getMyRecentlyPlayedTracks({
      limit: 1,
    });

    return NextResponse.json(recentTracks.body.items[0].track);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to get recently played tracks", error: err },
      { status: 500 },
    );
  }
}

export const revalidate = 60 * 3; // 3 minutes
