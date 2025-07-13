import { EnrichedSong, GeneratePlaylistResponse } from "@/app/types/Playlist";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchSpotifyTrack = async (title: string, artist: string) => {
  const response = await fetch(
    `/api/spotify/search-track?track=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch track");
  }
  return await response.json();
};

const fetchGeneratePlaylist = async (
  mood: string,
): Promise<GeneratePlaylistResponse> => {
  const response = await fetch("/api/generate-playlist", {
    method: "POST",
    body: JSON.stringify({
      mood,
    }),
  });
  return await response.json();
};

const fetchCreatePlaylist = async (name: string) => {
  const response = await fetch("/api/spotify/create-playlist", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create playlist");
  }
  return await response.json();
};

const fetchAddTracksToPlaylist = async (
  playlistId: string,
  tracks: string[],
) => {
  const response = await fetch("/api/spotify/add-playlist-tracks", {
    method: "POST",
    body: JSON.stringify({
      playlistId,
      tracks,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to add tracks to playlist");
  }
  return await response.json();
};

export const useGeneratePlaylist = () => {
  const [isGenerateSuccess, setIsGenerateSuccess] = useState(false);
  const [generateError, setGenerateError] = useState<Error | null>(null);
  const [isGenerateLoading, setIsGenerateLoading] = useState(false);
  const [playlist, setPlaylist] = useState<{
    name: string;
    url: string;
    tracks: EnrichedSong[];
  } | null>(null);
  const { mutate, data, isLoading, error } = useMutation<
    GeneratePlaylistResponse,
    Error,
    string
  >(fetchGeneratePlaylist);

  if (error) {
    console.log("Something went wrong!", error);
  }

  useEffect(() => {
    if (isLoading) {
      setIsGenerateLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!data) return;

    const getEnrichedSongs = async () => {
      try {
        const tracks = await Promise.allSettled(
          data.tracks.map(async ({ title, artist }) => {
            const result = await fetchSpotifyTrack(title, artist);
            return {
              title,
              artist,
              album: result?.album?.name,
              duration: result?.duration_ms,
              spotifyId: result?.id,
              previewUrl: result?.preview_url,
              albumImage: result?.album?.images?.[0]?.url,
            };
          }),
        );
        const enrichedSongs = tracks
          .filter((r) => r.status === "fulfilled")
          .map((r) => (r as PromiseFulfilledResult<EnrichedSong>).value);

        const { playlistId, playlistUrl } = await fetchCreatePlaylist(
          data.name,
        );
        await fetchAddTracksToPlaylist(
          playlistId,
          enrichedSongs.map((song) => `spotify:track:${song.spotifyId!}`),
        );

        setPlaylist({
          name: data.name,
          url: playlistUrl,
          tracks: enrichedSongs,
        });
        setIsGenerateLoading(false);
        setIsGenerateSuccess(true);
      } catch (error) {
        console.error("Error generating playlist", error);
        setPlaylist(null);
        setIsGenerateLoading(false);
        setGenerateError(error as Error);
      }
    };

    getEnrichedSongs();
  }, [data]);

  return {
    mutate,
    playlist,
    isLoading: isGenerateLoading,
    error: generateError || error,
    isSuccess: isGenerateSuccess,
  };
};
