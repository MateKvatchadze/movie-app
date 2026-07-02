import { useEffect, useState } from "react";

function useAnimeSections(){
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [topRatedAnime, setTopRatedAnime] = useState([]);

  const [animeLoading, setAnimeLoading] = useState(false);
  const [animeError, setAnimeError] = useState("");

  useEffect(() => {
    async function fetchAnimeSection() {
      try{
        setAnimeLoading(true);
        setAnimeError("");

        const response = await fetch("/api/anilist");

          if(!response.ok) {
            throw new Error("Failed to fetch anime");
          }
          
        const data = await response.json();

        setTrendingAnime(data.trendingAnime);
        setPopularAnime(data.popularAnime); 
        setTopRatedAnime(data.topRatedAnime);
      } catch (error) {
        setAnimeError(error.message);
      } finally{
        setAnimeLoading(false);
      }
    }

    fetchAnimeSection()    
  },[]);

  return{
    trendingAnime, 
    popularAnime,
    topRatedAnime, 
    animeLoading, 
    animeError
  };
}

export default useAnimeSections;