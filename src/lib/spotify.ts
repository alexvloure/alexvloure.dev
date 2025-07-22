import SpotifyWebApi from "spotify-web-api-node";

let cachedAccessToken: string | null = null;
let accessTokenExpiresAt = 0;

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_SUUND_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_SUUND_CLIENT_SECRET!,
});

spotifyApi.setRefreshToken(process.env.SPOTIFY_SUUND_REFRESH_TOKEN!);

export async function getSpotifyAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedAccessToken && now < accessTokenExpiresAt) {
    return cachedAccessToken;
  }

  const data = await spotifyApi.refreshAccessToken();
  const accessToken = data.body.access_token;
  const expiresIn = data.body.expires_in * 1000; // expires_in is in seconds

  cachedAccessToken = accessToken;
  accessTokenExpiresAt = now + expiresIn;

  return accessToken;
}
