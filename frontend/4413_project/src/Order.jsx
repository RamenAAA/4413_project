import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Order() {
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;

    const { state } = useLocation();
    const { orderID, fromRedirect } = state;
    const [summary, setSummary] = useState(false);
    const hasRun = useRef(false);
    const navigate = useNavigate();

    const updateOrder = async () => {
        try {
            let url = `http://${host}:${port}/api/v1/orders/${orderID}`;

            const response = await fetch(url, {
                method: "PATCH",
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('bad response');
            }
            console.log(response);
            navigate('.', {replace: true, state: { ...state, fromRedirect: false}});
        } catch (error) {
            console.error('error processing order:', error);
        }
    }

    // get some of the order information as a small summary
    const getSummary = async () => {
        try {
            let url = `http://${host}:${port}/api/v1/orders/${orderID}`;

            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error('bad response');
            }
            const resp = await response.json();
            console.log(resp);
            setSummary(resp);
        } catch (error) {
            console.error('error fetching summary:', error);
        }
    }

    useEffect(() => {
        // fromRedirect ensures that the backend is only updated once
        // once updateOrder() runs, it is set to false so a refresh won't call it again
        // hasRun is only needed for dev mode because useEffect runs multiple times in dev mode
        if (fromRedirect && !hasRun.current) {
            updateOrder();
            hasRun.current = true;
          }
    }, []);

    useEffect(() => {
        if (!summary) {
            getSummary();
        }
    }, []);


    return (
        <div className="order">
            <h2 className="signInHeader">Thank you for ordering.</h2>
            <p><b>Order No.</b> #{orderID}</p>
            <div>
                {summary ? (
                    <div>
                        <p><b>Billed To:</b> {summary.firstName} {summary.lastName}</p>
                        <p><b>Billed Address:</b> {summary.billingStreet}, {summary.billingCity}, {summary.billingProvince},&nbsp; 
                        {summary.billingPostalCode}, {summary.billingCountry}
                        </p>
                        <p><b>Your Order Will Be Shipped To:</b> {summary.shippingStreet}, {summary.shippingCity}, {summary.shippingProvince},&nbsp; 
                        {summary.shippingPostalCode}, {summary.shippingCountry}</p>
                        <p><b>Total Paid: </b>${summary.totalAmount}</p>
                    </div>
                ) : (<></>)}
                <p><Link to="/home">Return to home.</Link></p>
            </div>

        </div>


    );
}

export default Order