import {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [heroIndex, setHeroIndex] = useState(0);


//hero

useEffect(() =>{
  
  if(trendingMovies.length ===  0) return;

  const intervalId = setInterval(() => {
      setHeroIndex((currentIndex) => {
        return (currentIndex + 1) % trendingMovies.length
      });    
  }, 5000);

  return () => clearInterval(intervalId);
},[trendingMovies]);  


//Trending Movies

useEffect(() =>{

  async function fetchTrendingMovies() {
    const response = await fetch("/api/trending");
    const data = await response.json();
    setTrendingMovies(data.results);
    
  }

  fetchTrendingMovies();

},[]);  



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

    <h1>Movies</h1>
      
    <nav>
      <Link to="/" >Home</Link>
      <Link to="/search">Search</Link>
    </nav>
    <Routes>
      <Route 
        path="/" 
        element={
          <HomePage 
            trendingMovies={trendingMovies}
            activeHeroMovie={activeHeroMovie}
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
    </Routes>
   
  </div>
);
}
export default App
