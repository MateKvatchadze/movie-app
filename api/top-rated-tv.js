export async function GET() {
const url = "https://api.themoviedb.org/3/tv/top_rated?page=1";
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return Response.json(data)
}