import MovieList from "../../components/MovieList/MovieList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";

function HomePage({ trendingMovies, activeHeroMovie, onSelect }) {
  return (
    <>   
    <HeroBanner movie={activeHeroMovie}/>

    <h2>Trending Movies</h2>
    
    <MovieList 
      movies={trendingMovies}
      onSelect={onSelect}/>
    </>
  );
}
export default HomePage;