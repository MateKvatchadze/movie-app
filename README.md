# Movie App

A React + Vite movie streaming-style application using the TMDB API.

## Live Demo

https://movie-app-five-sigma-57.vercel.app

## Features

- Trending movies from TMDB
- Movie search
- Movie details page
- Runtime display
- Poster and backdrop images
- Serverless API routes with Vercel Functions
- Hidden TMDB token through environment variables
- Responsive movie grid

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- TMDB API
- Vercel
- Git / GitHub

## API Architecture

The app does not call TMDB directly from the frontend.

Frontend requests go through local API routes:

- `/api/trending`
- `/api/search`
- `/api/movie`

These API routes use `process.env.TMDB_TOKEN` on the server side, so the TMDB token is not exposed in the frontend code.

## Current Status

The project is still in development.

Planned improvements:

- Separate Home and Search pages
- Hero banner with auto-changing trending movies
- Watchlist with localStorage
- Continue Watching section
- Better movie details layout
- TMDB credits section
- Improved responsive design

## TMDB Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Data and images are provided by TMDB.
