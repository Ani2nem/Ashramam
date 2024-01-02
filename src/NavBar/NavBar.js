import React from "react";
import './NavBar.css';
import {Link} from 'react-scroll'

const NavBar = () => {
    return (
        <section className="navbar-section">
            <div className="nav-items">
            <Link to="Hero" spy={true} smooth={true} offset={0} duration={500} className="nav-item">Home</Link>
            <Link to="About" spy={true} smooth={true} offset={0} duration={500} className="nav-item">About</Link>
            <Link to="Events" spy={true} smooth={true} offset={0} duration={500} className="nav-item">Events</Link>
            <Link to="Donate" spy={true} smooth={true} offset={0} duration={500} className="nav-item">Donate</Link>
            </div>
        </section>
    )
}

export default NavBar;