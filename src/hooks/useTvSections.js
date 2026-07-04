import { useEffect, useState } from "react";

function useTvSections() {
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);

  const [tvLoading, setTvLoading] = useState(false);
  const [tvError, setTvError] = useState("");

  useEffect(() => {
    async function fetchTvSections() {
      try {
        setTvLoading(true);
        setTvError("");

        const response = await fetch("/api/tmdb?type=tv");
        const data = await response.json();

        if (!response.ok || data.error) {
          setTvError(data.error || "Failed to fetch TV shows");
          return;
        }

        setTrendingTvShows(data.trending);
        setPopularTvShows(data.popular);
        setTopRatedTvShows(data.topRated);
      } catch (error) {
        console.log("TV sections error:", error);
        setTvError("Something went wrong");
      } finally {
        setTvLoading(false);
      }
    }

    fetchTvSections();
  }, []);

  return {
    trendingTvShows,
    popularTvShows,
    topRatedTvShows,
    tvLoading,
    tvError,
  };
}

export default useTvSections;