import { useEffect, useState } from "react";

function usePopularAnime(){
  const [popularAnime, setPopularAnime] = useState([]);
  const [popularAnimeLoading, setPopularAnimeLoading] = useState(false);
  const [popularAnimeError, setPopularAnimeError] = useState("");


  useEffect(() =>{
    async function fetchPopularAnime() {
      setPopularAnimeLoading(true);
      setPopularAnimeError("");

      try{
      const response = await fetch("/api/trending-anime");
      const data = await response.json();

      const normalizedAnime = (data.results || []).map((show) => ({
        ...show,
        title: show.name,
        release_date:show.first_air_date,
      }));

      setPopularAnime(normalizedAnime);
      
    } catch(error) {
      console.log("Failed to fetch Trending Anime:", error);
      setPopularAnimeError("Failed to load Trending Anime");
    } finally{
      setPopularAnimeLoading(false)
    }
    }

    fetchPopularAnime();
  },[]);

  return { popularAnime, popularAnimeLoading, popularAnimeError }
}
export default usePopularAnime;