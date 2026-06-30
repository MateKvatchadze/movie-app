import MovieList from "../../components/MovieList/MovieList";

function MoviesPage({ trendingMovies, popularMovies, topRatedMovies }) {
  return (
  <>
    <section className="moveieSection">
      <h2>Trending Movies</h2>
      <MovieList movies={trendingMovies} variant="row"/>
    </section>

    <section className="moveieSection">
      <h2>Popular Movies</h2>
      <MovieList movies={popularMovies} variant="row"/>
    </section>    

    <section className="moveieSection">
      <h2>Top Rated Movies</h2>
      <MovieList movies={topRatedMovies} variant="row"/>
    </section>    
    
  
  </>
  );
}

export default MoviesPage;