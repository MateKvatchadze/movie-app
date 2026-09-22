import { useQuery } from "@tanstack/react-query";
import { fetchAnimeDetails, mediaQueryKeys } from "../api/mediaApi";

function useAnimeDetails(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: mediaQueryKeys.animeDetails(id),
    queryFn: () => fetchAnimeDetails(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  return {
    anime: data || null,
    animeDetailsLoading: isLoading,
    animeDetailsError: error?.message || "",
  };
}

export default useAnimeDetails;