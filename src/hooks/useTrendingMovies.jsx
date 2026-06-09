import { useEffect, useState } from "react";

function useTrendingMovies() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState("");

  useEffect(() =>{
    async function fetchTrendingMovies() {
      setTrendingLoading(true);
      setTrendingError("");

      try {
        const response = await fetch("/api/trending");
        const data = await response.json();

        if(data.error) {
          setTrendingError(error);
          return;
        }
        
        setTrendingMovies(data.results);
      
      } catch(err){
        console.log("Something went wrong:", err);
        setTrendingError("Something went wrong:");

      } finally {
        setTrendingLoading(false);
      }

    }

    fetchTrendingMovies();
  },[]);  

  return{
    trendingMovies,
    trendingLoading,
    trendingError,
  };
}

export default useTrendingMovies;