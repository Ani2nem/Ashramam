import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './Payment.css';

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setClientSecret(urlParams.get('clientSecret'));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          phone: phoneNumber,
          address: {
            line1: address,
          },
        },
      },
    });

    if (error) {
      console.error(error.message);
      // Handle payment error
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
      // Handle successful payment (e.g., display success message, redirect)
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Donation</h2>
      <form onSubmit={handleSubmit}>
        <div className='info-inputs'>
        <div className='name-input'>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className='phone-input'>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className='address-input'>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
        </div>
        </div>
        <div>
          <CardElement className="stripe-card-element" />
        </div>
        <button className="pay-button" type="submit" disabled={!stripe}>Donate</button>
      </form>
    </div>
  );
};

export default Payment;
