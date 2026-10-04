import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  fetchAnimeSections,
  mediaQueryKeys,
} from "../api/mediaApi";

function usePrefetchMediaSections() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: mediaQueryKeys.animeSections,
      queryFn: fetchAnimeSections,
      staleTime: 1000 * 60 * 10,
    });
  }, [queryClient]);
}

export default usePrefetchMediaSections;