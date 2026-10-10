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
    queryClient.prefetchQuery({
      queryKey: mediaQueryKeys.animeSections,
      queryFn: fetchAnimeSections,
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 20
    });

    queryClient.prefetchQuery({
      queryKey: ["trendingMovies"],
      queryFn: fetchTrendingMovies,
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 20,
    });
  }, [queryClient]);
}

export default usePrefetchMediaSections;