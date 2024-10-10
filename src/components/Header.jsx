// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
//import './Header.css'; // If you have specific styles for the header

function Header() {
  return (
    <header className="header">
      <div className="header-logo">My Restaurant App</div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;
