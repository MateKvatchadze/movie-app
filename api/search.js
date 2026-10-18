
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const trimmedQuery = query?.trim();

  const requestedType = searchParams.get("type") || "multi";

  const type = ["multi", "movie", "tv"].includes(requestedType)
    ? requestedType
    : "multi";

  if (!trimmedQuery) {
    return Response.json({
      results: [],
      error: "Query is required",
    });
  }

  const url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
    trimmedQuery
  )}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  if (!response.ok) {
    return Response.json(
      { results: [], error: "Failed to fetch search results from TMDB" },
      { status: response.status }
    );
  }

  const data = await response.json();

  function normalizeSearchResult(item) {
    const mediaType =
      item.media_type ||
      (type === "movie" ? "movie" : type === "tv" ? "tv" : undefined);

    return {
      id: item.id,
      media_type: mediaType,
      title: mediaType === "movie" ? item.title : item.name,
      poster_path: item.poster_path,
      release_date:
        mediaType === "movie" ? item.release_date : item.first_air_date,
      overview: item.overview,
      vote_average: item.vote_average,
    };
  }

  const results = data.results
    .filter((item) =>
      type === "multi"
        ? item.media_type === "movie" || item.media_type === "tv"
        : true
    )
    .map(normalizeSearchResult);

  return Response.json({ results });
}
