// components/RestaurantMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import restaurantData from '../data/restaurants'; // Adjust the path based on your project structure

const RestaurantMenu = () => {
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/menu/${restaurantId}`); // Navigate to the menu page of the clicked restaurant
  };

  return (
    <div className="restaurant-list">
      {restaurantData.map((restaurant) => (
        <div key={restaurant.id} className="restaurant-card" onClick={() => handleRestaurantClick(restaurant.id)}>
          <img src={restaurant.image} alt={restaurant.name} />
          <div className="details">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
