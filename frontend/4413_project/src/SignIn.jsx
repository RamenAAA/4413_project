import React from 'react';
import { Link } from 'react-router-dom';

function SignIn(){
    return (
        <div className="signin">
            <h2 className="signInHeader">Sign In</h2>
            <div>
                <p>Username</p>
                <input type="text" placeholder="Username" className="userInput"/>
                <p>Password</p>
                <input type="password" placeholder="Password" className="passInput"/>
                <br></br>
                <p><button type="submit" className='signInButton'>Sign in</button></p>
                <p><Link to="/signup">Don't have an account? Sign up now.</Link></p>
            </div>

        </div>
        

    );
}

export default SignIn