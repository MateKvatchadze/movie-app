import { useParams, useNavigate } from "react-router-dom";
import useAnimeDetails from "../../hooks/useAnimeDetails";

function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { anime, animeDetailsLoading, animeDetailsError } = useAnimeDetails(id);

  if (animeDetailsLoading) return <p>Loading anime...</p>;
  if (animeDetailsError) return <p>{animeDetailsError}</p>;
  if (!anime) return <p>No anime found</p>;

  return (
    <>
      <button onClick={() => navigate(-1)}>⬅️</button>

      <h1>{anime.title}</h1>

      <p>{anime.release_date || "Unknown"}</p>

      {anime.genres?.length > 0 && (
        <p>{anime.genres.join(", ")}</p>
      )}

      {anime.poster_path && (
        <img
          className="moviePoster"
          src={anime.poster_path}
          alt={anime.title}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <p>{anime.description}</p>

      <p>Episodes: {anime.episodes || "Unknown"}</p>
      <p>Status: {anime.status || "Unknown"}</p>
      <p>Format: {anime.format || "Unknown"}</p>
      <p>Rating: {anime.vote_average || "N/A"}</p>
    </>
  );
}

export default AnimeDetailsPage;