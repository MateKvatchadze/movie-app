import { useQuery } from "@tanstack/react-query";
import { fetchMovieSections, mediaQueryKeys } from "../api/mediaApi";

function useMovieSections() {
  const { data, isLoading, error } = useQuery({
    queryKey: mediaQueryKeys.movieSections,
    queryFn: fetchMovieSections,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  return {
    trendingMovies: data?.trending || [],
    popularMovies: data?.popular || [],
    topRatedMovies: data?.topRated || [],
    moviesLoading: isLoading,
    moviesError: error?.message || "",
  };
}

export default useMovieSections;