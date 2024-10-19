import React from 'react';
import { useCart } from './CartContext'; // Import the custom hook to use CartContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate to navigate programmatically

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate('/checkout');
  };

  const handleAddMoreItems = () => {
    // Navigate to the menu of the first restaurant in the cart
    if (cartItems.length > 0) {
      const restaurantId = cartItems[0].restaurantId; // Assuming all items in the cart are from the same restaurant
      navigate(`/menu/${restaurantId}`); // Navigate to the menu of the specific restaurant
    }
  };

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) {
          return null; // Remove the item if quantity is 0
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item !== null)); // Filter out any null values (removed items)
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <div className="cost">
                {/* Use 'item.price' to display the item's cost */}
                ${item.price.toFixed(2)} (x{item.quantity})
              </div>
              <div className="item-actions">
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <span className="quantity-label"> Quantity: {item.quantity} </span>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          <h3>Total: ${calculateTotal()}</h3>
          <button className="add-more-items" onClick={handleAddMoreItems}>
            Add More Items
          </button>
        </>
      ) : (
        <div>
          <p>Your cart is empty!</p>
          <button onClick={() => navigate('/')}>Go to Menu</button> {/* Navigate to the menu */}
        </div>
      )}
      {cartItems.length > 0 && (
        <button className="proceed-to-checkout" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
