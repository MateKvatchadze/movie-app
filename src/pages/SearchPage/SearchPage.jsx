import MovieList from "../../components/MovieList/MovieList";


function SearchPage({ query, setQuery, movies, loading, error, onSelect, trendingMovies }) {
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
        movies={movies}
        onSelect={onSelect}
      />
    </>
    ): (
    <>
      <h2>Trending Now</h2>
      <MovieList 
        movies={trendingMovies}
        onSelect={onSelect}
      />
    </>)
  }
 

  {loading && <p>Loading...</p>}
  {error && <p>{error}</p>}

  </>
)

}
export default SearchPage;