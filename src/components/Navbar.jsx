import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';
import doglogo from './../assets/logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={doglogo} alt="Doggydaycare" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catalogOfDogs">Dog Catalog</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;