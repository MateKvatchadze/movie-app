export async function GET() {
  const url = "https://api.themoviedb.org/3/discover/tv?with_genres=16&with_origin_country=JP&sort_by=vote_average.desc&vote_count.gte=300&page=1"

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return Response.json(data);
}