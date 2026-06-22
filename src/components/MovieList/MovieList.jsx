import "./MovieList.css";
import { Link } from "react-router-dom";
import { useRef } from "react";

function MovieList({ movies, variant="grid" }){
  
  const rowRef = useRef(null);

  function getScrollAmount() {
    if (!rowRef.current) return 0;

    return rowRef.current.clientWidth;
  }
  function scrollLeft() {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: -getScrollAmount() -200,
      behavior: "smooth",
    })
  }

  function scrollRight() {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: getScrollAmount() -200,
      behavior: "smooth",
    })
  }

return(
<div className="movieListWrapper">
  {variant === "row" && ( 
    <div className="rowControls">
      <button className="rowButton" onClick={scrollLeft}>
        ⬅️
      </button>

      <button className="rowButton" onClick={scrollRight}>
        ➡️
      </button>
    </div>
  )}

  <div className={variant === "row" ? "moviesRow" : "moviesGrid"}
      ref={variant === "row" ? rowRef : null} 
  >
    
    {movies.map((movie) =>(
    <Link 
      key={movie.id}
      to={`/movie/${movie.id}`}
      className="movieCard"
    >
      
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
</div>
)
}
export default MovieList