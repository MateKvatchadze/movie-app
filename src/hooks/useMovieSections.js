import { useEffect, useState } from "react";

function useMovieSections() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState("");

  useEffect(() => {
    async function fetchMovieSections() {
      try {
        setMoviesLoading(true);
        setMoviesError("");

        const response = await fetch("/api/tmdb?type=movie");
        const data = await response.json();

        if (!response.ok || data.error) {
          setMoviesError(data.error || "Failed to fetch movies");
          return;
        }

        setTrendingMovies(data.trending);
        setPopularMovies(data.popular);
        setTopRatedMovies(data.topRated);
      } catch (error) {
        console.log("Movie sections error:", error);
        setMoviesError("Something went wrong");
      } finally {
        setMoviesLoading(false);
      }
    }

    fetchMovieSections();
  }, []);

  return {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    moviesLoading,
    moviesError,
  };
}

export default useMovieSections;