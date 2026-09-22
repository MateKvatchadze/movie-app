function getTrailer(videos) {
  if (!videos?.results?.length) return null;

  const officialTrailer = videos.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  );

  const fallbackTrailer = videos.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  const selectedTrailer = officialTrailer || fallbackTrailer;

  if (!selectedTrailer) return null;

  return {
    key: selectedTrailer.key,
    name: selectedTrailer.name,
  };
}

function normalizeMediaDetails(media, type) {
  return {
    id: media.id,
    type,
    title: media.title || media.name,
    overview: media.overview,
    posterPath: media.poster_path,
    backdropPath: media.backdrop_path,
    releaseYear:
      media.release_date?.slice(0, 4) ||
      media.first_air_date?.slice(0, 4) ||
      "Unknown",
    runtime: media.runtime || null,
    seasons: media.number_of_seasons || null,
    voteAverage: media.vote_average,
    genres: media.genres || [],
    trailer: getTrailer(media.videos),
  };
}

export const mediaQueryKeys = {
  movieSections: ["movieSections"],
  tvSections: ["tvSections"],
  animeSections: ["animeSections"],
  animeDetails: (id) => ["animeDetails", id],
  mediaDetails: (type, id) => ["mediaDetails", type, id],
};

export async function fetchMovieSections() {
  const response = await fetch("/api/tmdb?type=movie");
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch movies");
  }

  return data;
}

export async function fetchTvSections() {
  const response = await fetch("/api/tmdb?type=tv");
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch TV shows");
  }

  return data;
}

export async function fetchAnimeSections() {
  const response = await fetch("/api/anilist");
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch anime");
  }

  return data;
}

export async function fetchAnimeDetails(id) {
  const response = await fetch(`/api/anilist?id=${id}`);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch anime details");
  }

  return data;
}

export async function fetchMediaDetails(type, id) {
  const response = await fetch(`/api/tmdb?type=${type || "movie"}&id=${id}`);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch media details");
  }

  return normalizeMediaDetails(data, type);
}

