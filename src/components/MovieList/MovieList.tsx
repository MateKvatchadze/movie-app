import "./MovieList.css";
import { Link } from "react-router-dom";
import { useRef } from "react";

type MovieListProps = {
  movies: {
    id: number;
    title?: string;
    format?: string | undefined;
    media_type?: string | null | undefined;
    poster_path?: string | null | undefined;
    release_date?: string | null | undefined;
    name?: string;
    first_air_date?: string | undefined;
    vote_average?: number | null;
  }[] 
  variant:string;
}

function MovieList({ movies, variant="grid" }:MovieListProps){
  
  const rowRef = useRef<HTMLDivElement | null>(null);

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
    
    {movies.map((media) =>(
    <Link 
      key={media.id}
      to={`/${media.media_type || "movie"}/${media.id}`}
      className="movieCard"
    >
      
      <div className="posterBox">
        {media.vote_average !== null &&
          <span className="voteRating">⭐
            { media.vote_average?.toFixed(1)}
          </span>
        }

        {media.poster_path && (
          <img className="moviePoster"
              src={
                media.poster_path.startsWith("http")
                ? media.poster_path
                : `https://image.tmdb.org/t/p/w200${media.poster_path}`
              }
              alt={media.title}
              onError={(e) => {
              e.currentTarget.style.display = "none"; 
              }}
          />
        )}
      </div>

      <div className="movieCardInfo">
        <h3>{media.title || media.name}</h3>
        <h4>{media.release_date?.slice(0, 4) || media.first_air_date?.slice(0, 4)}</h4>
      </div>
          
    </Link>
    ))
    }

  </div>
</div>
)
}
export default MovieList