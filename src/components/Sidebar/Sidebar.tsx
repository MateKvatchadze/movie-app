import "./Sidebar.css";
import SidebarNavigation from "./SidebarNavigation";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);


  return (
    <aside className="sidebar" aria-label="Main navigation">

      <div className="buttonsWrapper">
        <NavLink
          to="/search"
          className="mobileSearchButton"
          aria-label="Search"
        >
          <FiSearch />
        </NavLink>

        <button
          className="mobileMenuButton"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="mobileMenuOverlay"
          onClick={() => setIsMenuOpen(false)}
        >
          <nav className="mobileMenu" aria-label="Mobile navigation">
            <div
              className="mobileMenuContent"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="mobileMenuClose"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>

              <SidebarNavigation
                onNavigate={() => setIsMenuOpen(false)}
              />
            </div>
          </nav>
        </div>
      )}
      
      <NavLink to="/" className="sidebarLogo">
        CineVault
      </NavLink>

      <SidebarNavigation />
      
    </aside>
  );
}

export default Sidebar;