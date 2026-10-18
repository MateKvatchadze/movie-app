import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerContent">
        <Link to="/" className="footerBrand">
          CINEVAULT
        </Link>

        <p className="footerTagline">
          One vault. Endless worlds.
        </p>

        <p className="footerDescription">
          Your destination for discovering movies, television, and anime
          — all in one place.
        </p>

        <nav className="footerNavigation" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/tv">TV Shows</Link>
          <Link to="/anime">Anime</Link>
          <Link to="/search">Search</Link>
          <Link to="/credits">Credits</Link>
        </nav>

        <p className="footerCopyright">
          © {new Date().getFullYear()} CineVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

