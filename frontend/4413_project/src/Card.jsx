import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from "./cartFunctions"

function Card({ product }) {
    const [display, setDisplay] = useState("none");

    const invokeAdd = () => {
        if (product.quantity <= 0) {
            setDisplay("");
            return;
        }
        addToCart(product.id);
    };

    return (
        <div className="card">
            <Link to={`/item/${product.id}`}>
                <img src="https://via.placeholder.com/150" alt={product.name} />
            </Link>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button className='addButton' onClick={invokeAdd}>Add to Cart</button>
            <p style={{ color: "red", display: display }}>sorry, product out of stock</p>

        </div>
    );
}

export default Card;