import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Donate.css';

const stripePromise = loadStripe('your-public-key');

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
        try {
            const response = await fetch('.././server/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseInt(amount) * 100 }), // Convert amount to cents
            });
            const data = await response.json();
            setClientSecret(data.clientSecret);
            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            console.error(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
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
    </Elements>
);

export default WrappedDonate;
