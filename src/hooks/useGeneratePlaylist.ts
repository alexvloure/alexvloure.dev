import {
  EnrichedSong,
  GeneratePlaylistRequest,
  GeneratePlaylistResponse,
} from "@/app/types/Playlist";
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

const fetchGeneratePlaylist = async ({
  language,
  genre,
  numberOfSongs,
  mood,
}: GeneratePlaylistRequest): Promise<GeneratePlaylistResponse> => {
  const response = await fetch("/api/generate-playlist", {
    method: "POST",
    body: JSON.stringify({
      language,
      genre,
      numberOfSongs,
      mood,
    }),
  });
  return await response.json();
};

const fetchCreatePlaylist = async (name: string, description: string) => {
  const response = await fetch("/api/spotify/create-playlist", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
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
    GeneratePlaylistRequest
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
          data.tracks.map(
            async ({ title, artist }) => await fetchSpotifyTrack(title, artist),
          ),
        );
        const enrichedSongs = tracks
          .filter((r) => r.status === "fulfilled")
          .map((r) => (r as PromiseFulfilledResult<EnrichedSong>).value);

        const { playlistId, playlistUrl } = await fetchCreatePlaylist(
          data.name,
          data.description,
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
