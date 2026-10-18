import MovieList from "../../components/MovieList/MovieList";
import MovieListSkeleton from "../../components/MovieList/MovieListSkeleton";
import useSearch from "../../hooks/useSearch";
import useTrendingMovies from "../../hooks/useTrendingMovies";
import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawType = searchParams.get("type");

  const type: "multi" | "movie" | "tv" =
    rawType === "movie" || rawType === "tv" ? rawType : "multi";

  const handleCategoryChange = (nextType: "multi" | "movie" | "tv") => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextType === "multi") {
      nextParams.delete("type");
    } else {
      nextParams.set("type", nextType);
    }

    setSearchParams(nextParams);
  };

  const { query, setQuery, results, loading, error } = useSearch(type);

  const { trendingMovies, trendingLoading } = useTrendingMovies(type);

  const sectionTitle = query.trim() ? "Search Results" : "Trending Now";

  const sectionDescription = query.trim()
    ? `Results for "${query.trim()}"`
    : "Discover what's popular right now.";

  return (
    <div className="searchPage">
      <header className="searchPageHeader">
        <p className="searchPageEyebrow">CineVault Discovery</p>
        <h1 className="searchPageTitle">Movies and TV Shows</h1>
        <p className="searchPageDescription">
          Search movies and TV shows, or explore what's trending.
        </p>
      </header>

      <div className="searchInputWrapper">
        <span className="searchIcon" aria-hidden="true">
          ⌕
        </span>

        <input
          className="searchInput"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV shows..."
          aria-label="Search movies and TV shows"
        />

        {query && (
          <button
            type="button"
            className="clearSearch"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="searchCategories" aria-label="Content type filters">
        <button
          type="button"
          className={`typeButton ${type === "multi" ? "active" : ""}`}
          aria-pressed={type === "multi"}
          onClick={() => handleCategoryChange("multi")}
        >
          All
        </button>

        <button
          type="button"
          className={`typeButton ${type === "movie" ? "active" : ""}`}
          aria-pressed={type === "movie"}
          onClick={() => handleCategoryChange("movie")}
        >
          Movies
        </button>

        <button
          type="button"
          className={`typeButton ${type === "tv" ? "active" : ""}`}
          aria-pressed={type === "tv"}
          onClick={() => handleCategoryChange("tv")}
        >
          TV Shows
        </button>
      </div>

      <section className="searchResultsSection">
        <div className="searchResultsHeader">
          <div>
            <h2 className="searchResultsTitle">{sectionTitle}</h2>
            <p className="searchResultsSubtitle">{sectionDescription}</p>
          </div>
        </div>

        <div className="searchResultsDivider" />

        {query.trim() ? (
          loading ? (
            <MovieListSkeleton count={20} variant="grid" />
          ) : error ? (
            <p className="searchMessage">{error}</p>
          ) : results.length > 0 ? (
            <MovieList movies={results} variant="grid" />
          ) : (
            <p className="searchMessage">
              No results found. Try another title.
            </p>
          )
        ) : trendingLoading ? (
          <MovieListSkeleton count={30} variant="grid" />
        ) : trendingMovies.length > 0 ? (
          <MovieList movies={trendingMovies} variant="grid" />
        ) : (
          <p className="searchMessage">No trending titles are available.</p>
        )}
      </section>
    </div>
  );
}

export default SearchPage;
