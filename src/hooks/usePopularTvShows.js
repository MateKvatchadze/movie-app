import { useEffect, useState } from "react";

function usePopularTvShows() {
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [popularTvLoading, setPopularTvLoading] = useState(false);
  const [popularTvError, setPopularTvError] = useState("");

  useEffect(() =>{
    async function fetchPopularTvShows() {
      setPopularTvLoading(true);
      setPopularTvError("");

    try {      
      const response = await fetch("/api/popular-tv");
      const data = await response.json();


      const normalizedShows = (data.results || []).map((show) =>({
        ...show,
        title: show.name,
        release_date: show.first_air_date,
      }));

      setPopularTvShows(normalizedShows);
    } catch(error) {
      console.log("Failed to fetch tv shows:", error);
      setPopularTvError("Failed to load popular tv shows");
    } finally {
      setPopularTvLoading(false);
    }
    }

    fetchPopularTvShows();
  },[])

  return { popularTvShows, popularTvLoading, popularTvError };
}

export default usePopularTvShows;