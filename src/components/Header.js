import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__nav-link">Week Plan</Link>
        <Link to="/recipes" className="header__nav-link">Recipes</Link>
        <Link to="/add-recipe" className="header__nav-link">New Recipe</Link>
      </nav>
    </header>
  );
};

export default Header;
