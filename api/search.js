
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const trimmedQuery = query?.trim();

  if (!trimmedQuery) {
    return Response.json({
      results: [],
      error: "Query is required",
    });
  }

  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(trimmedQuery)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  const data = await response.json();

  function normalizeSearchResult(item) {
    return {
      id: item.id,
      media_type: item.media_type,
      title: item.media_type === "movie" ? item.title : item.name,
      poster_path: item.poster_path,
      release_date:
        item.media_type === "movie"
          ? item.release_date
          : item.first_air_date,
      overview: item.overview,
      vote_average: item.vote_average,
    };
  }  

  const results = data.results.filter(
    (item) => 
      item.media_type === "movie" ||
      item.media_type === "tv"
    ).map(normalizeSearchResult);

  return Response.json({results,});
}