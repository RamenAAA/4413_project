import React from 'react';
import { Link } from 'react-router-dom';

function SignUp(){
    return (
        <div className="signup">
            <h2 className="pageHeader">Sign Up</h2>
            <div>
                <p>Username</p>
                <input type="text" placeholder="Username" className="user"/>
                <p>Password</p>
                <input type="password" placeholder="Password" className="pass"/>
                <p>Billing Address</p>
                <input type="text" placeholder="Billing Address" className="user"/>
                <p>Shipping Address</p>
                <input type="text" placeholder="Shipping Address" className="user"/>
                <p><button type="submit">Sign up</button></p>
                <p><Link to="/signin">Already have an account? Sign in now.</Link></p>
            </div>
        </div>
    );
}

export default SignUp