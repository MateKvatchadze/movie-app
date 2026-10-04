import MovieList from "../../components/MovieList/MovieList";

import useSearch from "../../hooks/useSearch";
import useMovieSections from "../../hooks/useMovieSections";

function SearchPage() {
  const { trendingMovies } = useMovieSections();

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

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search all content..."
      />

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