import { PlaylistResponse } from "@/app/types/Playlist";
import { useMutation } from "@tanstack/react-query";

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
  const { mutate, data, error, isLoading, isSuccess } = useMutation<
    PlaylistResponse,
    Error,
    string
  >(fetchGeneratePlaylist);

  if (error) {
    console.log("Something went wrong!", error);
  }

  return { mutate, data, isLoading, error, isSuccess };
};
