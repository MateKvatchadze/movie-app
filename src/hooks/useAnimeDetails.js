import { useEffect, useState } from "react";

function useAnimeDetails(id) {
  const [anime, setAnime] = useState(null);
  const [animeDetailsLoading, setAnimeDetailsLoading] = useState(false);
  const [animeDetailsError, setAnimeDetailsError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchAnimeDetails() {
      try {
        setAnimeDetailsLoading(true);
        setAnimeDetailsError("");

        const response = await fetch(`/api/anilist?id=${id}`);
        const data = await response.json();

        if (!response.ok || data.error) {
          setAnimeDetailsError(data.error || "Failed to fetch anime details");
          return;
        }

        setAnime(data);
      } catch (error) {
        console.log("Anime details error:", error);
        setAnimeDetailsError("Something went wrong");
      } finally {
        setAnimeDetailsLoading(false);
      }
    }

    fetchAnimeDetails();
  }, [id]);

  return {
    anime,
    animeDetailsLoading,
    animeDetailsError,
  };
}

export default useAnimeDetails;