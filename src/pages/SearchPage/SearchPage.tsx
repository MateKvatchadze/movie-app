import MovieList from "../../components/MovieList/MovieList";
import MovieListSkeleton from "../../components/MovieList/MovieListSkeleton";
import useSearch from "../../hooks/useSearch";
import useTrendingMovies from "../../hooks/useTrendingMovies";
import "./SearchPage.css";
import { useState } from "react";
function SearchPage() {
  const { trendingMovies, trendingLoading } = useTrendingMovies();
  const {
    query,
    setQuery,
    results,
    loading,
    error,
  } = useSearch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  return (
    <>
      <h2>Search Page</h2>

    <div className="searchInputWrapper">
      <span className="searchIcon">⌕</span>

      <input
        className="searchInput"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, TV shows..."
      />

      {query && (
        <button
          className="clearSearch"
          onClick={() => setQuery("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}

      <button
        className="searchFilterButton"
        type="button"
        aria-label="Filter search results"
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        All
        <span aria-hidden="true">⌄</span>
      </button>  
      {isFilterOpen && (
        <div className="searchFilterMenu">Filter open</div>
      )}    
    </div>



    {query.trim() ? (
      <>
        <h2>Search Results</h2>

        {loading ? (
          <MovieListSkeleton count={20} variant="grid" />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <MovieList movies={results} variant="grid" />
        )}
      </>
    ) : (
      <>
        <h2>Trending Now</h2>

        {trendingLoading ? (
          <MovieListSkeleton count={30} variant="grid" />
        ) : (
          <MovieList movies={trendingMovies} variant="grid" />
        )}
      </>
    )}
    </>
  );
}

export default SearchPage;