import { useEffect, useState } from "react";

function useTrendingTvShows() {
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [trendingTvLoading, setTrendingTvLoading] = useState(false);
  const [trendingTvError, setTrendingTvError] = useState("");

  useEffect(() =>{
    async function fetchTrendingTvShows() {
      setTrendingTvLoading(true);
      setTrendingTvError("");

    try {      
      const response = await fetch("/api/trending-tv");
      const data = await response.json();


      const normalizedShows = (data.results || []).map((show) =>({
        ...show,
        title: show.name,
        release_date: show.first_air_date,
      }));

      setTrendingTvShows(normalizedShows);
    } catch(error) {
      console.log("Failed to fetch tv shows:", error);
      setTrendingTvError("Failed to load trending tv shows");
    } finally {
      setTrendingTvLoading(false);
    }
    }

    fetchTrendingTvShows();
  },[])

  return { trendingTvShows, trendingTvLoading, trendingTvError };
}

export default useTrendingTvShows;