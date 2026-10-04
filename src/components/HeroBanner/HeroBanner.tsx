import { Link } from "react-router-dom";

import "./HeroBanner.css";
type HeroBannerProps = {
  movie:{
    id: number;
    media_type: string;
    title: string;
    poster_path?: string | undefined;
    release_date?: string | undefined;
    overview?:string;
  }
  isHeroFading:boolean;
  heroLogo:string;
}
function HeroBanner({ movie, isHeroFading, heroLogo }:HeroBannerProps) {console.log("MOVIEE:", movie)
  if(!movie) return null;
  console.log("ВОТ:", movie)
return (
  <section
    className={`heroBanner ${isHeroFading ? "heroBannerFading" : ""}`}
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
    }}
  >
    <div className="heroContent">
      
      {heroLogo ? (
        <img
          className="heroLogo"
          src={`https://image.tmdb.org/t/p/w500${heroLogo}`}
          alt={movie.title}
        />
        ) : (
          <h2>{movie.title}</h2> 
        ) 
      }
  
      <p>{movie.overview}</p>

      <div className="heroActions">
        <Link to={`/movie/${movie.id}`} className="heroPlayButton">▶ Play</Link>
      </div>
    </div>
    
  </section>
);
}

export default HeroBanner;