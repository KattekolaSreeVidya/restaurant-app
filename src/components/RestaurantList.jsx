// src/components/RestaurantList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const restaurants = [
  { id: 1, name: 'Italian Bistro', description: 'Delicious Italian cuisine with fresh ingredients.', image: '/images/italian-bistro.jpg' },
  { id: 2, name: 'Sushi Place', description: 'Authentic sushi and Japanese dishes in a cozy setting.', image: '/images/sushi-place.jpg' },
  { id: 3, name: 'Burger Joint', description: 'Tasty burgers and fries for a quick bite.', image: '/images/burger-joint.jpg' },
];

function RestaurantList() {
  return (
    <div className="restaurant-list">
      <h2>Restaurants</h2>
      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant.id}>
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="details">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
              <Link to={`/menu/${restaurant.id}`} className="view-menu-button">View Menu</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
