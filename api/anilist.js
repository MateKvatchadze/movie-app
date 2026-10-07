const ANILIST_URL = "https://graphql.anilist.co";

const query = `
  query {
    trending: Page(page: 1, perPage: 20) {
      media(type: ANIME, sort: TRENDING_DESC) {
      ...AnimeFields       
      }
    }

    popular: Page(page: 1, perPage: 20) {
      media(type: ANIME, sort: POPULARITY_DESC) {
      ...AnimeFields            
      }
    }

    topRated: Page(page: 1, perPage: 20) {
      media(type: ANIME, sort: SCORE_DESC) { 
      ...AnimeFields          
      }
    }
  }
  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
    }
    coverImage {
      large
    }
    averageScore
    meanScore
    episodes
    format
    seasonYear
    relations {
      edges {
        relationType
        node {
          id
          format
          title {
            english
          }
        }
      }
    }
  }    
`;


const detailsQyery = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
      }
      trailer {
        id
        site
        thumbnail
      }        
      description
      coverImage {
        large
      }
      bannerImage
      averageScore
      episodes
      duration
      format
      status
      seasonYear
      genres
    }
  }  `;

function normalizeAnime(anime) {
  return {
    id: anime.id,
    title: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large,
    vote_average: anime.averageScore
      ? anime.averageScore / 10
      : anime.meanScore
      ? anime.meanScore / 10
      : null,
    mean_score: anime.meanScore ? anime.meanScore / 10 : null,
    release_date: anime.seasonYear ? String(anime.seasonYear) : "",
    episodes: anime.episodes,
    format: anime.format,
    media_type: "anime",
    relations: anime.relations,
  };
}

function normalizeAnimeDetails(anime) {
  return {
    id: anime.id,
    type: "anime",
    title: anime.title.english || anime.title.romaji,
    overview: anime.description,
    posterPath: anime.coverImage.large,
    backdropPath: anime.bannerImage,
    voteAverage: anime.averageScore ? anime.averageScore / 10 : null,
    episodes: anime.episodes,
    duration: anime.duration,
    format: anime.format,
    status: anime.status,
    releaseYear: anime.seasonYear ? String(anime.seasonYear) : "Unknown",
    genres: anime.genres || [],
    trailer: anime.trailer,
  };
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  try {
    if(id) {
      const response = await fetch(ANILIST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: detailsQyery,
          variables: {
            id: Number(id),
          },
        }),
      });

      const data = await response.json();

      if(!response.ok || data.errors) {
        return Response.json(
          { error:"Failed to fetch anime details from Anilist" },
          { status: 500 },
        );
      }
      return Response.json(normalizeAnimeDetails(data.data.Media));
    }

    const response = await fetch(ANILIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      return Response.json(
        { error: "Failed to fetch anime from AniList" },
        { status: 500 }
      );
    }
    
    return Response.json({
      trendingAnime: data.data.trending.media.map(normalizeAnime),
      popularAnime: data.data.popular.media.map(normalizeAnime),
      topRatedAnime: data.data.topRated.media.map(normalizeAnime),
    });
  } catch (error) {
    console.log("AniList API error:", error);

    return Response.json(
      { error: "Something went wrong while fetching anime" },
      { status: 500 }
    );
  }
}