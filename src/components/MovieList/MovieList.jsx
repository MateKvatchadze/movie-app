import "./MovieList.css";

function MovieList({ movies, onSelect }){
return(
<div className="moviesGrid">

      {movies.map((movie) =>(
      <div key={movie.imdbID}
           onClick={() => onselect(movie)}
           className="movieCard"
      >
        <div style={{display:"flex", gap:"20px", alignItems:"center"}}>
          <h3>{movie.Title}</h3>
          <h4>{movie.Year}</h4>
        </div>
        <div className="posterBox">
          {movie.Poster !== "N/A" && (
            <img className="moviePoster"
                src={movie.Poster}
                alt={movie.Title}
                onError={(e) => {
                 e.currentTarget.style.display = "none"; 
                }}
            />
          )}
        </div>
      </div>
       ))
      }

</div>
)
}
export default MovieList