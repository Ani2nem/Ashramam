import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './Payment.css'

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('');
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

  const appearance = {
    theme: 'stripe',
  };
  
  const options = {
    clientSecret,
    appearance, // Assuming you already defined the appearance object
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Donation</h2>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ layout: { type: 'tabs' }}} className="stripe-card-element"  />
        <button type="submit" disabled={!stripe} appearance={appearance} options={options}>Pay</button>
      </form>
    </div>
  );
};

export default Payment;
