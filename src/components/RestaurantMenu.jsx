// components/RestaurantMenu.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import restaurantData from '../data/restaurants'; // Adjust the path based on your project structure

const RestaurantMenu = () => {
  const { restaurantId } = useParams(); // Get the restaurantId from the URL
  const navigate = useNavigate();

  // State for menu items and form handling
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch the selected restaurant's menu data based on the restaurantId
  useEffect(() => {
    const restaurant = restaurantData.find((r) => r.id.toString() === restaurantId);
    if (restaurant) {
      setMenuItems(restaurant.menu || []);
    } else {
      navigate('/'); // Navigate back if restaurant is not found
    }
  }, [restaurantId, navigate]);

  // Handle form submission for adding/editing items
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name,
      description,
      price: parseFloat(price),
    };

    if (editingIndex !== null) {
      // Update an existing item
      const updatedItems = [...menuItems];
      updatedItems[editingIndex] = newItem; // Replace the item at editingIndex
      setMenuItems(updatedItems);
      setEditingIndex(null); // Reset the editing state
    } else {
      // Add a new menu item
      setMenuItems([...menuItems, newItem]);
    }

    // Clear form fields
    setName('');
    setDescription('');
    setPrice('');
  };

  // Handle editing an existing menu item
  const handleEdit = (index) => {
    const item = menuItems[index];
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setEditingIndex(index); // Set the index for editing
  };

  // Handle deleting a menu item
  const handleDelete = (index) => {
    const updatedItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedItems);
  };

  return (
    <div className="restaurant-menu">
      <h2>Menu for {restaurantData.find((r) => r.id.toString() === restaurantId)?.name}</h2>

      {/* Display the menu items */}
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add/Edit menu form */}
      <div className="menu-form">
        <h3>{editingIndex !== null ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {editingIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantMenu;
