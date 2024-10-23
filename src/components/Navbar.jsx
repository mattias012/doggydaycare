import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/Navbar.css";
import doglogo from "./../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for controlling the collapsible menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu state between open and closed
  };

  const closeMenu = () => {
    setIsOpen(false); // Close the menu after clicking a link
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={doglogo} alt="Doggy Daycare" />
      </div>

      {/* Hamburger icon that appears on smaller screens */}
      <div className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Links in navbar */}
      <ul className={`navbar-links ${isOpen ? "" : "collapsed"}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/catalogOfDogs" onClick={closeMenu}>
            Dog Catalog
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
