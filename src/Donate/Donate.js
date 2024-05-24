import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Donate.css';


const showToast = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 3000, // milliseconds
  });
};

const Donate = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const handleDonateClick = () => {
    setIsPopupOpen(true);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConfirmDonation = async () => {
    if (isNaN(amount) || amount.trim() === "") {
      showToast("Please enter a valid amount.");
      return; // Exit the function if amount is invalid
    }

    try {
      const numericAmount = parseFloat(amount);

      const response = await fetch(`https://ashramambackend.onrender.com/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(numericAmount) * 100 }), // Convert amount to cents
      });
      const data = await response.json();

      // Redirect to payment page with clientSecret as a query parameter
      navigate(`/payment?clientSecret=${data.clientSecret}`);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      showToast("An unexpected error occurred. Please try again later.");
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <section className='donate-section'>
      <h1 id="Donate" className='donation-title'>Contribute to Our Sai Baba Ashramam</h1>
      <button className='donate-button' onClick={handleDonateClick}>Donate</button>
      <p className='donation-message'>
        Your support not only fuels the growth of our temple but also enriches the 
        spirit of our community, fostering unity, spiritual well-being, and communal harmony.
        Thank you for being a vital part of our noble cause.
      </p>

      {isPopupOpen && (
        <div className='popup'>
          <div className='popup-content' ref={popupRef}>
            <h2>Enter Donation Amount</h2>
            <input
              type='number'
              value={amount}
              onChange={handleAmountChange}
              placeholder='Enter amount in USD'
            />
            <button onClick={handleConfirmDonation}>Confirm Donation</button>
          </div>
        </div>
      )}
    </section>
  );
};

const WrappedDonate = () => (
  <>
   <Donate />
    <ToastContainer />
  </>
);

export default WrappedDonate;

