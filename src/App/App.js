import React from "react";
import NavBar from "../NavBar/NavBar";
import Hero from "../Hero/Hero";
import About from "../About/About";
import Events from "../Events/Events";
import WrappedDonate from "../Donate/Donate";
import Footer from "../Footer/Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Payment from '../Donate/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PHyASJtWCb49VjheumpMIcYRN8CZ0osD5zxBceBKr9tJywy9wr8APhrbCUl2THuDnW3zk6QuQu8FPiDIPIX7x9500Anv1tmFH');
const appearance = {
  theme: 'stripe',
};


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <NavBar />
            <Hero />
            <About />
            <Events />
            <WrappedDonate />
            <Footer />
            </>}/>
          <Route path="/payment" element={
          <Elements stripe={stripePromise} options={{appearance}} >
            <Payment />
          </Elements>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;