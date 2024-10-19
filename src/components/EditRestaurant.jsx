import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditRestaurant({ restaurants, onEditRestaurant }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const restaurant = restaurants.find((r) => r.id === id);
  const [name, setName] = useState(restaurant?.name || '');
  const [description, setDescription] = useState(restaurant?.description || '');
  const [image, setImage] = useState(restaurant?.image || '');

  useEffect(() => {
    if (!restaurant) {
      navigate('/'); // Redirect if restaurant not found
    }
  }, [restaurant, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRestaurant = {
      ...restaurant,
      name,
      description,
      image,
    };
    onEditRestaurant(updatedRestaurant);
    navigate('/'); // Redirect after editing
  };

  return (
    <div className="edit-restaurant-form">
      <h2>Edit Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Update Restaurant</button>
      </form>
    </div>
  );
}

export default EditRestaurant;
