import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [newUserInfo, setNewUserInfo] = useState({});
    const [password, setPassword] = useState("");
    const [updated, setUpdated] = useState(false);
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;

    const navigate = useNavigate();

    const fetchUserInfo = async () => {
        try {
            let url = `http://${host}:${port}/api/v1/users/showCurrentUser/`;

            // fetch basic user info
            var response = await fetch(url, {
                method: "GET",
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('bad response');
            }
            // get userId from response
            var resp = await response.json();
            const id = resp.userId;

            url = `http://${host}:${port}/api/v1/users/user/${id}`;

            // fetch full user info
            response = await fetch(url, {
                method: "GET",
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('bad response');
            }
            resp = await response.json();
            setUserInfo(JSON.parse(JSON.stringify(resp)));
            setNewUserInfo(JSON.parse(JSON.stringify(resp)));
        } catch (error) {
            localStorage.setItem("isLoggedIn", "false");
            console.error('Error fetching profile:', error);
            setError('Failed to fetch profile. Please try again later.');
        }
    };

    const updateProfile = async () => {
        try {
            let url = 'http://' + host + ':' + port + '/api/v1/users/updateUser/';

            newUserInfo.password = password;
            // send request to update information
            const response = await fetch(url, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserInfo)
            });
            if (!response.ok) {
                throw new Error('bad response');
            }
            setUpdated(true);

        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again later.');
        }
    };

    useEffect(() => {
        if (updated) {
            setTimeout(() => {
                setUpdated(false);
                cancel();
            }, 1500);
        }
    }, [updated]);

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") != "true") {
            setTimeout(() => {
                navigate("/signin");
            }, 1500);
        } else fetchUserInfo();
    }, [ , updated]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserInfo({ ...newUserInfo, [name]: value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const cancel = () => {
        //reset the new user information json, so that it is consistent if user clicks edit again
        setNewUserInfo(JSON.parse(JSON.stringify(userInfo)));
        setPassword("");
        toggleEdit();
    };

    return (
        <div className="profile">
            <div className="profileInfo">
                <h2>Profile</h2>
                {isEditing ? (
                    <div>
                        {!updated ? (
                            <><label>
                                First Name:&nbsp;
                                <br />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={newUserInfo.firstName}
                                    onChange={handleInputChange} />
                            </label><br /><br /><label>
                                    Last Name:&nbsp;
                                    <br />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={newUserInfo.lastName}
                                        onChange={handleInputChange} />
                                </label><br /><br /><label>
                                    Email:&nbsp;
                                    <br />
                                    <input
                                        type="email"
                                        name="email"
                                        value={newUserInfo.email}
                                        onChange={handleInputChange} />
                                </label><br /><br /><label>
                                    Phone Number:&nbsp;
                                    <br />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={newUserInfo.phone}
                                        onChange={handleInputChange} />
                                </label><br /><br /><label>
                                    Please verify password to update information:&nbsp;
                                    <br />
                                    <input
                                        type="text"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </label><br /><br /><button onClick={updateProfile}>Save</button><button onClick={cancel}>Cancel</button></>
                        ) : (
                            <><p>Your information has been updated successfully.</p></>
                        )
                        }
                    </div>
                ) : (
                    <div>
                        {localStorage.getItem("isLoggedIn") == "true" ? (
                            <><div>
                                <p>First Name: {userInfo.firstName}</p>
                                <p>Last Name: {userInfo.lastName}</p>
                                <p>Email: {userInfo.email}</p>
                                <p>Phone Number: {userInfo.phone}</p>
                                <button onClick={toggleEdit}>Edit Profile</button>
                            </div>
                                <div className="purchaseHistory">
                                    <h3 className="purchaseHistoryLabel">Purchase History</h3>
                                    <p>Shirt 1</p>
                                    <p>Shirt 2</p>
                                </div></>
                        ) : (
                            <><p>You are not logged in.</p><p>Redirecting...</p></>
                        )
                        }</div>
                )}
            </div>

        </div>
    );
}

export default Profile;
