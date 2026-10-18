import "./Sidebar.css";
import SidebarNavigation from "./SidebarNavigation";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsHeaderVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (difference > 5) {
        setIsHeaderVisible(false);
      } else if (difference < -5) {
        setIsHeaderVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);


  return (
      <aside
        className={`sidebar ${
          isHeaderVisible ? "headerVisible" : "headerHidden"
        }`}
        aria-label="Main navigation"
      >

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

      {isMenuOpen &&
        createPortal(
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
          </div>,
          document.body
        )}
      
      <NavLink to="/" className="sidebarLogo">
        CineVault
      </NavLink>

      <SidebarNavigation />
      
    </aside>
  );
}

export default Sidebar;