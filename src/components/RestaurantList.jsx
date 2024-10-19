// components/RestaurantList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantList({ restaurants, onEdit, onDelete }) {
  return (
    <div className="restaurant-list">
      <h1>Welcome to Our Food Paradise!</h1>
      <Link to="/add-restaurant" className="add-restaurant-button">
        Add Restaurant
      </Link>
      {restaurants.length === 0 ? (
        <div className="no-restaurants-message">
          <h3>No restaurants available at the moment. Please check back later.</h3>
        </div>
      ) : (
        <div className="restaurant-cards">
          {restaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant.id}>
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
              <div className="details">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
                <Link to={`/menu/${restaurant.id}`} className="view-menu-button">
                  View Menu
                </Link>
                <div className="action-buttons">
                  <Link to={`/edit-restaurant/${restaurant.id}`}>
                    <button onClick={() => onEdit(restaurant)}>Edit</button>
                  </Link>
                  <button onClick={() => onDelete(restaurant.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantList;
