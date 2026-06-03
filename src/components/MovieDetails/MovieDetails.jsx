
function MovieDetails({ onBack, movieToShow, detailsLoading}) {
return(
<div>
    <button 
     onClick={onBack}
     >⬅️
    </button>

        {detailsLoading && <p>Loading details...</p>}
        <h1>{movieToShow.Title}</h1>
        <p>{movieToShow.Year}</p>
        <p>{movieToShow.Plot}</p>

        <div className="posterBox">
          {movieToShow.Poster !== "N/A" && (
            <img className="moviePoster"
                src={movieToShow.Poster}
                alt={movieToShow.Title}
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