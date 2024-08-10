import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

function Home() {
    const [category, setCategory] = useState('all');
    const [brand, setBrand] = useState('all');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;

    // fetch products from api
    const fetchProducts = async() => {
        try {
            let url = `http://${host}:${port}/api/v1/products/`;

            // filter by category or brand
            if (category !== 'all') {
                url += '/filter/category/' + category;
            } else if (brand !== 'all') {
                url += '/filter/brand/' + brand;
            }

            // fetch response from backend
            const response = await fetch(url, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('bad response');
            }
            // get data from reponse and set products const as the items returned
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.');
        }
    };

    // Fetch all products on initial load
    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch filtered products when a filter changes
    useEffect(() => {
        fetchProducts();
    }, [category, brand]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setBrand("all");
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
        setCategory("all");
    };

    return (
        <div className="home">
            <h2 className="pageHeader">For Sale</h2>
            <div className="filters">
                <label>
                    Filter by category:&nbsp;
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="all">All</option>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Outerwear">Outerwear</option>
                    </select>
                </label>
                <label>
                    &nbsp;by brand:&nbsp;
                    <select value={brand} onChange={handleBrandChange}>
                        <option value="all">All</option>
                        <option value="BrandA">Brand A</option>
                        <option value="BrandB">Brand B</option>
                        <option value="BrandC">Brand C</option>
                    </select>
                </label>
            </div>
            <div className="products">
                {!error && products.length > 0 ? (
                    products.map(product => (
                        <Card key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
}

export default Home;