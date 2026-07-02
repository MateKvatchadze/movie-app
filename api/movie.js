export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const type = searchParams.get("type") || "movie";

    if(!id){
        return Response.json({
            error: "Movie id is required",
        });
    }

    if (type !== "movie" && type !== "tv") {
      return Response.json(
        {
          error: "Invalid media type",
        },
        {
          status: 400,
        }
      );
    }

    
    const url = `https://api.themoviedb.org/3/${type}/${id}`;

    const options = {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        }
    }
    const response = await fetch(url, options)
    const data = await response.json();

    return Response.json(data);
}