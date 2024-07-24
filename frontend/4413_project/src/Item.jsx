import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import { PRODUCTS } from './products.js';

function Item(){
    const { id } = useParams(); 
    const product = PRODUCTS.find(p => p.id === parseInt(id));
    
    return(
        <div className="item">
            <img src="https://via.placeholder.com/500"></img>
            <div className="description">            
            <h2>{product.productName}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button>Add to Cart</button>
                <p><Link to="/home"> Go back to home </Link></p>
            </div>

        </div>
    );
}

export default Item