import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Checkout = () => {
  const { cartItems, setCartItems } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Validation error state
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [cardHolderNameError, setCardHolderNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);
  const isValidCardNumber = (number) => /^\d{16}$/.test(number);
  const isValidExpiryDate = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
  const isValidCvv = (cvv) => /^\d{3,4}$/.test(cvv);

  const handleCheckout = (e) => {
    e.preventDefault();

    setNameError('');
    setAddressError('');
    setPaymentError('');
    setCardHolderNameError('');
    setCardNumberError('');
    setExpiryDateError('');
    setCvvError('');

    let isValid = true;

    if (!name) {
      setNameError('Name is required.');
      isValid = false;
    } else if (!isValidName(name)) {
      setNameError('Name should only contain letters and spaces.');
      isValid = false;
    }

    if (!address) {
      setAddressError('Address is required.');
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentError('Payment method is required.');
      isValid = false;
    }

    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
      if (!cardHolderName) {
        setCardHolderNameError('Cardholder name is required.');
        isValid = false;
      } else if (!isValidName(cardHolderName)) {
        setCardHolderNameError('Cardholder name should only contain letters and spaces.');
        isValid = false;
      }

      if (!cardNumber) {
        setCardNumberError('Card number is required.');
        isValid = false;
      } else if (!isValidCardNumber(cardNumber)) {
        setCardNumberError('Card number should be exactly 16 digits.');
        isValid = false;
      }

      if (!expiryDate) {
        setExpiryDateError('Expiry date is required.');
        isValid = false;
      } else if (!isValidExpiryDate(expiryDate)) {
        setExpiryDateError('Expiry date should be in MM/YY format.');
        isValid = false;
      }

      if (!cvv) {
        setCvvError('CVV is required.');
        isValid = false;
      } else if (!isValidCvv(cvv)) {
        setCvvError('CVV should be 3 or 4 digits.');
        isValid = false;
      }
    }

    if (isValid && cartItems.length > 0) {
      setCartItems([]);
      setIsSubmitted(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {isSubmitted ? (
        <div>
          <p>Payment Successful! Thank you for your purchase.</p>
          <p>Redirecting to the home page...</p>
        </div>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty. Add items to your cart to proceed with checkout.</p>
      ) : (
        <form onSubmit={handleCheckout}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {addressError && <p className="error-message">{addressError}</p>}
          </div>
          <div className="form-group">
            <label>Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select a payment method</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
            {paymentError && <p className="error-message">{paymentError}</p>}
          </div>

          {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
            <div className="card-details">
              <div className="form-group">
                <label>Cardholder Name:</label>
                <input
                  type="text"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  required
                />
                {cardHolderNameError && <p className="error-message">{cardHolderNameError}</p>}
              </div>
              <div className="form-group">
                <label>Card Number:</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
                {cardNumberError && <p className="error-message">{cardNumberError}</p>}
              </div>
              <div className="form-group">
                <label>Expiry Date (MM/YY):</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
                {expiryDateError && <p className="error-message">{expiryDateError}</p>}
              </div>
              <div className="form-group">
                <label>CVV:</label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
                {cvvError && <p className="error-message">{cvvError}</p>}
              </div>
            </div>
          )}

          <button type="submit" className="checkout-button">
            Submit Payment
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
