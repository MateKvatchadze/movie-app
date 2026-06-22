import MovieList from "../../components/MovieList/MovieList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import "./HomePage.css";

function HomePage({ trendingMovies, activeHeroMovie, isHeroFading, heroLogo }) {
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
        <MovieList movies={trendingMovies} variant="row" />
      </section>
    </>
  );
}
export default HomePage;