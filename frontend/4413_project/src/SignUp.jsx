import React from 'react';
import { Link } from 'react-router-dom';

function SignUp(){
    return (
        <div className="signup">
            <h2 className="signUpHeader">Sign Up</h2>
            <div>
                <p>Username</p>
                <input type="text" placeholder="Username" className="userInput"/>
                <p>Password</p>
                <input type="password" placeholder="Password" className="passInput"/>
                <p>Billing Address</p>
                <input type="text" placeholder="Billing Address" className="billAdrInput"/>
                <p>Shipping Address</p>
                <input type="text" placeholder="Shipping Address" className="shipAdrInput"/>
                <p><button type="submit" className='signUpButton'>Sign up</button></p>
                <p><Link to="/signin">Already have an account? Sign in now.</Link></p>
            </div>
        </div>
    );
}

export default SignUp