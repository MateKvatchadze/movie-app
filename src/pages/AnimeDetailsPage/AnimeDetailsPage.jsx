import { useParams, useNavigate } from "react-router-dom";
import useAnimeDetails from "../../hooks/useAnimeDetails";
import "../MovieDetailsPage/MovieDetailsPage.css";

function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { anime, animeDetailsLoading, animeDetailsError } = useAnimeDetails(id);

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

          <p className="detailsOverview">{anime.overview}</p>

          {anime.genres?.length > 0 && (
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
    </div>
  );
}

export default AnimeDetailsPage;