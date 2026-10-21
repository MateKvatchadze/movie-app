# CineVault

**Discover your next watch across movies, TV shows, and anime.**

CineVault is a responsive media discovery platform that brings movie and television catalogs from TMDB together with anime data from AniList in one interface.

Explore trending titles, browse popular and top-rated collections, search across movies and TV shows, and dive into dedicated detail pages with ratings, metadata, and trailers when available.

**[Live Demo](https://movie-app-five-sigma-57.vercel.app) · [Source Code](https://github.com/MateKvatchadze/movie-app)**

## Features

### Discover
- **Three media catalogs:** movies, TV shows, and anime in one application.
- **Trending, Popular, and Top Rated collections:** separate discovery sections for each media category.
- **Dynamic Hero Banner:** rotating movie highlights with artwork and logo assets retrieved from TMDB.
- **Responsive interface:** dark-themed design, adaptive navigation, poster grids, and horizontally scrollable media rows.

### Search & Explore
- **Search movies and TV shows:** switch between All, Movies, and TV Shows.
- **Trending discovery:** browse trending titles even before entering a search query.
- **URL-based filter state:** media-type selection is reflected in search parameters.
- **Dedicated detail pages:** inspect available metadata without leaving the application.

### Media Details
- **Movies and TV shows:** ratings, release year, genres, overview, runtime where available, and TV season information.
- **Trailers:** embedded YouTube trailers when available from TMDB.
- **Anime details:** descriptions, ratings, formats, release information, episode information, genres, and trailers.
- **Multiple trailer providers:** anime trailers can be displayed through YouTube or Dailymotion when supported by the source data.
- **Loading states:** skeleton components maintain the page layout while key collections and detail data load.

## Tech Stack

| Technology | Role in CineVault |
|---|---|
| React | Component-based UI and interactive pages |
| TypeScript | Typed components, hooks, and data handling |
| Vite | Development server and production build |
| React Router | Client-side navigation and dynamic detail routes |
| TanStack Query | Server-state management, caching, and prefetching |
| Zod | Runtime validation of API response data |
| TMDB REST API | Movie and TV metadata, trends, images, and trailers |
| AniList GraphQL API | Anime catalogs and detailed anime metadata |
| Vercel Functions | Server-side API endpoints |
| DOMPurify | Sanitization of HTML descriptions before rendering |
| React Icons | Interface icons |
| CSS | Responsive layouts, component styling, and visual effects |
| ESLint | Code-quality checks |

The application uses TypeScript for much of its UI and data layer while retaining JavaScript modules in selected entry points and API handlers.

## Engineering Highlights

### 1. Separate API and UI responsibilities

The frontend requests data through API endpoints under `/api`. Vercel Functions handle upstream API requests, while React components and custom hooks focus on presentation, interaction, and query state.

TMDB requests use the server-side `TMDB_TOKEN` environment variable rather than exposing that token in browser code.

### 2. Server-state caching with TanStack Query

CineVault uses dedicated query keys for media sections, search results, trending categories, and individual media details.

Different data types have different freshness and cache-retention policies:

| Query category | Stale time | Cache retention |
|---|---:|---:|
| Movie, TV, and anime sections | 10 minutes | 30 minutes |
| Trending results | 10 minutes | 20 minutes |
| Movie, TV, and anime details | 30 minutes | 60 minutes |
| Search results | 2 minutes | 10 minutes |

These settings reduce unnecessary refetching during navigation while allowing data to become eligible for refresh at appropriate intervals.

The Home page also prefetches anime sections and trending datasets for All, Movies, and TV Shows, preparing frequently visited content before the user opens the corresponding search view.

### 3. Runtime API data validation with Zod

TypeScript checks application code during development, but external API responses still arrive as runtime data.

Zod schemas validate supported TMDB and AniList response shapes before the application consumes them. The data-access layer uses validation results to detect unexpected response structures instead of silently assuming every response matches the expected format.

### 4. Integration with two different data sources

TMDB provides movie and TV metadata through REST endpoints, while AniList provides anime data through GraphQL.

The server-side endpoints handle source-specific requests and normalize anime data into a shape the shared media UI can display. The trending endpoint also combines multiple TMDB pages and removes duplicate results.

### 5. Safer content rendering

AniList descriptions can contain HTML. CineVault sanitizes description markup with DOMPurify before rendering it, rather than inserting raw API-provided HTML directly into the page.

## API Architecture

| Endpoint | Responsibility |
|---|---|
| `/api/tmdb?type=movie` | Movie collections and movie details |
| `/api/tmdb?type=tv` | TV collections and TV details |
| `/api/anilist` | Trending, popular, and top-rated anime |
| `/api/anilist?id={id}` | Anime details |
| `/api/search?query={query}&type={type}` | Movie and TV search |
| `/api/trending?type={type}` | Trending results for All, Movies, or TV Shows |
| `/api/movie-images?id={id}` | Movie image assets used by the Hero Banner |

The `type` parameter for search and trending supports `multi`, `movie`, and `tv`.

For TMDB requests, the token is read from the server environment. AniList requests use its GraphQL endpoint.

## Project Structure

```text
api/
  anilist.js
  movie-images.js
  search.js
  tmdb.ts
  trending.js

src/
  api/
    mediaApi.ts
  components/
    Footer/
    HeroBanner/
    MovieList/
    Sidebar/
    Skeleton/
  hooks/
    useAnimeDetails.ts
    useAnimeSections.ts
    useMovieSections.ts
    usePrefetchMediaSections.ts
    useSearch.ts
    useTrendingMovies.ts
    useTvSections.ts
  pages/
    AnimeDetailsPage/
    AnimePage/
    CreditsPage/
    HomePage/
    MovieDetailsPage/
    MoviesPage/
    SearchPage/
    TVShowsPage/
```

The API directory contains Vercel Functions. The `src` directory separates pages, reusable components, data access, and query-focused custom hooks.

## Getting Started

### Requirements

- Node.js
- npm
- A TMDB API access token

### Installation

```bash
git clone https://github.com/MateKvatchadze/movie-app.git
cd movie-app
npm install
```

Create a `.env.local` file in the project root:

```env
TMDB_TOKEN=your_tmdb_access_token
```

Keep the token server-side. Do not rename it to `VITE_TMDB_TOKEN`, and make sure `.env.local` is excluded from Git.

### Run locally

The project uses Vercel Functions for its `/api` endpoints. To run the frontend and those endpoints together in a local development environment, use the Vercel CLI:

```bash
npx vercel dev
```

The standard Vite development command is also available:

```bash
npm run dev
```

However, the standard Vite server does not execute the Vercel Functions in the root `api` directory by itself.

### Verify the project

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## Data Sources & Attribution

### TMDB

CineVault uses TMDB for movie and television metadata, images, ratings, and trending information.

This product uses the TMDB API but is not endorsed or certified by TMDB.

### AniList

CineVault uses the AniList GraphQL API for anime metadata and related information.

CineVault is an independent project and is not affiliated with or endorsed by AniList.

Media metadata and artwork are provided by their respective sources and rights holders.

## About

CineVault is a deployed frontend portfolio project focused on building a cohesive media discovery experience while working with multiple external APIs, asynchronous data, client-side caching, runtime validation, and responsive layouts.

It is a media discovery application, not a video streaming service.
