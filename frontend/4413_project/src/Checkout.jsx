import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartItems from "./CartItems";
import { getCart } from "./cartFunctions"

function Checkout() {
    const [products, setProducts] = useState([]);
    const [billingAddress, setBillingAddress] = useState("123 Apple Street, Town, Province Q1W 1E3"); // this should load saved address
    const [shippingAddress, setShippingAddress] = useState("123 Apple Street, Town, Province Q1W 1E3"); // this should load saved address

    const {state} = useLocation();
    const {totalQuantity, orderTotal} = state;

    const handleBillingChange = (e) => {
        setBillingAddress(e.target.value);
    };

    const handleShippingChange = (e) => {
        setShippingAddress(e.target.value);
    };

    // this is here because cartItems requires a function because of Cart, easy fix
    const useless = () => {

    };

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

                    <div className="billing">
                        <h3>Billing Address:</h3>
                        <p><b>Default:</b> {billingAddress}</p>
                        <p>Change billing address:</p>
                        <input
                            type="text" className="addressInput" placeholder="Enter your billing address" value={billingAddress} onChange={handleBillingChange}
                        />
                    </div>

                    <div className="shipping">
                        <h3>Shipping Address:</h3>
                        <p><b>Default:</b> {shippingAddress}</p>
                        <p>Change shipping address:</p>
                        <input type="text" className="addressInput" placeholder="Enter your shipping address" value={shippingAddress} onChange={handleShippingChange} />
                    </div>
                </div>

                <div className="order-container">
                    <div className="orderText">
                        <p>Total Quantity: {totalQuantity}</p>
                        <h3><b>Order Total: ${orderTotal.toFixed(2)}</b></h3>
                    </div>
                    <Link to="/order">
                        <button className="checkoutButton">Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
