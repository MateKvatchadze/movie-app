import "./HomePage.css";
import MovieList from "../../components/MovieList/MovieList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";

import useMovieSections from "../../hooks/useMovieSections";
import useTvSections from "../../hooks/useTvSections";

function HomePage({ activeHeroMovie, isHeroFading, heroLogo }){

  const { trendingMovies, popularMovies, topRatedMovies } = useMovieSections();
  const { trendingTvShows, popularTvShows, topRatedTvShows } = useTvSections();                
  return (
    <>
    <HeroBanner 
      movie={activeHeroMovie}
      isHeroFading={isHeroFading}
      heroLogo={heroLogo}
    />

      <section className="movieSection">
        <h2>Trending Movies</h2>
        <MovieList movies={trendingMovies} variant="row" />
      </section>

      <section className="movieSection">
        <h2>Popular Movies</h2>
        <MovieList movies={popularMovies} variant="row" />
      </section>

      <section className="movieSection">
        <h2>Top Rated Movies</h2>
        <MovieList movies={topRatedMovies} variant="row" />
      </section>   

      <section className="movieSection">
        <h2>Trending Shows</h2>
        <MovieList movies={trendingTvShows} variant="row" />
      </section>       

      <section className="movieSection">
        <h2>Popular Shows</h2>
        <MovieList movies={popularTvShows} variant="row" />
      </section>         

      <section className="movieSection">
        <h2>Top Rated Shows</h2>
        <MovieList movies={topRatedTvShows} variant="row" />
      </section>           
    </>
  );
}
export default HomePage;