import { Link } from "react-router-dom";

import "./HeroBanner.css";

function HeroBanner({ movie }) {
  if(!movie) return null;

return (
  <section
    className="heroBanner"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
    }}
  >
    <div className="heroContent">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      
      <div className="heroActions">
        <Link to={`/movie/${movie.id}`} className="heroPlayButton">▶ Play</Link>
      </div>
    </div>
    
  </section>
);
}

export default HeroBanner;