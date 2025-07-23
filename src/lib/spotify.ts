// lib/spotify.ts
import SpotifyWebApi from "spotify-web-api-node";

export enum SpotifyAccount {
  SUUND = "suund",
  ALEX = "alex",
}

const clients: Record<SpotifyAccount, SpotifyWebApi> = {
  suund: new SpotifyWebApi({
    clientId: process.env.SPOTIFY_SUUND_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_SUUND_CLIENT_SECRET!,
  }),
  alex: new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ALEX_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_ALEX_CLIENT_SECRET!,
  }),
};

clients.suund.setRefreshToken(process.env.SPOTIFY_SUUND_REFRESH_TOKEN!);
clients.alex.setRefreshToken(process.env.SPOTIFY_ALEX_REFRESH_TOKEN!);

const tokenCache: Record<
  SpotifyAccount,
  { token: string | null; expires: number }
> = {
  suund: { token: null, expires: 0 },
  alex: { token: null, expires: 0 },
};

export async function getSpotifyClient(
  account: SpotifyAccount,
): Promise<SpotifyWebApi> {
  const now = Date.now();
  const client = clients[account];
  const cache = tokenCache[account];

  if (!cache.token || now >= cache.expires) {
    const data = await client.refreshAccessToken();
    const token = data.body.access_token;
    const expiresIn = data.body.expires_in * 1000;

    cache.token = token;
    cache.expires = now + expiresIn;
  }

  client.setAccessToken(cache.token);
  return client;
}
