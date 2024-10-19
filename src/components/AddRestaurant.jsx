import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRestaurant({ onAddRestaurant, editingRestaurant }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editingRestaurant) {
      setName(editingRestaurant.name);
      setDescription(editingRestaurant.description);
      setImage(editingRestaurant.image);
    } else {
      setName('');
      setDescription('');
      setImage('');
    }
  }, [editingRestaurant]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image state to the base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRestaurant = {
      id: editingRestaurant ? editingRestaurant.id : Date.now().toString(), // Use existing ID for editing
      name,
      description,
      image,
      items: [] // Start with an empty items array
    };

    onAddRestaurant(newRestaurant); // Call the function passed from App to add or edit the restaurant
    navigate('/'); // Redirect back to the restaurant list
  };

  return (
    <div className="add-restaurant">
      <h2>{editingRestaurant ? 'Edit Restaurant' : 'Add a New Restaurant'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Restaurant Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">{editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}</button>
      </form>
      {image && <img src={image} alt="Restaurant" style={{ width: '200px', height: 'auto' }} />}
    </div>
  );
}

export default AddRestaurant;
