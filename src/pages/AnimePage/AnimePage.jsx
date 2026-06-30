import MovieList from "../../components/MovieList/MovieList";

function AnimePage({ trendingAnime, popularAnime, topRatedAnime }){
  return(
   <>
   <section className="movieSection">
    <h2>Trending Anime</h2>
    <MovieList movies={trendingAnime} 
               variant="row"
    />
   </section>

   <section className="movieSection">
    <h2>Popul Anime</h2>
    <MovieList movies={popularAnime} 
               variant="row"
    />
   </section>   
   
   <section className="movieSection">
    <h2>Top Rated Anime</h2>
    <MovieList movies={topRatedAnime} 
               variant="row"
    />
   </section>      
   </> 
  )

}
export default AnimePage;