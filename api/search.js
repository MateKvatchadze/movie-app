
export async function GET(request) {
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    
    const trimmedQuery = query?.trim();

    if(!trimmedQuery) {
        return Response.json({
            results: [],
            error: "Query is required",
        });
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(trimmedQuery)}`;

    const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    });
    
    const data = await response.json();

    return Response.json(data);
}