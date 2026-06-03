import {useState, useEffect} from "react";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;


function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);

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
   const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${trimmedQuery}`;

   async function fetchMovies() {
   try{       
    const response  = await fetch(url);
    const data = await response.json();
    console.log(data);

    if(data.Response === "False"){
      setMovies([]);
      setError(data.Error);
      setLoading(false);
      return;
    }
    setMovies(data.Search);
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




useEffect(() =>{

  if(!selectedMovie) return;
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovie.imdbID}`;

  async function fetchMovieDetails() {
    setDetailsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if(data.Response === "False"){
        setError(data.Error);
        return
      }

      console.log(data);
      setMovieDetails(data);
    } catch(err){
      console.log("Something went wrong:", err);   
      setError("Something went wrong"); 
    } finally {
      setDetailsLoading(false);
    }
}
  fetchMovieDetails();
},[selectedMovie])
  


const movieToShow = movieDetails || selectedMovie;



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

      <MovieList movies={movies}
                 onSelect={setSelectedMovie}
      />
      
    </>

     )
    }  
  </div>
  );
}
export default App
