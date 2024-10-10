// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext'; // Import CartProvider
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import RestaurantMenu from './components/RestaurantMenu.jsx'; // Importing RestaurantMenu
import Menu from './components/Menu.jsx'; // Importing Menu component
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider> {/* Wrap your app with CartProvider */}
        <div className="App">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<RestaurantMenu />} /> {/* Updated route to use RestaurantMenu */}
              <Route path="/menu/:restaurantId" element={<Menu />} /> {/* Route for Menu component */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
