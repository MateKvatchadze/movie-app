import { useEffect, useState } from "react";

function useTopRatedTvShows() {
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [topRatedTvLoading, setTopRatedTvLoading] = useState(false);
  const [topRatedTvError, setTopRatedTvError] = useState("");

  useEffect(() =>{
    async function fetchTopRatedTvShows() {
      setTopRatedTvLoading(true);
      setTopRatedTvError("");

    try {      
      const response = await fetch("/api/top-rated-tv");
      const data = await response.json();


      const normalizedShows = (data.results || []).map((show) =>({
        ...show,
        title: show.name,
        release_date: show.first_air_date,
      }));

      setTopRatedTvShows(normalizedShows);
    } catch(error) {
      console.log("Failed to fetch tv shows:", error);
      setTopRatedTvError("Failed to load trending tv shows");
    } finally {
      setTopRatedTvLoading(false);
    }
    }

    fetchTopRatedTvShows();
  },[])

  return { topRatedTvShows, topRatedTvLoading, topRatedTvError };
}

export default useTopRatedTvShows;