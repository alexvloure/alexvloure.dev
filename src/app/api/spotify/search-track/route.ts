import { getSpotifyAccessToken, spotifyApi } from "@/lib/spotify";
import { cacheSong, getCachedSong } from "@/utils/trackCache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const track = req.nextUrl.searchParams.get("track");
  const artist = req.nextUrl.searchParams.get("artist");

  if (!track || !artist) {
    return NextResponse.json(
      { message: "Track and artist parameters are required" },
      { status: 400 },
    );
  }

  const cached = await getCachedSong(track, artist);
  if (cached) {
    return NextResponse.json(cached);
  } else {
    try {
      const token = await getSpotifyAccessToken();
      spotifyApi.setAccessToken(token);

      const recentTrack = await spotifyApi.searchTracks(
        `track:${track} artist:${artist}`,
      );

      const item = recentTrack.body.tracks?.items[0];
      if (!item) {
        return NextResponse.json(
          { message: "Track not found" },
          { status: 404 },
        );
      }

      const formattedItem = {
        spotifyId: item.id,
        title: item.name,
        artist: item.artists[0]?.name,
        album: item.album.name,
        albumImage: item.album.images[0]?.url ?? null,
        durationMs: item.duration_ms,
      };

      await cacheSong(formattedItem);
      return NextResponse.json(formattedItem);
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to search track", error: err },
        { status: 500 },
      );
    }
  }
}
