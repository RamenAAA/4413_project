import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addToCart } from "./cartFunctions"

function Item() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [display, setDisplay] = useState("none");

    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;

    // TODO: move these functions to a separate file
    const fetchProduct = async () => {
        try {
            let url = `http://${host}:${port}/api/v1/products/${id}`;

            // fetch response from backend
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('bad response');
            }
            // get data from reponse and set products const as the items returned
            const data = await response.json();
            setProduct(data[0]);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const invokeAdd = () => {
        if (product.quantity < 1) {
            setDisplay("");
            return;
        }
        addToCart(product.id);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div className="item">
            <img src="https://via.placeholder.com/500"></img>
            <div className="description">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={invokeAdd}>Add to Cart</button>
                <p style={{ color: "red", display: display }}>sorry, product out of stock</p>
                <p><Link to="/home"> Go back to home </Link></p>
            </div>

        </div>
    );
}

export default Item