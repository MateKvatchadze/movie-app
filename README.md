# CineVault

A React-based media discovery application built with TypeScript, integrating TMDB REST API and AniList GraphQL API.

[![Open Live Demo](./live-demo.svg)](https://movie-app-five-sigma-57.vercel.app)

[View Source Code](https://github.com/MateKvatchadze/movie-app)

## Tech Stack

- **Frontend:** React 19, TypeScript, React Router 7, CSS
- **Data Fetching & Caching:** TanStack Query v5
- **API Integration:** TMDB REST API, AniList GraphQL API
- **Validation:** Zod v4
- **Backend & Deployment:** Vercel Functions, environment variables
- **Build Tooling:** Vite 8, Node.js, npm
- **Security:** DOMPurify
- **UI Utilities:** React Icons
- **Code Quality:** ESLint 10

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
