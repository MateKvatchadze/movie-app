import { useParams, useNavigate } from "react-router-dom";
import useAnimeDetails from "../../hooks/useAnimeDetails";
import "../MovieDetailsPage/MovieDetailsPage.css";
import DOMPurify from "dompurify";

function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { anime, animeDetailsLoading, animeDetailsError } = useAnimeDetails(id);
  console.log("ANIMEDETAILS::",anime)
  if (animeDetailsLoading) return <p>Loading anime...</p>;
  if (animeDetailsError) return <p>{animeDetailsError}</p>;
  if (!anime) return <p>No anime found</p>;

  return (
    <div className="detailsPage">
      <button className="backButton" onClick={() => navigate(-1)}>
        ⬅️ Back
      </button>

      <p className="detailsType">Anime</p>

      <section className="detailsHero">
        <div className="detailsPosterBox">
          {anime.posterPath && (
            <img
              className="detailsPoster"
              src={anime.posterPath}
              alt={anime.title}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        <div className="detailsInfo">
          <h1>{anime.title}</h1>

          <p className="detailsMeta">
            {anime.releaseYear}
            {anime.episodes && ` • ${anime.episodes} episodes`}
            {anime.duration && ` • ${anime.duration} min/ep`}
          </p>

          <div className="detailsOverview"
             dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(anime.overview),
             }}
          ></div>

          {anime.genres && anime.genres.length > 0 && (
            <div className="genresList">
              {anime.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
          )}

          <p>Status: {anime.status || "Unknown"}</p>
          <p>Format: {anime.format || "Unknown"}</p>
          <p>Rating: {anime.voteAverage || "N/A"}</p>
        </div>
      </section>

      {anime.trailer?.site === "youtube" && (
        <div className="trailerBox">
          <h2>Trailer</h2>

          <iframe
            src={`https://www.youtube-nocookie.com/embed/${anime.trailer.id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {anime.trailer?.site === "dailymotion" && (
        <div className="trailerBox">
          <h2>Trailer</h2>

          <iframe
            src={`https://geo.dailymotion.com/player.html?video=${anime.trailer.id}`}
            allow="fullscreen; autoplay"
            allowFullScreen
          />
        </div>
      )}    
    </div>
  );
}

export default AnimeDetailsPage;