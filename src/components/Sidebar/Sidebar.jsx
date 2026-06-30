import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">

      <h1 className="sidebarLogo">CineVault</h1>

      <nav className="sidebarGroup">
        <NavLink to="/" className="sidebarLink">
          Home
        </NavLink>

        <NavLink to="/search" className="sidebarLink">
          Search
        </NavLink>

        <NavLink to="/browse" className="sidebarLink">
          Browse
        </NavLink>
      </nav>


      <nav className="sidebarGroup" aria-label="Media navigation">
        <p className="sidebarGroupTitle">MEDIA</p>

        <NavLink to="/movies" className="sidebarLink">
          Movies
        </NavLink>

        <NavLink to="/tv" className="sidebarLink">
          TV Shows
        </NavLink>

        <NavLink to="/Anime" className="sidebarLink">
          Anime
        </NavLink>
             
      </nav>


      <nav className="sidebarGroup">
        <p className="sidebarGroupTitle">MORE</p>

        <NavLink to="/credits" className="sidebarLink">
          Legal / Credits
        </NavLink>
      </nav>

    </aside>
  );
}

export default Sidebar;