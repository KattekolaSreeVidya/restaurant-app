import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useParams, useLocation, Navigate } from 'react-router-dom'; // Import useLocation
import restaurantData from '../data/restaurants';

const Menu = () => {
  const { restaurantId } = useParams();
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(''); // State for error handling

  // Use useLocation to get the previous location
  const location = useLocation();
  const from = location.state?.from || '/'; // Default to home if no previous location

  useEffect(() => {
    const selectedRestaurant = restaurantData.find((restaurant) => restaurant.id === restaurantId);

    if (selectedRestaurant) {
      setMenuItems(selectedRestaurant.items);
      setLoading(false);
    } else {
      setLoading(false);
      setError('Restaurant not found'); // Set error if restaurant doesn't exist
      console.error('Restaurant not found');
    }
  }, [restaurantId]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setSuccessMessage(`${item.name} successfully added to cart!`);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Loading and error handling messages
  if (loading) {
    return <div className="loading">Loading menu items...</div>;
  }

  if (error) {
    return <Navigate to={from} replace />; // Redirect to previous location if there's an error
  }

  return (
    <div className="menu">
      <h2>Menu for Restaurant {restaurantId}</h2>
      
      {menuItems.length > 0 ? (
        menuItems.map((item) => (
          <div className="menu-item" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="menu-item-image"
            />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No menu items available for this restaurant.</p>
      )}

      {successMessage && (
        <div className="success-popup">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Menu;
