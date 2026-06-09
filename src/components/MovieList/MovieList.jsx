import "./MovieList.css";
import { Link } from "react-router-dom";


function MovieList({ movies }){
return(
<div className="moviesGrid">

  {movies.map((movie) =>(
  <Link 
    key={movie.id}
    to={`/movie/${movie.id}`}
    className="movieCard">
    
    <div className="posterBox">
      {movie.poster_path && (
        <img className="moviePoster"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
             e.currentTarget.style.display = "none"; 
            }}
        />
      )}
    </div>

    <div style={{display:"flex", gap:"20px", alignItems:"center"}}>
      <h3>{movie.title}</h3>
      <h4>{movie.release_date?.slice(0, 4)}</h4>
    </div>
        
  </Link>
   ))
  }

</div>
)
}
export default MovieList