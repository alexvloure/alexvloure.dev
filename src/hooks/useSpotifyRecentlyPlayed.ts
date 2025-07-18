import { useQuery } from "@tanstack/react-query";

const fetchRecentlyPlayed = async () => {
  const response = await fetch("/api/spotify/recently-played");
  return await response.json();
};

export const useSpotifyRecentlyPlayed = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["spotify"],
    queryFn: fetchRecentlyPlayed,
    // staleTime: 5 * (60 * 1000), // 5 minutes
  });
  if (error) {
    console.log("Something went wrong!", error);
  }

  return { data, isLoading };
};
