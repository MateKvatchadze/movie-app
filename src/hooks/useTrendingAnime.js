import { useEffect, useState } from "react";

function useTrendingAnime(){
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [trendingAnimeLoading, setTrendingAnimeLoading] = useState(false);
  const [trendingAnimeError, setTrendingAnimeError] = useState("");


  useEffect(() =>{
    async function fetchTrendingAnime() {
      setTrendingAnimeLoading(true);
      setTrendingAnimeError("");

      try{
      const response = await fetch("/api/trending-anime");
      const data = await response.json();

      const normalizedAnime = (data.results || []).map((show) => ({
        ...show,
        title: show.name,
        release_date:show.first_air_date,
      }));

      setTrendingAnime(normalizedAnime);
      
    } catch(error) {
      console.log("Failed to fetch Trending Anime:", error);
      setTrendingAnimeError("Failed to load Trending Anime");
    } finally{
      setTrendingAnimeLoading(false)
    }
    }

    fetchTrendingAnime();
  },[]);

  return { trendingAnime, trendingAnimeLoading, trendingAnimeError }
}
export default useTrendingAnime;