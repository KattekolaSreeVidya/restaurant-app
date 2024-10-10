import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useParams } from 'react-router-dom'; // Use params to get the restaurant ID from the URL
import restaurantData from '../data/restaurants'; // Import the restaurant data

const Menu = () => {
  const { restaurantId } = useParams(); // Extract restaurant ID from URL
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]); // State to hold menu items for the specific restaurant
  const [successMessage, setSuccessMessage] = useState(''); // State to manage the success message popup

  // Effect to load the menu items based on restaurantId
  useEffect(() => {
    const selectedRestaurant = restaurantData.find((restaurant) => restaurant.id === restaurantId);
    if (selectedRestaurant) {
      setMenuItems(selectedRestaurant.items); // Set the menu items for the specific restaurant
    } else {
      // Handle case where restaurantId doesn't exist in the data (optional)
      setMenuItems([]);
      console.error('Restaurant not found');
    }
  }, [restaurantId]);

  // Function to handle adding an item to the cart and displaying the success message
  const handleAddToCart = (item) => {
    addToCart(item);
    setSuccessMessage(`${item.name} successfully added to cart!`);

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="menu">
      <h2>Menu for Restaurant {restaurantId}</h2>
      
      {menuItems.length > 0 ? (
        menuItems.map((item) => (
          <div className="menu-item" key={item.id}>
            <img
              src={item.image} // Image for each menu item
              alt={item.name}
              className="menu-item-image"
            />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p> {/* Format price with 2 decimal places */}
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(item)} // Add item to cart and show success message
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No menu items available for this restaurant.</p> // Message when no menu items are available
      )}

      {/* Success message popup */}
      {successMessage && (
        <div className="success-popup">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Menu;
