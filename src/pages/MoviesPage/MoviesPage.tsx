import MovieList from "../../components/MovieList/MovieList";

import useMovieSections from "../../hooks/useMovieSections";
import MovieListSkeleton from "../../components/MovieList/MovieListSkeleton";

function MoviesPage() {
  const { trendingMovies, popularMovies, topRatedMovies, moviesLoading} = useMovieSections();

  return (
  <>
    <section className="movieSection">
      <h2>Trending Movies</h2>
      {moviesLoading ? (
        <MovieListSkeleton count={14} variant="row" />
      ) : (
        <MovieList movies={trendingMovies} variant="row" />
      )}
    </section>

    <section className="movieSection">
      <h2>Popular Movies</h2>
      {moviesLoading ? (
        <MovieListSkeleton count={14} variant="row" />
      ) : (
        <MovieList movies={popularMovies} variant="row" />
      )}      
    </section>

    <section className="movieSection">
      <h2>Top Rated Movies</h2>
      {moviesLoading ? (
        <MovieListSkeleton count={14} variant="row" />
      ) : (
        <MovieList movies={topRatedMovies} variant="row" />
      )}
    </section>  
  

  </>
  );
}

export default MoviesPage;