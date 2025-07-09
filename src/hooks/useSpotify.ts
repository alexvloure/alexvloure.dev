import { useQuery } from "@tanstack/react-query";

const fetchSpotify = async () => {
  const response = await fetch("/api/spotify");
  return await response.json();
};

export const useSpotify = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["spotify"],
    queryFn: fetchSpotify,
    // staleTime: 5 * (60 * 1000), // 5 minutes
  });
  if (error) {
    console.log("Something went wrong!", error);
  }

  return { data, isLoading };
};
