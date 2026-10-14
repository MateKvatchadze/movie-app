import MovieList from "../../components/MovieList/MovieList";
import useAnimeSections from "../../hooks/useAnimeSections";
import MovieListSkeleton from "../../components/MovieList/MovieListSkeleton";

function AnimePage(){
  const { trendingAnime, popularAnime, topRatedAnime, animeLoading } = useAnimeSections();
  return(
   <>
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
  )

}
export default AnimePage;