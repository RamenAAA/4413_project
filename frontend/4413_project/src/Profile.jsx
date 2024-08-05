import React, { useState } from 'react';

function Profile() {
    const [isEditing, setIsEditing] = useState(false); 
    const [profile, setProfile] = useState({ //load appropiate profile info
        name: 'John Smith',
        email: 'john.smith@email.com',
        billingAddress: '123 Apple Street',
        shippingAddress: '123 Apple Street',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveProfile = () => {
        toggleEdit();
    };

    return (
        <div className="profile">
            <div className="profileInfo">
                <h2 className="pageHeader">Profile</h2>
                {isEditing ? (
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Billing Address:
                            <input
                                type="text"
                                name="billingAddress"
                                value={profile.billingAddress}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Shipping Address:
                            <input
                                type="text"
                                name="shippingAddress"
                                value={profile.shippingAddress}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <button onClick={saveProfile}>Save</button>
                        <button onClick={toggleEdit}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <p>Name: {profile.name}</p>
                        <p>Email: {profile.email}</p>
                        <p>Billing Address: {profile.billingAddress}</p>
                        <p>Shipping Address: {profile.shippingAddress}</p>
                        <button onClick={toggleEdit}>Edit Profile</button>
                    </div>
                )}
            </div>

            <div className="purchaseHistory">
                <h3 className="purchaseHistoryLabel">Purchase History</h3>
                <p>Shirt 1</p>
                <p>Shirt 2</p>
            </div>
        </div>
    );
}

export default Profile;
