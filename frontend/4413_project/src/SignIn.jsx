import React from 'react';
import { Link } from 'react-router-dom';

function SignIn(){
    return (
        <div className="signin">
            <h2 className="pageHeader">Sign In</h2>
            <div>
                <p>Username</p>
                <input type="text" placeholder="Username" className="user"/>
                <p>Password</p>
                <input type="password" placeholder="Password" className="pass"/>
                <br></br>
                <p><button type="submit">Sign in</button></p>
                <p><Link to="/signup">Don't have an account? Sign up now.</Link></p>
            </div>

        </div>
        

    );
}

export default SignIn