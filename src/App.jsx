import {useState, useEffect} from "react";
import { Routes, Route, } from "react-router-dom";
import { heroLogoPath } from "./components/HeroBanner/heroLogoPath";

import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import BrowsePage from "./pages/BrowsePage/BrowsePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage/TVShowsPage";
import AnimePage from "./pages/AnimePage/AnimePage";
import CreditsPage from "./pages/CreditsPage/CreditsPage";
import Sidebar from "./components/Sidebar/Sidebar";


import useTrendingMovies from "./hooks/useTrendingMovies";
import usePopularMovies from "./hooks/usePopularMovies";
import useTopRatedMovies from "./hooks/useTopRatedMovies";
import useTrendingTvShows from "./hooks/useTrendingTvShows";
import usePopularTvShows from "./hooks/usePopularTvShows";
import useTopRatedTvShows from "./hooks/useTopRatedTvShows";
import useTrendingAnime from "./hooks/useTrendingAnime";
import usePopularAnime from "./hooks/usePopularAnime";
import useTopRatedAnime from "./hooks/useTopRatedAnime";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroFading, setIsHeroFading] = useState(false);
  const [heroLogo, setHeroLogo] = useState("");

//hooks
 //movies
  const { trendingMovies, trendingLoading, trendingError } = useTrendingMovies();
  const { popularMovies, popularLoading, popularError } = usePopularMovies();
  const { topRatedMovies, topRatedLoading, topRatedError } = useTopRatedMovies();
 //Tv Shows
  const { trendingTvShows, trendingTvLoading, trendingTvError } = useTrendingTvShows();
  const { popularTvShows, popularTvLoading, popularTvError } = usePopularTvShows();
  const { topRatedTvShows, topRatedTvLoading, topRatedTvError } = useTopRatedTvShows();
 //Anime
  const { trendingAnime, trendingAnimeLoading, trendingAnimeError } = useTrendingAnime();
  const { popularAnime, popularAnimeLoading, popularAnimeError } = usePopularAnime();
  const { topRatedAnime, topRatedAnimeLoading, topRatedAnimeError } = useTopRatedAnime();


//hero
useEffect(() =>{
  let isCancelled = false;
  
  if(trendingMovies.length ===  0) return;
  
  async function loadFirstLogo() {
    if(heroIndex === 0){
      const firstHeroLogo = await heroLogoPath(trendingMovies[heroIndex].id)

      if(!isCancelled){
        setHeroLogo(firstHeroLogo);
      }
    }
   
  }
  loadFirstLogo();


  const timeoutId = setTimeout(async () => {
        const nextIndex =  (heroIndex + 1) % trendingMovies.length;
        const nextMovie = trendingMovies[nextIndex];
        
        const nextHeroLogo = await heroLogoPath(nextMovie.id);


        if(!nextMovie?.backdrop_path){
          setHeroLogo(nextHeroLogo);
          setHeroIndex(nextIndex);
          return;
        }
        
        const image = new Image();

        image.onload = () => {
          if (!isCancelled) {
            setIsHeroFading(true);

            setTimeout(() =>{
              setHeroLogo(nextHeroLogo);
              setHeroIndex(nextIndex);
              setIsHeroFading(false);
            }, 250);      
          }
        };

        image.onerror = () => {
          if (!isCancelled) {
            setIsHeroFading(true);

            setTimeout(() =>{
              setHeroLogo(nextHeroLogo);
              setHeroIndex(nextIndex);
              setIsHeroFading(false);
            }, 250);      
          }
        };

        image.src = `https://image.tmdb.org/t/p/original${nextMovie.backdrop_path}`;    
  }, 4500);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
},[trendingMovies, heroIndex]);  



//Search

useEffect(() =>{
 
  const trimmedQuery = query.trim();

  if(!trimmedQuery){
    setMovies([]);
    setError("");
    setLoading(false);
    return;
  }
  setLoading(true);
  setError("");
  const timeoutId = setTimeout(() => {
  const url = `/api/search?query=${encodeURIComponent(trimmedQuery)}`;

  async function fetchMovies() {
   try{       
    const response  = await fetch(url);
    const data = await response.json();

    if(data.results.length === 0){
      setMovies([]);
      setError("No movies found");
      setLoading(false);
      return;
    }
    setMovies(data.results);
   } catch(err) {

    console.log("Something went wrong:", err);
    setMovies([]);
    setError("Something went wrong");

   } finally {
    setLoading(false);
    }        
   }
    fetchMovies();
  }, 500)
  return () => clearTimeout(timeoutId);
},[query])



const activeHeroMovie = trendingMovies[heroIndex];


return (
  <div className="app">
     
    <Sidebar />
    
  <main className="mainContent">
    <Routes>
      <Route 
        path="/" 
        element={
          <HomePage 
            trendingMovies={trendingMovies}
            activeHeroMovie={activeHeroMovie}
            isHeroFading={isHeroFading}
            heroLogo={heroLogo}
            popularMovies={popularMovies}
            topRatedMovies={topRatedMovies}

            trendingTvShows={trendingTvShows}
            popularTvShows={popularTvShows}
            topRatedTvShows={topRatedTvShows}
          />
        } 
      />

      <Route path="/search"
             element={
             <SearchPage
                query={query}
                setQuery={setQuery}
                movies={movies}
                loading={loading}
                error={error}
                trendingMovies={trendingMovies}
              />} 
      />

              
      <Route path="/movie/:id"
             element={
              <MovieDetailsPage />
             }
      />         

      <Route path="/browse" element={<BrowsePage />} />

      <Route path="/movies" 
             element={
              <MoviesPage 
                trendingMovies={trendingMovies}
                popularMovies={popularMovies}
                topRatedMovies={topRatedMovies}
                />} 
      />

      <Route path="/tv" 
             element={
              <TVShowsPage 
                trendingTvShows={trendingTvShows}
                popularTvShows={popularTvShows}
                topRatedTvShows={topRatedTvShows}
              />} 
      />

      <Route path="/anime"
             element={
              <AnimePage 
                trendingAnime={trendingAnime}
                popularAnime={popularAnime}
                topRatedAnime={topRatedAnime}
              />}
      />
      
      <Route path="/credits" element={<CreditsPage />} />     
         
    </Routes>
   </main>
  </div>
);
}
export default App
