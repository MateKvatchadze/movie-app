export async function GET() {
  const url = "https://api.themoviedb.org/3/trending/tv/week";

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return Response.json(data)
}