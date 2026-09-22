import "./Sidebar.css";
import {
  FiHome, FiSearch, FiGrid, FiFilm, FiTv, FiStar, FiMoreHorizontal,
} 
from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <h1 className="sidebarLogo">CineVault</h1>

      <nav className="sidebarGroup mainGroup">
        <NavLink to="/" className="sidebarLink">
          <FiHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/search" className="sidebarLink">
          <FiSearch />
          <span>Search</span>
        </NavLink>

        <NavLink to="/browse" className="sidebarLink">
          <FiGrid />
          <span>Browse</span>
        </NavLink>
      </nav>

      <nav className="sidebarGroup mediaGroup" aria-label="Media navigation">
        <p className="sidebarGroupTitle">MEDIA</p>

        <NavLink to="/movies" className="sidebarLink">
          <FiFilm />
          <span>Movies</span>
        </NavLink>

        <NavLink to="/tv" className="sidebarLink">
          <FiTv />
          <span>TV Shows</span>
        </NavLink>

        <NavLink to="/anime" className="sidebarLink">
          <FiStar />
          <span>Anime</span>
        </NavLink>
      </nav>

      <nav className="sidebarGroup moreGroup">
        <p className="sidebarGroupTitle">MORE</p>

        <NavLink to="/credits" className="sidebarLink">
          <FiMoreHorizontal />
          <span>More</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;