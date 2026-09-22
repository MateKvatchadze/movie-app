import "./MovieDetailsPage.css"; 

import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMediaDetails, mediaQueryKeys } from "../../api/mediaApi";


function MovieDetailsPage(){
  const { id } = useParams();
  const type = window.location.pathname.startsWith("/tv") ? "tv" : "movie";

  const {data, isLoading, error } = useQuery({
    queryKey: mediaQueryKeys.mediaDetails(type, id),
    queryFn: () => fetchMediaDetails(type, id),
    enabled: Boolean(id && type),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,    
  })

  
  const navigate = useNavigate()

  const movie = data;
  console.log(movie)
  if (isLoading) return <p>Loading movie...</p>;
  if (error) return <p>{error.message}</p>;
  if (!movie) return <p>No movie found</p>;

  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
  const minutes = movie.runtime ? movie.runtime % 60 : 0;

  
return (
<div className="detailsPage">
  <button className="backButton" onClick={() => navigate(-1)}>
    ⬅️ Back
  </button>

  <p className="detailsType">
    {movie.type === "tv" ? "TV Show" : "Movie"}
  </p>

  <section className="detailsHero">
    <div className="detailsPosterBox">
      {movie.posterPath && (
        <img
          className="detailsPoster"
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt={movie.title}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>

    <div className="detailsInfo">
      <h1>{movie.title}</h1>

      <p className="detailsMeta">
        {movie.releaseYear}
        {movie.runtime && ` • ${hours}h ${minutes}m`}
        {movie.seasons && ` • ${movie.seasons} seasons`}
      </p>

      <p className="detailsOverview">{movie.overview}</p>

      {movie.genres?.length > 0 && (
        <div className="genresList">
          {movie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      )}
    </div>
  </section>

  {movie.trailer && (
    <div className="trailerBox">
      <h2>Trailer</h2>

      <iframe
        src={`https://www.youtube.com/embed/${movie.trailer.key}`}
        title={movie.trailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )}
</div>
);
}
export default MovieDetailsPage;