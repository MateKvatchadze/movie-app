import "./MovieList.css";

function MovieList({ movies, onSelect }){
return(
<div className="moviesGrid">

      {movies.map((movie) =>(
      <div key={movie.id}
           onClick={() => onSelect(movie)}
           className="movieCard"
      >
        <div style={{display:"flex", gap:"20px", alignItems:"center"}}>
          <h3>{movie.title}</h3>
          <h4>{movie.release_date?.slice(0, 4)}</h4>
        </div>
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
      </div>
       ))
      }

</div>
)
}
export default MovieList