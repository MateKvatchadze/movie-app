import { useQuery } from "@tanstack/react-query";
import { fetchAnimeSections, mediaQueryKeys } from "../api/mediaApi";

function useAnimeSections() {
  const { data, isLoading, error } = useQuery({
    queryKey: mediaQueryKeys.animeSections,
    queryFn: fetchAnimeSections,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  return {
    trendingAnime: data?.trendingAnime || [],
    popularAnime: data?.popularAnime || [],
    topRatedAnime: data?.topRatedAnime || [],
    animeLoading: isLoading,
    animeError: error?.message || "",
  };
}

export default useAnimeSections;