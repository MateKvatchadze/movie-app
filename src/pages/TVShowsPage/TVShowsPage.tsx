import MovieList from "../../components/MovieList/MovieList";

import useTvSections from "../../hooks/useTvSections";
import MovieListSkeleton from "../../components/MovieList/MovieListSkeleton";

function TVShowsPage() {

  const { trendingTvShows, popularTvShows, topRatedTvShows, tvLoading} = useTvSections();     
  return (
  <>
    <section className="movieSection">
      <h2>Trending Shows</h2>
      {tvLoading ? (
        <MovieListSkeleton count={14} variant="row" />
      ) : (
        <MovieList movies={trendingTvShows } variant="row" />
      )}
    </section>       

    <section className="movieSection">
      <h2>Popular Shows</h2>
      {tvLoading ? (
        <MovieListSkeleton count={14} variant="row" />
      ) : (
        <MovieList movies={popularTvShows} variant="row" />
      )}
    </section>         

    <section className="movieSection">
      <h2>Top Rated Shows</h2>
      {tvLoading ? (
        <MovieListSkeleton count={14} variant="row" />
      ) : (
        <MovieList movies={topRatedTvShows} variant="row" />
      )}
    </section>          
    
  </>
  );
}

export default TVShowsPage;
