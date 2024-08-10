import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from "./cartFunctions"

function Card({ product }) {

    const invokeAdd = () => {
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
        </div>
    );
}

export default Card;