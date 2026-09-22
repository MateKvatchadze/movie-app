const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function addMediaType(items, mediaType) {
  return items.map((item) => ({
    ...item,
    media_type: mediaType,
  }));
}

export async function GET(request) {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "movie";
  const id = searchParams.get("id");

  if (type !== "movie" && type !== "tv") {
    return Response.json(
      { error: "Invalid media type" },
      { status: 400 }
    );
  }

  try {
    if (id) {
      const response = await fetch(`${TMDB_BASE_URL}/${type}/${id}?append_to_response=videos`, options);
      const data = await response.json();

      if (!response.ok || data.error || data.status_message) {
        return Response.json(
          {
            error:
              data.error ||
              data.status_message ||
              `Failed to fetch ${type} details`,
          },
          { status: response.status || 500 }
        );
      }

      return Response.json(data);
    }

    const trendingUrl = `${TMDB_BASE_URL}/trending/${type}/week`;
    const popularUrl = `${TMDB_BASE_URL}/${type}/popular`;
    const topRatedUrl = `${TMDB_BASE_URL}/${type}/top_rated`;

    const [trendingResponse, popularResponse, topRatedResponse] =
      await Promise.all([
        fetch(trendingUrl, options),
        fetch(popularUrl, options),
        fetch(topRatedUrl, options),
      ]);

    if (
      !trendingResponse.ok ||
      !popularResponse.ok ||
      !topRatedResponse.ok
    ) {
      return Response.json(
        { error: "Failed to fetch TMDB sections" },
        { status: 500 }
      );
    }

    const [trendingData, popularData, topRatedData] = await Promise.all([
      trendingResponse.json(),
      popularResponse.json(),
      topRatedResponse.json(),
    ]);

    return Response.json({
      trending: addMediaType(trendingData.results, type),
      popular: addMediaType(popularData.results, type),
      topRated: addMediaType(topRatedData.results, type),
    });
  } catch (error) {
    console.log("TMDB API error:", error);

    return Response.json(
      { error: "Something went wrong while fetching TMDB data" },
      { status: 500 }
    );
  }
}