import MovieList from "../../components/MovieList/MovieList";

import useTvSections from "../../hooks/useTvSections";

function TVShowsPage() {

  const { trendingTvShows, popularTvShows, topRatedTvShows } = useTvSections();     
  
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
