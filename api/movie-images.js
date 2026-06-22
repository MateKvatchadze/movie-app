export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if(!id) {
    return Response.json(
      { error: "Movie id is required" },
      { status: 400 }
    );
  }

  const url = `https://api.themoviedb.org/3/movie/${id}/images`;

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return Response.json(data);
}