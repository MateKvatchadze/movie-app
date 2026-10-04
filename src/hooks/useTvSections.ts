import { useQuery } from "@tanstack/react-query";
import { fetchTvSections, mediaQueryKeys } from "../api/mediaApi";

function useTvSections() {
  const { data, isLoading, error } = useQuery({
    queryKey: mediaQueryKeys.tvSections,
    queryFn: fetchTvSections,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  return {
    trendingTvShows: data?.trending || [],
    popularTvShows: data?.popular || [],
    topRatedTvShows: data?.topRated || [],
    tvLoading: isLoading,
    tvError: error?.message || "",
  };
}

export default useTvSections;