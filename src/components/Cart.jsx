import React from 'react';
import { useCart } from './CartContext'; // Import the custom hook to use CartContext

const Cart = () => {
  // Use the context to get the cartItems and functions
  const { cartItems, addToCart, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    // Here you could integrate further checkout functionality, e.g., navigate to a checkout page or process the order.
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <div className="cost">{item.cost}</div>
          </div>
        ))
      ) : (
        <p>Your cart is empty!</p>
      )}
      <button className="proceed-to-checkout" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
