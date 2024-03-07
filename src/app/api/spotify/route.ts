import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000',
});

export async function GET() {
  try {
    api.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN!);
    const data = await api.refreshAccessToken();
    api.setAccessToken(data.body['access_token']);

    const recentTracks = await api.getMyRecentlyPlayedTracks({
      limit: 1,
    });

    return NextResponse.json(recentTracks.body.items[0].track);
  } catch (err) {
    console.log('Something went wrong!', err);
  }
}

export const revalidate = 60 * 3; // 3 minutes
