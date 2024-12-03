  // TODO: Add necessary code to display the navigation bar and link between the pages
  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import './nav.css';
  
  const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <div className="nav-container">
        <nav>
          <div className="nav-logo">
            <h1>Candidate App</h1>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/">Search Candidates</Link>
            </li>
            <li>
              <Link to="saved">Saved Candidates</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Nav;