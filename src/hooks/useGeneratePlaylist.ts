import { EnrichedSong, PlaylistResponse } from "@/app/types/Playlist";
import { useMutation } from "@tanstack/react-query";
import { set } from "date-fns";
import { use, useEffect, useState } from "react";

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
): Promise<PlaylistResponse> => {
  const response = await fetch("/api/generate-playlist", {
    method: "POST",
    body: JSON.stringify({
      mood,
    }),
  });
  return await response.json();
};

export const useGeneratePlaylist = () => {
  const [isGenerateSuccess, setIsGenerateSuccess] = useState(false);
  const [generateError, setGenerateError] = useState<Error | null>(null);
  const [isGenerateLoading, setIsGenerateLoading] = useState(false);
  const [playlist, setPlaylist] = useState<EnrichedSong[] | null>(null);
  const { mutate, data, isLoading, error, isSuccess } = useMutation<
    PlaylistResponse,
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
        const results = await Promise.allSettled(
          data.playlist.map(async ({ title, artist, album }) => {
            const result = await fetchSpotifyTrack(title, artist);
            return {
              title,
              artist,
              album,
              duration: result?.duration_ms,
              spotifyUrl: result?.external_urls?.spotify,
              previewUrl: result?.preview_url,
              albumImage: result?.album?.images?.[0]?.url,
            };
          }),
        );
        const enrichedSongs = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => (r as PromiseFulfilledResult<EnrichedSong>).value);

        setPlaylist(enrichedSongs);
        setIsGenerateLoading(false);
        setIsGenerateSuccess(true);
      } catch (error) {
        console.error("Error fetching enriched songs:", error);
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
