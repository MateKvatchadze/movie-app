import MovieList from "../../components/MovieList/MovieList";

import useSearch from "../../hooks/useSearch";
import useTrendingMovies from "../../hooks/useTrendingMovies";
import "./SearchPage.css";
function SearchPage() {
  const { trendingMovies } = useTrendingMovies();
  const {
    query,
    setQuery,
    results,
    loading,
    error,
  } = useSearch();

  
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
    </div>

      {query.trim() ? (
        <>
          <h2>Search Results</h2>
          <MovieList
            movies={results}
            variant="grid"
          />
        </>
      ) : (
        <>
          <h2>Trending Now</h2>
          <MovieList
            movies={trendingMovies}
            variant="grid"
          />
        </>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
}

export default SearchPage;