import { NextRequest, NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_SUUND2_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SUUND2_CLIENT_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    api.setRefreshToken(process.env.SPOTIFY_SUUND2_REFRESH_TOKEN!);
    const data = await api.refreshAccessToken();
    api.setAccessToken(data.body["access_token"]);

    const trackName = req.nextUrl.searchParams.get("track");
    const artistName = req.nextUrl.searchParams.get("artist");

    const recentTrack = await api.searchTracks(
      `track:${trackName} artist:${artistName}`,
    );

    return NextResponse.json(recentTrack.body.tracks?.items[0]);
  } catch (err) {
    console.log("Something went wrong!", err);
    return NextResponse.error();
  }
}

export const revalidate = 60 * 3; // 3 minutes
