import MovieList from "../../components/MovieList/MovieList";


function HomePage({ trendingMovies, activeHeroMovie, onSelect }) {
  return (
    <>
    {activeHeroMovie && (
        <div className="hero"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${activeHeroMovie.backdrop_path})`
            }}
        >
            <h2>{activeHeroMovie.title}</h2>
            <p>{activeHeroMovie.overview}</p>
        </div>
    )}

    <h2>Trending Movies</h2>
    
    <MovieList 
      movies={trendingMovies}
      onSelect={onSelect}/>
    </>
  );
}
export default HomePage;