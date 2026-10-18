
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { heroLogoPath } from "./components/HeroBanner/heroLogoPath";

import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import BrowsePage from "./pages/BrowsePage/BrowsePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage/TVShowsPage";
import AnimePage from "./pages/AnimePage/AnimePage";
import CreditsPage from "./pages/CreditsPage/CreditsPage";
import Sidebar from "./components/Sidebar/Sidebar";
import AnimeDetailsPage from "./pages/AnimeDetailsPage/AnimeDetailsPage";
import Footer from "./components/Footer/Footer";

import useAnimeSections from "./hooks/useAnimeSections";
import useMovieSections from "./hooks/useMovieSections";

function App() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroFading, setIsHeroFading] = useState(false);
  const [heroLogo, setHeroLogo] = useState("");

  const { trendingMovies } = useMovieSections();

  const {
    trendingAnime,
    popularAnime,
    topRatedAnime,
    animeLoading,
    animeError,
  } = useAnimeSections();

  useEffect(() => {
    let isCancelled = false;
    let transitionTimeoutId: ReturnType<typeof setTimeout> | undefined;

    if (trendingMovies.length === 0) return;

    async function loadFirstLogo() {
      if (heroIndex === 0) {
        const firstHeroLogo = await heroLogoPath(trendingMovies[heroIndex].id);

        if (!isCancelled) {
          setHeroLogo(firstHeroLogo);
        }
      }
    }

    loadFirstLogo();

    const timeoutId = setTimeout(async () => {
      const nextIndex = (heroIndex + 1) % trendingMovies.length;
      const nextMovie = trendingMovies[nextIndex];

      const nextHeroLogo = await heroLogoPath(nextMovie.id);

      if (isCancelled) return;

      const updateHero = () => {
        if (isCancelled) return;

        setIsHeroFading(true);

        transitionTimeoutId = setTimeout(() => {
          if (isCancelled) return;

          setHeroLogo(nextHeroLogo);
          setHeroIndex(nextIndex);
          setIsHeroFading(false);
        }, 250);
      };

      if (!nextMovie?.poster_path) {
        updateHero();
        return;
      }

      const image = new Image();

      image.onload = updateHero;
      image.onerror = updateHero;
      image.src = `https://image.tmdb.org/t/p/original${nextMovie.poster_path}`;
    }, 4500);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);

      if (transitionTimeoutId !== undefined) {
        clearTimeout(transitionTimeoutId);
      }
    };
  }, [trendingMovies, heroIndex]);

  const activeHeroMovie = trendingMovies[heroIndex];

  return (
    <div className="app">
      <Sidebar />

      <main className="mainContent">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                activeHeroMovie={activeHeroMovie}
                isHeroFading={isHeroFading}
                heroLogo={heroLogo}
              />
            }
          />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/tv/:id" element={<MovieDetailsPage />} />
          <Route path="/anime/:id" element={<AnimeDetailsPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TVShowsPage />} />
          <Route path="/anime" element={<AnimePage />} />
          <Route path="/credits" element={<CreditsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
