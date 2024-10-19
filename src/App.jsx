// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import RestaurantList from './components/RestaurantList.jsx';
import AddRestaurant from './components/AddRestaurant.jsx';
import EditRestaurant from './components/EditRestaurant.jsx';
import Menu from './components/Menu.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import initialRestaurantData from './data/restaurants'; // Load initial data

import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState(initialRestaurantData);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const addRestaurant = (newRestaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
  };

  const editRestaurant = (updatedRestaurant) => {
    setRestaurants(
      restaurants.map((restaurant) =>
        restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
      )
    );
    setEditingRestaurant(null); // Clear the editing state after saving
  };

  const deleteRestaurant = (id) => {
    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
  };

  const startEditing = (restaurant) => {
    setEditingRestaurant(restaurant);
  };

  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <RestaurantList
                    restaurants={restaurants}
                    onEdit={startEditing}   // Pass edit function
                    onDelete={deleteRestaurant} // Pass delete function
                  />
                }
              />
              <Route
                path="/menu/:restaurantId"
                element={<Menu restaurants={restaurants} />} // Pass restaurant data to Menu
              />
              <Route
                path="/cart"
                element={<Cart />}
              />
              <Route
                path="/checkout"
                element={<Checkout />}
              />
              <Route
                path="/add-restaurant"
                element={<AddRestaurant onAddRestaurant={addRestaurant} editingRestaurant={editingRestaurant} />} // Pass editing restaurant if any
              />
              <Route
                path="/edit-restaurant/:id"
                element={
                  <EditRestaurant
                    restaurants={restaurants}
                    onEditRestaurant={editRestaurant}
                    onDeleteRestaurant={deleteRestaurant} // Pass delete function if needed
                  />
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
