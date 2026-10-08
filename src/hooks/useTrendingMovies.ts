import { useQuery } from "@tanstack/react-query";
import z from "zod";


const trendingMovieSchema = z.object({
  id: z.number(),
  media_type: z.string(),
  poster_path: z.string().optional(),
  release_date: z.string().optional(),
  title: z.string(),  
  overview: z.string().optional(),
  vote_average: z.number().nullish(),
});
const trendingMoviesSchema = z.object({
  results: z.array(trendingMovieSchema),
})

async function fetchTrendingMovies() {
  const response = await fetch(`/api/trending`);
  const data = await response.json();

  if(!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch trending movies");
  }
  const result = trendingMoviesSchema.safeParse(data);
  if(!result.success){
    console.error(result.error);
    throw new Error("Invalid Trending Movie data from API");
  }
  
  return result.data;
}


function useTrendingMovies() {
  const trendingQuery = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
  });

  return {
    trendingMovies: trendingQuery.data?.results || [],
  };
}

export default useTrendingMovies;