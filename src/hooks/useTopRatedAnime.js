import { useEffect, useState } from "react";

function useTopRatedAnime(){
  const [topRatedAnime, setTopRatedAnime] = useState([]);
  const [topRatedAnimeLoading, setTopRatedAnimeLoading] = useState(false);
  const [topRatedAnimeError, setTopRatedAnimeError] = useState("");


  useEffect(() =>{
    async function fetchTopRatedAnime() {
      setTopRatedAnimeLoading(true);
      setTopRatedAnimeError("");

      try{
      const response = await fetch("/api/trending-anime");
      const data = await response.json();

      const normalizedAnime = (data.results || []).map((show) => ({
        ...show,
        title: show.name,
        release_date:show.first_air_date,
      }));

      setTopRatedAnime(normalizedAnime);
      
    } catch(error) {
      console.log("Failed to fetch Trending Anime:", error);
      setTopRatedAnimeError("Failed to load Trending Anime");
    } finally{
      setTopRatedAnimeLoading(false)
    }
    }

    fetchTopRatedAnime();
  },[]);

  return { topRatedAnime, topRatedAnimeLoading, topRatedAnimeError }
}
export default useTopRatedAnime;