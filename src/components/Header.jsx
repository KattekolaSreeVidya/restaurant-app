// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Make sure to import the useCart hook

function Header() {
  const { getCartCount } = useCart(); // Get the cart count from context
  const cartCount = getCartCount(); // Get the total number of items in the cart

  return (
    <header className="header">
      <div className="header-logo">Foodie Hub</div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart {cartCount > 0 && `(${cartCount})`}</Link>
      </nav>
    </header>
  );
}

export default Header;
