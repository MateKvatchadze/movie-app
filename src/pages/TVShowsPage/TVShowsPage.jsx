import MovieList from "../../components/MovieList/MovieList";

function TVShowsPage({ trendingTvShows, popularTvShows, topRatedTvShows }) {
  return (
  <>
    <section className="movieSection">
      <h2>Trending Tv Shows</h2>
      <MovieList movies={trendingTvShows} variant="row"/>
    </section>

    <section className="movieSection">
      <h2>Popular Tv Shows</h2>
      <MovieList movies={popularTvShows} variant="row"/>
    </section>

    <section className="movieSection">
      <h2>Top Rated Tv Shows</h2>
      <MovieList movies={topRatedTvShows} variant="row"/>
    </section>        
    
  </>
  );
}

export default TVShowsPage;
