import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { fetchProducts } from './apiCalls.js';

function Home() {
    const [category, setCategory] = useState('all');
    const [brand, setBrand] = useState('all');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // fetch products from api

    const loadProducts = async () => {
        try {
            const data = await fetchProducts(category, brand);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.');
        }
    };

    useEffect(() => {
        loadProducts();
    }, [, category, brand]);

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