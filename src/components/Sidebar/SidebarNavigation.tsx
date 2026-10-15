import {
  FiHome,
  FiSearch,
  FiGrid,
  FiFilm,
  FiTv,
  FiStar,
  FiMoreHorizontal,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

type SidebarNavigationProps = {
  onNavigate?: () => void;
};

function SidebarNavigation({ onNavigate }: SidebarNavigationProps) {
  return (
    <>
      <nav className="sidebarGroup mainGroup">
        <NavLink to="/" className="sidebarLink" onClick={onNavigate}>
          <FiHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/search" className="sidebarLink" onClick={onNavigate}>
          <FiSearch />
          <span>Search</span>
        </NavLink>

        <NavLink to="/browse" className="sidebarLink" onClick={onNavigate}>
          <FiGrid />
          <span>Browse</span>
        </NavLink>
      </nav>

      <nav className="sidebarGroup mediaGroup" aria-label="Media navigation">
        <p className="sidebarGroupTitle">MEDIA</p>

        <NavLink to="/movies" className="sidebarLink" onClick={onNavigate}>
          <FiFilm />
          <span>Movies</span>
        </NavLink>

        <NavLink to="/tv" className="sidebarLink" onClick={onNavigate}>
          <FiTv />
          <span>TV Shows</span>
        </NavLink>

        <NavLink to="/anime" className="sidebarLink" onClick={onNavigate}>
          <FiStar />
          <span>Anime</span>
        </NavLink>
      </nav>

      <nav className="sidebarGroup moreGroup">
        <p className="sidebarGroupTitle">MORE</p>

        <NavLink to="/credits" className="sidebarLink" onClick={onNavigate}>
          <FiMoreHorizontal />
          <span>More</span>
        </NavLink>
      </nav>
    </>
  );
}

export default SidebarNavigation;