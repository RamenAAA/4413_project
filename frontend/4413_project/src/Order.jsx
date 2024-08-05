import React from 'react';
import { Link } from 'react-router-dom';

function Order(){
    return (
        <div className="order">
            <h2 className="signInHeader">Thank you for ordering.</h2>
            <div>

                <p><Link to="/home">Return to home.</Link></p>
            </div>

        </div>
        

    );
}

export default Order