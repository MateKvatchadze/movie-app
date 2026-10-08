import { number, z } from "zod";

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const VideoSchema = z.object({
  site: z.string(),
  type: z.string(),
  official: z.boolean().optional(),
  key: z.string(),
  name: z.string(),
})

const VideosSchema = z.object({
  results: z.array(VideoSchema),
});

type Videos = z.infer<typeof VideosSchema>

function getTrailer(videos?: Videos) {
  if (!videos?.results?.length) return null;
  const officialTrailer = videos.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  );

  const fallbackTrailer = videos.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  const selectedTrailer = officialTrailer || fallbackTrailer;

  if (!selectedTrailer) return null;

  return {
    key: selectedTrailer.key,
    name: selectedTrailer.name,
  };
}

const CommonMediaSchema = z.object({
  id: z.number(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  genres: z.array(GenreSchema).optional(),
  videos: VideosSchema.optional(),
  runtime: z.number().optional(),
  number_of_seasons: z.number().optional(),
  number_of_episodes: z.number().optional(),
})


const MovieSchema = CommonMediaSchema.extend({
  title: z.string(),
  release_date: z.string(),
})



const SeriesSchema = CommonMediaSchema.extend({
  name: z.string(),
  first_air_date: z.string(),
});

const MediaSchema = z.union([MovieSchema, SeriesSchema]);



type Media = z.infer<typeof MediaSchema>;

type MediaType = "movie" | "tv"
type Id = string;

function normalizeMediaDetails(media: Media, type: MediaType) {
  return {
    id: media.id,
    type,
    title: "title" in media ? media.title : media.name,
    releaseYear:
      ("release_date" in media
        ? media.release_date?.slice(0, 4)
        : media.first_air_date?.slice(0, 4)) || "Unknown",

    overview: media.overview,
    posterPath: media.poster_path,
    backdropPath: media.backdrop_path,
    runtime: media.runtime ?? null,
    seasons: media.number_of_seasons ?? null,
    episodes: media.number_of_episodes ?? null,
    voteAverage: media.vote_average,
    genres: media.genres || [],
    trailer: getTrailer(media.videos),
  };
}



export const mediaQueryKeys = {
  movieSections: ["movieSections"],
  tvSections: ["tvSections"],
  animeSections: ["animeSections"],
  animeDetails: (id: string | undefined) => ["animeDetails", id],
  mediaDetails: (type: MediaType, id: Id) => ["mediaDetails", type, id],
};

const MovieSectionSchema = z.object({
  id: z.number(),
  media_type: z.string(),
  poster_path: z.string().optional(),
  release_date: z.string().optional(),
  title: z.string(),  
  overview: z.string().optional(),
  vote_average: z.number().nullish(),
});
export type MovieSection =  z.infer<typeof MovieSectionSchema>;

const MovieSectionsSchema = z.object({
  popular: z.array(MovieSectionSchema),
  topRated: z.array(MovieSectionSchema),
  trending: z.array(MovieSectionSchema),
});


export async function fetchMovieSections() {
  const response = await fetch("/api/tmdb?type=movie");
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch movies");
  }

  const result = MovieSectionsSchema.safeParse(data);
  
  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid Movie section data from API");
  }
  return result.data;
}



const TvSectionSchema = z.object({
  id: z.number(),
  media_type: z.string(),
  poster_path: z.string().optional(),
  first_air_date: z.string().optional(),
  name: z.string(),  
  vote_average: z.number().nullish(),
  number_of_seasons: z.number().optional(),
  number_of_episodes: z.number().optional(),
});

const TvSectionsSchema = z.object({
  popular: z.array(TvSectionSchema),
  topRated: z.array(TvSectionSchema),
  trending: z.array(TvSectionSchema),
});

export async function fetchTvSections() {
  const response = await fetch("/api/tmdb?type=tv");
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch TV shows");
  }

  const result = TvSectionsSchema.safeParse(data);

  if(!result.success){
    console.error(result.error);
    throw new Error("Invalid TV section data from API");
  }
  return result.data;
}



const AnimeRelationSchema = z.object({
  relationType: z.string(),
  node: z.object({
    id: z.number(),
    format: z.string().nullish(),
    title: z.object({
      english: z.string().nullish(),
    }),
  }),
});
const AnimeRelationsSchema = z.object({
  edges: z.array(AnimeRelationSchema),
});

const AnimeSectionSchema = z.object({
  format: z.string().optional(),
  id: z.number(),
  media_type: z.string(),
  poster_path: z.string().optional(),
  release_date: z.string().optional(),
  title: z.string(),
  vote_average: z.number().nullish(),
  relations: AnimeRelationsSchema.nullish(),
});

const AnimeSectionsSchema = z.object({
  trendingAnime: z.array(AnimeSectionSchema),
  popularAnime: z.array(AnimeSectionSchema),
  topRatedAnime: z.array(AnimeSectionSchema),
});

export async function fetchAnimeSections() {
  const response = await fetch("/api/anilist");
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch anime");
  }
  const result = AnimeSectionsSchema.safeParse(data);

  if(!result.success){
    console.error(result.error.issues);
    throw new Error("Invalid Anime section data from API");
  }
  return result.data;
}

const TrailerSchema = z.object({
  id: z.string(),
  site: z.enum(["youtube", "dailymotion"]),
  thumbnail: z.string(),
});

const AnimeSchema = z.object({
  posterPath: z.string().nullish(),
  title: z.string(),
  releaseYear: z.string(),
  episodes:  z.number().nullish(),
  duration:  z.number().nullish(),
  overview: z.string(), 
  genres: z.array(z.string()).nullish(),
  status: z.string().nullish(),
  format: z.string().nullish(),
  voteAverage: z.number().nullish(), 
  trailer: TrailerSchema.nullish(),
}).loose();

export async function fetchAnimeDetails(id: Id) {
  const response = await fetch(`/api/anilist?id=${id}`);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch anime details");
  }

  const result = AnimeSchema.safeParse(data);

  if(!result.success){
    console.error(result.error.issues);
    throw new Error("Invalid Anime data from API");
  }

  return result.data;
}

export async function fetchMediaDetails(type: MediaType, id: Id) {
  const response = await fetch(`/api/tmdb?type=${type || "movie"}&id=${id}`);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch media details");
  }

  const result = MediaSchema.safeParse(data);  
  
  if(!result.success) {
    console.error(result.error);
    throw new Error("Invalid media data from API");
  }

  return normalizeMediaDetails(result.data, type);
}


