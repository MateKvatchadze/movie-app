import "./HomePage.css";
import MovieList from "../../components/MovieList/MovieList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";

import useMovieSections from "../../hooks/useMovieSections";
import useTvSections from "../../hooks/useTvSections";
import useAnimeSections from "../../hooks/useAnimeSections";

import usePrefetchMediaSections from "../../hooks/usePrefetchMediaSections";
import MovieListSkeleton from "../../components/MovieList/MovieListSkeleton";
import type { MovieSection } from "../../api/mediaApi";


type HomePageProps = {
  activeHeroMovie: MovieSection;
  isHeroFading: boolean;
  heroLogo: string;
}
function HomePage({ activeHeroMovie, isHeroFading, heroLogo } :HomePageProps){
  usePrefetchMediaSections();
  
  const {  
    trendingMovies, 
    popularMovies, 
    topRatedMovies,
    moviesLoading,  
  } = useMovieSections();console.log("MOVIESS", trendingMovies);

  const { 
    trendingTvShows, 
    popularTvShows, 
    topRatedTvShows, 
    tvLoading,  
  } = useTvSections();   

  const { 
    trendingAnime, 
    popularAnime, 
    topRatedAnime,
    animeLoading,   
  } = useAnimeSections();   
  
  
  return (
    <>
    <HeroBanner 
      movie={activeHeroMovie}
      isHeroFading={isHeroFading}
      heroLogo={heroLogo}
    />

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



      <section className="movieSection">
        <h2>Trending Anime</h2>
        {animeLoading ? (
          <MovieListSkeleton count={14} variant="row" />
        ) : (
          <MovieList movies={trendingAnime } variant="row" />
        )}
      </section>

      <section className="movieSection">
        <h2>Popul Anime</h2>
        {animeLoading ? (
          <MovieListSkeleton count={14} variant="row" />
        ) : (
          <MovieList movies={popularAnime} variant="row" />
        )}
      </section>   
      
      <section className="movieSection">
        <h2>Top Rated Anime</h2>
        {animeLoading ? (
          <MovieListSkeleton count={14} variant="row" />
        ) : (
          <MovieList movies={topRatedAnime} variant="row" />
        )}
      </section>      
    </>
  );
}
export default HomePage;