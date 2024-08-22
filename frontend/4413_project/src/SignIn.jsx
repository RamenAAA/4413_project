import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

function SignIn() {
    const form = useRef(null);
    const [loggedIn, setLoggedIn] = useState(null);
    const [hidden, setHidden] = useState(true);
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;

    const redirect = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        var info = new FormData(form.current);
        try {
            info = Object.fromEntries(info.entries());
            const jsonInfo = JSON.stringify(info);
            console.log(jsonInfo);
            let url = `http://${host}:${port}/api/v1/auth/login`;

            // fetch response from backend
            const response = await fetch(url, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonInfo,
            });
            if (!response.ok) {
                throw new Error('bad response');
            }
            // successful login
            localStorage.setItem("isLoggedIn", "true");
            setLoggedIn("true");
        } catch (error) {
            setHidden(false);
            console.error('error signing in:', error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") == "true") {
            setTimeout(() => {
                redirect("/home");
            }, 1500);
        }
    }, [, loggedIn]);


    return (
        <div className="signin">
            {localStorage.getItem("isLoggedIn") != "true" ? (
                <div>
                    <h2 className="signInHeader">Sign In</h2><div>
                        <form ref={form} onSubmit={login}>
                            <p>Email</p>
                            <input type="text" name="email" placeholder="Email" className="userInput" />
                            <p>Password</p>
                            <input type="password" name="password" placeholder="Password" className="passInput" />
                            <br></br>
                            <p hidden={hidden} style={{ color: "red"}}>Login failed. Wrong credentials or account doesn't exist.</p>
                            <p><button type="submit" className='signInButton'>Sign in</button></p>
                            <p><Link to="/signup">Don't have an account? Sign up now.</Link></p>
                        </form></div>
                </div>
            ) : (
                <><p>You are logged in.</p><p>Redirecting...</p></>
            )}

        </div>


    );
}

export default SignIn