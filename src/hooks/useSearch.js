import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchSearchResults(query) {
  const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to search");
  }

  return data;
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