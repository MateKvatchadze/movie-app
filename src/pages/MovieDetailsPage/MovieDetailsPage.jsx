import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieDetailsPage(){

  const { id } = useParams();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  useEffect(() =>{
    if(!id) return;

    async function fetchMovie() {
      setLoading(true);
      setError("");
      try{
        const response = await fetch(`/api/movie?id=${id}`);
        const data = await response.json();

        if(data.error) {
          setError(data.error);
          return;
        }
        
        console.log(data)
        setMovie(data);

      } catch (err) {
        console.log("Something went wrong:", err);
        setError("Something went wrong:");  
      }finally{
        setLoading(false);
      }  
    }
    fetchMovie();
  },[id]);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found</p>;

  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
  const minutes = movie.runtime ? movie.runtime % 60 : 0;
return(
<>
  <button onClick={() => navigate(-1)}>⬅️</button>
  <p>Movie details page</p>
  <h1>{movie.title}</h1>
  <p>{movie.release_date?.slice(0, 4) || "Unknown"}</p>
  <p>{movie.overview}</p>
  <div className="posterBox">
  {movie.poster_path && (
    <img
      className="moviePoster"
      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
      alt={movie.title}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  )}
</div>
 
</>
)
}
export default MovieDetailsPage;