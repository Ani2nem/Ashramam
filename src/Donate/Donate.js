import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Donate.css';

const stripePromise = loadStripe('pk_test_51PHyASJtWCb49VjheumpMIcYRN8CZ0osD5zxBceBKr9tJywy9wr8APhrbCUl2THuDnW3zk6QuQu8FPiDIPIX7x9500Anv1tmFH');

const showToast = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 3000, // milliseconds
    });
  };

const Donate = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const popupRef = useRef(null);

    const handleDonateClick = () => {
        setIsPopupOpen(true);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleConfirmDonation = async () => {
        
        // Check if amount is a valid number
        if (isNaN(amount) || amount.trim() === "") {
            showToast("Please enter a valid amount.");
            return; // Exit the function if amount is invalid
        }
        
        try {
            const numericAmount = parseFloat(amount);

            const response = await fetch('http://localhost:3000/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseInt(numericAmount) * 100 }), // Convert amount to cents
            });
            const data = await response.json();
            setClientSecret(data.clientSecret);
            setIsPopupOpen(false);
            showToast("Thank you for your Donation!");
        } catch (error) {
            console.error('Error creating payment intent:', error);
            showToast("An unexpected error occurred. Please try again later.");
        }
    };

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
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
            // Redirect to success page or handle confirmation logic here
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
                            placeholder='Enter amount in Rupees'
                        />
                        <button onClick={handleConfirmDonation}>Confirm Donation</button>
                    </div>
                </div>
            )}

            {clientSecret && (
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    <button type="submit" disabled={!stripe}>Pay</button>
                </form>
            )}
        </section>
    );
};

const WrappedDonate = () => (
    <Elements stripe={stripePromise}>
        <Donate />
        <ToastContainer />
    </Elements>
);

export default WrappedDonate;
