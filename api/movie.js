
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if(!id){
        return Response.json({
            error: "Movie id is required",
        });
    }

    const url = `https://api.themoviedb.org/3/movie/${id}`;

    const options = {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        }
    }
    const response = await fetch(url, options)
    const data = await response.json();

    return Response.json(data);
}