
function MovieDetails({ onBack, movieToShow, detailsLoading}) {
  const hours = Math.floor(movieToShow.runtime / 60);
  const minutes = movieToShow.runtime % 60;
return(
<div>
    <button 
     onClick={onBack}
     >⬅️
    </button>

        {detailsLoading && <p>Loading details...</p>}
        <h1>{movieToShow.title}</h1>
        <p>Release: {movieToShow.release_date?.slice(0, 4) || "Unknown"}</p>
        <p>{movieToShow.overview}</p>
        {movieToShow.runtime && (
          <p>Runtime: {hours}h {minutes}m</p>)
        }
        


        <div className="posterBox">
          {movieToShow.poster_path && (
            <img className="moviePoster"
                src={`https://image.tmdb.org/t/p/w300${movieToShow.poster_path}`}
                alt={movieToShow.title}
                onError={(e) => {
                 e.currentTarget.style.display = "none"; 
                }}
            />
          )}
        </div>
</div>   
)
}
export default MovieDetails;