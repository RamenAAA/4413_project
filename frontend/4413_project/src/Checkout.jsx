import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CartItems from "./CartItems";
import { getCart } from "./cartFunctions"

function Checkout() {
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;

    const [products, setProducts] = useState([]);
    const [useCustom, setCustom] = useState(false);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("Canada");
    const [postal, setPostal] = useState("");
    const [display, setDisplay] = useState("none");


    // get the values passed from cart via state
    const { state } = useLocation();
    const { totalQuantity, orderTotal } = state;
    const navigate = useNavigate();

    const handleOrder = async (event) => {
        event.preventDefault();

        console.log(localStorage.getItem("cart"));
        var customAddress = [];

        if (useCustom) {
            customAddress = {
                street: street,
                city: city,
                province: province,
                country: country,
                postal: postal
            }
        }

        if (Object.values(customAddress).some(info => info == null || info == "") ) {          
            setDisplay("");
            return;
        }

        try {
            let url = `http://${host}:${port}/api/v1/orders`;

            const response = await fetch(url, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: JSON.parse(localStorage.getItem("cart")),
                    customAddress: customAddress
                }),
            });
            if (!response.ok) {
                throw new Error('bad response');
            }
            // successful order, empty cart and send to order summary page
            const resp = await response.json();
            localStorage.removeItem("cart");
            navigate("/ordersummary", { state: { orderID: resp.orderID, fromRedirect: true } });

        } catch (error) {
            console.error('error processing order:', error);
        }
    }

    // this is here because cartItems requires a function because of Cart, easy fix
    const useless = () => {}

    const toggleCustom = () => {
        setCustom(!useCustom);
    }

    useEffect(() => {
        getCart(setProducts);
    }, []);

    return (
        <div className="checkout">
            <h2 className="pageHeader">Checkout</h2>
            <div className="checkout-container">
                <div className="checkoutItems">
                    {products.length > 0 ? (
                        products.map(product => (
                            <CartItems key={product.id} product={product} onQuantityChange={useless} editable={false} />
                        ))
                    ) : (
                        <p>No products in cart</p>
                    )}

                    <div className="shipping">
                        <h3>Shipping Address:</h3>
                        <input name="address" id="default" type="radio" onChange={toggleCustom} defaultChecked />
                        <label htmlFor="default"><b>Use Default Address</b></label>
                        <br /><br />
                        <input name="address" id="custom" type="radio" onChange={toggleCustom} />
                        <label htmlFor="custom"><b>Use custom shipping address</b></label>

                        {useCustom ? (
                            <div>
                                <p style={{ color: "red", display: display }}><b>Please input correct shipping information into all fields</b></p>
                                <p>Street Address</p>
                                <input type="text" name="street" placeholder="Street Address" className="billAdrInput" value={street} onChange={(e) => { setStreet(e.target.value) }} required />
                                <p>City</p>
                                <input type="text" name="city" placeholder="City" className="billAdrInput" value={city} onChange={(e) => { setCity(e.target.value) }} required />
                                <p>Province</p>
                                <input type="text" name="province" placeholder="Province" className="billAdrInput" value={province} onChange={(e) => { setProvince(e.target.value) }} required />
                                <p>Country</p>
                                <input type="text" name="country" placeholder="Country" className="billAdrInput" value={country} onChange={(e) => { setCountry(e.target.value) }} required />
                                <p>Postal Code</p>
                                <input type="text" name="postalCode" placeholder="Postal Code" className="billAdrInput" value={postal} onChange={(e) => { setPostal(e.target.value) }} required />
                            </div>
                        ) : (<></>)}
                    </div>
                </div>

                <div className="order-container">
                    <div className="orderText">
                        <p>Total Quantity: {totalQuantity}</p>
                        <h3><b>Order Total: ${orderTotal.toFixed(2)}</b></h3>
                    </div>
                    <Link to="/order">
                        <button className="checkoutButton" onClick={handleOrder}>Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
