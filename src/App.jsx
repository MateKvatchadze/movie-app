import {useState, useEffect} from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;


function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


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
      setLoading(false);
      
    }
    fetchMovies();
  }, 500)
  return () => clearTimeout(timeoutId);
},[query])




useEffect(() =>{

  if(!selectedMovie) return;
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovie.imdbID}`;

  async function fetchMovieDetails() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setMovieDetails(data);
  }
  fetchMovieDetails();
},[selectedMovie])
  


const movieToShow = movieDetails || selectedMovie;



  return (
    <div className="app">

      <h1>Movies</h1>

      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search Movie..."
      />
      
      <p>{query}</p>


    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}

    {selectedMovie ? (
      <div>
        <button 
          onClick={() => {
            setSelectedMovie(null);
            setMovieDetails(null);
          }}
        >⬅️
        </button>
        <h1>{movieToShow.Title}</h1>
        <p>{movieToShow.Year}</p>
        <p>{movieToShow.Plot}</p>
        <img src={movieToShow.Poster} alt="" />
        
      </div>
    ) : (
      movies.map((movie) =>(
      <div key={movie.imdbID}
           onClick={() => setSelectedMovie(movie)}
      >
        <div style={{display:"flex", gap:"20px", alignItems:"center"}}>
          <h3>{movie.Title}</h3>
          <h4>{movie.Year}</h4>
        </div>

        <img src={movie.Poster} alt="" />

      </div>


      ))
    )
    }
    
    </div>
  )
}
export default App
