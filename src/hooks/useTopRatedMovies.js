import { useEffect, useState } from "react";

function useTopRatedMovies(){
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedLoading, setTopRatedLoading] = useState(false);
  const [topRatedError, setTopRatedError] = useState("");
  

  useEffect(() =>{
    async function fetchTopRatedMovies() {
      setTopRatedLoading(true);
      setTopRatedError("");

      try {
        const response = await fetch("/api/top-rated");
        const data = await response.json();

        if(data.error) {
          setTopRatedError(data.error);
          return;
        }

        setTopRatedMovies(data.results || []);
      } catch (err) {
        console.log("Failed to fetch top rated movies:", err);
        setTopRatedError("Failed to load top rated movies");
      } finally {
        setTopRatedLoading(false);
      }
    }

    fetchTopRatedMovies();
  },[])
  
  return { topRatedMovies, topRatedLoading, topRatedError };
}

export default useTopRatedMovies;