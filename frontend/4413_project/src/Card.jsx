import React from 'react';
import { Link } from 'react-router-dom';

function Card({ product }) {
    return (
        <div className="card">
            <Link to={`/item/${product.id}`}>
                <img src="https://via.placeholder.com/150" alt={product.productName} />
            </Link>
            <h2>{product.productName}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button className='addButton'>Add to Cart</button>
        </div>
    );
}

export default Card;