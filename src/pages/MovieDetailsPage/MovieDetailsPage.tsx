import "./MovieDetailsPage.css";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMediaDetails, mediaQueryKeys } from "../../api/mediaApi";
import DetailsPageSkeleton from "./DetailspageSkeleton";

function MovieDetailsPage() {
  const { id } = useParams();
  const type = window.location.pathname.startsWith("/tv") ? "tv" : "movie";
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: mediaQueryKeys.mediaDetails(type, id!),
    queryFn: () => fetchMediaDetails(type, id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

if (isLoading) return <DetailsPageSkeleton />;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No details found.</p>;

  const media = data;
  const isTV = media.type === "tv";
  const runtime = media.runtime
    ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
    : null;

  return (
    <div className="detailsPage">
      <button
        className="backButton"
        type="button"
        onClick={() => navigate(-1)}
      >
        <span aria-hidden="true">←</span>
        <span>Back</span>
      </button>

      <section className="detailsHero">
        {media.backdropPath && (
          <div className="detailsBackdrop" aria-hidden="true">
            <img
              src={`https://image.tmdb.org/t/p/w1280${media.backdropPath}`}
              alt=""
            />
          </div>
        )}

        <div className="detailsPosterBox">
          {media.posterPath && (
            <img
              className="detailsPoster"
              src={`https://image.tmdb.org/t/p/w500${media.posterPath}`}
              alt={`${media.title} poster`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        <div className="detailsInfo">
          <h1>{media.title}</h1>

          <div className="detailsBadges">
            {media.voteAverage != null && media.voteAverage > 0 && (
              <span className="detailsRating">
                <span aria-hidden="true">★</span>
                {media.voteAverage.toFixed(1)}
                <span className="detailsRatingLabel">/ 10</span>
              </span>
            )}

            {media.releaseYear && (
              <span className="detailsBadge">{media.releaseYear}</span>
            )}

            {runtime && (
              <span className="detailsBadge">{runtime}</span>
            )}

            {isTV && media.seasons != null && (
              <span className="detailsBadge">
                {media.seasons} {media.seasons === 1 ? "Season" : "Seasons"}
              </span>
            )}
          </div>

          {media.genres?.length > 0 && (
            <div className="genresList">
              <span>{isTV ? "TV Series" : "Movie"}</span>
              {media.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}              
            </div>
          )}

          <div className="detailsOverviewSection">
            <h2>Overview</h2>
            <p className="detailsOverview">
              {media.overview || "No overview is available for this title."}
            </p>
          </div>
        </div>
      </section>

      {media.trailer && (
        <section className="trailerBox">
          <h2>Official Trailer</h2>
          <div className="trailerFrame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${media.trailer.key}`}
              title={media.trailer.name || `${media.title} trailer`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default MovieDetailsPage;