
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const requestedType = searchParams.get("type") || "multi";

  const typeMap = {
    multi: "all",
    movie: "movie",
    tv: "tv",
  };

const type = typeMap[requestedType] || "all";

  const pageOneUrl = `https://api.themoviedb.org/3/trending/${type}/day?page=1`;
  const pageTwoUrl = `https://api.themoviedb.org/3/trending/${type}/day?page=2`;
  const pageThreeUrl = `https://api.themoviedb.org/3/trending/${type}/day?page=3`;

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const [responseOne, responseTwo, responseThree] = await Promise.all([
    fetch(pageOneUrl, options),
    fetch(pageTwoUrl, options),
    fetch(pageThreeUrl, options),
  ]);

  if (!responseOne.ok || !responseTwo.ok || !responseThree.ok) {
    return Response.json(
      { results: [], error: "Failed to fetch trending results from TMDB" },
      { status: 502 }
    );
  }

  const [data1, data2, data3] = await Promise.all([
    responseOne.json(),
    responseTwo.json(),
    responseThree.json(),
  ]);

  const allResults = [
    ...data1.results,
    ...data2.results,
    ...data3.results,
  ];

  const uniqueResults = allResults.filter((item, index, array) => {
    return index === array.findIndex(
      (result) =>
        result.id === item.id &&
        result.media_type === item.media_type
    );
  });

  return Response.json({ results: uniqueResults });
}
