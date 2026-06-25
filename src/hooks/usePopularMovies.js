import { useEffect, useState } from "react";

function usePopularMovies(){
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularLoading, setPopularLoading] = useState(false);
  const [popularError, setPopularError] = useState("");

  useEffect(() => {
    async function fetchPopularMovies() {
      setPopularLoading(true);
      setPopularError("");

      try {
        const response = await fetch("/api/popular");
        const data = await response.json();

        if(data.error){
          setPopularError(data.error);
          return;
        }

        setPopularMovies(data.results || []);
      } catch (error) {
        console.log("Failed to fetch popular movies:", error);
        setPopularError("Failed to load popular movies");
      }finally{
        setPopularLoading(false);
      }
    }

    fetchPopularMovies();
  },[])


return{ popularMovies, popularLoading, popularError };
}

export default usePopularMovies;