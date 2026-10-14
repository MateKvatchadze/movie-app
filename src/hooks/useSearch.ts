import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { z } from "zod";

const SearchSchema = z.looseObject({
  results: z.array(
    z.object({
      id: z.number(),

      media_type: z.string(),

      title: z.string().nullish(),
      name: z.string().nullish(),
      poster_path: z.string().nullish(),
      release_date: z.string().nullish(),
      first_air_date: z.string().nullish(),
      vote_average: z.number().nullish(),
      overview: z.string().nullish(),
      format: z.string().nullish(),
      number_of_seasons: z.number().nullish(),
      number_of_episodes: z.number().nullish(),

      relations: z.object({
        edges: z.array(
          z.object({
            relationType: z.string(),
            node: z.object({
              id: z.number(),
              title: z.object({
                english: z.string().nullish(),
              }),
              format: z.string().nullish(),
            }),
          })
        ),
      }).nullish(),
    })
  ),
});


async function fetchSearchResults(query:string ) {
  const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  const data = await response.json();

  const result = SearchSchema.safeParse(data);

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to search");
  }
  if(!result.success){
    console.error(result.error.issues);
    throw new Error("Invalid Search data from API");
  }
  
  return result.data;
}

function useSearch() {
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", trimmedQuery],
    queryFn: () => fetchSearchResults(trimmedQuery),
    enabled: Boolean(trimmedQuery),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  return {
    query,
    setQuery,
    results: data?.results || [],
    loading: isLoading,
    error: error?.message || "",
  };
}

export default useSearch;