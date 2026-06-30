export async function GET() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  let anime = [];
  let page = 1;

  while (anime.length < 20 && page <= 10) {
    const response = await fetch(
     `https://api.themoviedb.org/3/trending/tv/week?page=${page}`, options    
    );

    const data = await response.json();

    const filtered = data.results.filter((show) => {
      return (
        show.genre_ids.includes(16) &&
        show.origin_country.includes("JP")
      );
    });

    anime.push(...filtered);

    anime = anime.filter(
      (show, index, self) =>
        index === self.findIndex(item => item.id === show.id)
    );

    page++;
  }

  anime = anime.slice(0, 20);

  console.log(anime.map(show => show.name));
  
  return Response.json({
    results: anime,
  });
}