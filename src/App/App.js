import React from "react";
import NavBar from "../NavBar/NavBar";
import Hero from "../Hero/Hero";
import About from "../About/About";
import Events from "../Events/Events";
import Donate from "../Donate/Donate";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <About />
      <Events />
      <Donate />
      <Footer />
    </div>
  );
}

export default App;
