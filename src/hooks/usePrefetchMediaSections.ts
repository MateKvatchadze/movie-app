
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  fetchAnimeSections,
  mediaQueryKeys,
} from "../api/mediaApi";

import { fetchTrendingMovies } from "./useTrendingMovies";

function usePrefetchMediaSections() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch anime sections
    queryClient.prefetchQuery({
      queryKey: mediaQueryKeys.animeSections,
      queryFn: fetchAnimeSections,
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 20,
    });

    // Prefetch all three Trending Now variants
    queryClient.prefetchQuery({
      queryKey: ["trendingMovies", "multi"],
      queryFn: () => fetchTrendingMovies("multi"),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 20,
    });

    queryClient.prefetchQuery({
      queryKey: ["trendingMovies", "movie"],
      queryFn: () => fetchTrendingMovies("movie"),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 20,
    });

    queryClient.prefetchQuery({
      queryKey: ["trendingMovies", "tv"],
      queryFn: () => fetchTrendingMovies("tv"),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 20,
    });
  }, [queryClient]);
}

export default usePrefetchMediaSections;
