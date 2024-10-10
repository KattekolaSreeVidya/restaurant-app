import React from 'react';
import { useCart } from './CartContext';

const Checkout = () => {
  const { cartItems, setCartItems } = useCart(); // Access cart data and clear it

  // Function to handle checkout process
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert(`Proceeding with ${cartItems.length} item(s) in your cart!`);
      // Clear the cart after checkout
      setCartItems([]);
    } else {
      alert("Your cart is empty. Add items to your cart before proceeding.");
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add items to your cart to proceed with checkout.</p>
      ) : (
        <div>
          <h3>Review Your Cart</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Total Items: {cartItems.length}</p>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
