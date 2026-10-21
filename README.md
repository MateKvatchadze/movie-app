# CineVault

**Movies, TV shows, and anime — one place to discover what to watch next.**

CineVault is a responsive media discovery platform that brings together movie and TV data from TMDB and anime from AniList. Built with React and TypeScript, it combines a dark, media-focused interface with search, dedicated detail pages, and efficient server-state management.

**[Live Demo](https://movie-app-five-sigma-57.vercel.app) · [GitHub Repository](https://github.com/MateKvatchadze/movie-app)**

## Features

- **Three media categories:** discover movies, TV shows, and anime in one application.
- **Search & discovery:** explore trending content and filter movie and TV search results by media type.
- **Detailed media pages:** browse available metadata, ratings, artwork, and trailer information.
- **Dynamic home page:** featured media, curated sections, and reusable media components.
- **Responsive UI:** dark theme, adaptive navigation, and layouts for desktop and mobile.
- **Smooth loading experience:** skeleton states keep the interface structured while data loads.

## Tech Stack

**Frontend:** React, TypeScript, Vite, React Router, CSS

**Data & APIs:** TanStack Query, Zod, TMDB REST API, AniList GraphQL API

**Infrastructure & utilities:** Vercel Functions, DOMPurify, React Icons

## Technical Highlights

- **API architecture:** server-side Vercel Functions handle external API requests, keeping the TMDB access token out of client-side code.
- **Caching & prefetching:** TanStack Query manages server state, cache lifetimes, and prefetching to reduce unnecessary requests during navigation.
- **Runtime validation:** Zod validates supported API data, while TypeScript provides static type checking.
- **Content safety:** DOMPurify sanitizes HTML descriptions before rendering.
- **Multi-source data handling:** data from TMDB and AniList is adapted for use across the application's media interface.

## Run Locally

Requirements: Node.js, npm, and a TMDB API access token.

```bash
git clone https://github.com/MateKvatchadze/movie-app.git
cd movie-app
npm install
```

Create a `.env.local` file in the project root:

```env
TMDB_TOKEN=your_tmdb_access_token
```

Start the application with Vercel's local development environment so the `/api` functions are available:

```bash
npx vercel dev
```

## Data Sources

- **TMDB** — movie and television metadata, images, and trending data. This product uses the TMDB API but is not endorsed or certified by TMDB.
- **AniList** — anime metadata through the AniList GraphQL API.

CineVault is an independent portfolio project and is not a video streaming service.
