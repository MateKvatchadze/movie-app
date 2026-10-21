# CineVault

A React-based media discovery application built with TypeScript, integrating TMDB REST API and AniList GraphQL API.

<h2>
  <a href="https://movie-app-five-sigma-57.vercel.app">◉ Live Demo ↗</a>
</h2>

[View Source Code](https://github.com/MateKvatchadze/movie-app)

## Tech Stack

- **React** — component-based UI, reusable components, hooks, and state management
- **TypeScript** — static typing for application logic and data handling
- **React Router** — client-side routing and dynamic media detail pages
- **TanStack Query** — server-state management, query caching, stale-time and garbage-collection policies, and data prefetching
- **Zod** — runtime validation of external API data
- **Vite** — development environment and production builds
- **Vercel Functions** — server-side API handlers and environment-based secret management
- **DOMPurify** — sanitization of HTML descriptions before rendering
- **CSS** — responsive layouts, adaptive navigation, and loading skeletons

## Key Implementations

### Multiple API Integrations

- **TMDB REST API:** movie and TV data, trending results, media metadata, images, and available video information.
- **AniList GraphQL API:** anime discovery and detailed anime data, including available trailer and media relationship information.
- **Data normalization:** API-specific responses are adapted for use across shared media components.
- **Search:** movie and TV search with media-type filtering and URL search parameters.

### Server-State Management

- Custom React hooks separate data-fetching logic from UI components.
- TanStack Query manages caching, query freshness, cache retention, and request deduplication.
- Prefetching prepares selected media data before it is needed by the corresponding view.
- Loading states and skeleton components provide consistent UI while requests are pending.

### Type Safety and Data Handling

- TypeScript types describe application data and component interfaces.
- Zod schemas validate external data at runtime where implemented.
- Separate API handlers isolate upstream API requests from the frontend.
- The TMDB access token is read from a server-side environment variable rather than exposed in client-side code.

### Media Details and Rendering

- Dedicated movie, TV, and anime detail pages.
- Trailer integration for supported media, including YouTube and Dailymotion sources where available.
- DOMPurify sanitization for HTML descriptions before rendering.
- Responsive layouts for desktop and mobile screens.

## Architecture

```text
src/
  api/          Shared media data-access layer
  components/   Reusable UI and skeleton components
  hooks/        Data-fetching and query logic
  pages/        Route-level views

api/            Vercel serverless API handlers
```

The frontend uses a shared data-access layer and custom hooks to connect React components with TanStack Query. Vercel Functions handle external API requests, while source-specific response handling keeps TMDB and AniList integration separate from presentation logic.

## Run Locally

**Requirements:** Node.js, npm, and a TMDB API access token.

```bash
git clone https://github.com/MateKvatchadze/movie-app.git
cd movie-app
npm install
```

Create a `.env.local` file in the project root:

```env
TMDB_TOKEN=your_tmdb_access_token
```

Run the application with the local Vercel development environment to support the `/api` functions:

```bash
npx vercel dev
```

Available project checks:

```bash
npm run build
npm run lint
```

## Data Sources

- [TMDB API](https://developer.themoviedb.org/docs) — movie and TV metadata.
- [AniList GraphQL API](https://docs.anilist.co/) — anime metadata.

This product uses the TMDB API but is not endorsed or certified by TMDB.
