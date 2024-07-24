import React from "react";
import {Link} from "react-router-dom";
import logo from "./assets/Mark.png"

function Navbar(){
    return(
        <div className="navbar">
            <div className="logo-container">
                <Link to="home"><img src={logo} alt="logo" className="logo"></img></Link>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search"/>
            </div>
            <nav className="links">
                <Link className="links" to="home"> Home</Link>
                <Link className="links" to="cart"> Cart</Link>
                <Link className="links" to="signin"> Sign In</Link>
                <Link className="links" to="signup"> Sign Up</Link>
            </nav>
        </div>
    );
}

export default Navbar