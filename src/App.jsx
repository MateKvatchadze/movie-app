import {useState, useEffect} from "react";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";


function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);

  const [heroIndex, setHeroIndex] = useState(0);



useEffect(() =>{
  
  if(trendingMovies.length ===  0) return;

  const intervalId = setInterval(() => {
      setHeroIndex((currentIndex) => {
        return (currentIndex + 1) % trendingMovies.length
      });    
  }, 3000);

  return () => clearInterval(intervalId);
},[trendingMovies])  


useEffect(() =>{

  async function fetchTrendingMovies() {
    const response = await fetch("/api/trending");
    const data = await response.json();
    setTrendingMovies(data.results);
    console.log(data.results);
    
  }

  fetchTrendingMovies();

},[]);  




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
    console.log(data);

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




useEffect(() => {
  if(!selectedMovie || !selectedMovie.id) return;
  
  const url = `/api/movie?id=${selectedMovie.id}`;

  async function fetchMovieDetails() {
    setDetailsLoading(true);
    setError("");
    try{
      const response = await fetch(url);
      const data = await response.json();

      if(data.error){
        setError(data.error);
        return;
      }
      console.log(data)
      setMovieDetails(data);
  } catch(err){
    console.log("Something went wrong", err)
    setError("Something went wrong");
  } finally{
    setDetailsLoading(false);
  }
}

fetchMovieDetails();
}, [selectedMovie])




const movieToShow = movieDetails || selectedMovie;

const activeHeroMovie = trendingMovies[heroIndex];


  return (
  <div className="app">

      <h1>Movies</h1>
      

    {selectedMovie ? (
      <MovieDetails movieToShow={movieToShow}
                    onBack={() =>{setSelectedMovie(null);
                                  setMovieDetails(null);
                                  setError("");}}
                    detailsLoading={detailsLoading}
      />
    ) : (
    <>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search Movie..."
      />
      
      <p>{query}</p>


      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}


      
      {!query.trim() ? (
        <MovieList movies={trendingMovies}
                   onSelect={(movie) =>{
                    setSelectedMovie(movie);
                    setMovieDetails(null);
                   }}/>
      ) : (
        <MovieList movies={movies} 
                   onSelect={(movie) =>{
                    setSelectedMovie(movie);
                    setMovieDetails(null);
                   }}
        />)
      }
      
      

      
    </>)
    }  
    
  </div>
  );
}
export default App
