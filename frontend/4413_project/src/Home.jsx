import React, { useState } from 'react';
import Card from './Card.jsx';
import { PRODUCTS } from './products.js';

function Home() {
    const [category, setCategory] = useState('all');
    const [brand, setBrand] = useState('all');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const filteredProducts = PRODUCTS.filter(product => {
        // Filter by category
        if (category !== 'all' && product.category !== category) return false;
        // Filter by brand
        if (brand !== 'all' && product.brand !== brand) return false;
        return true;
    });

    return (
        <div className="home">
            <h2 className="pageHeader">For Sale</h2>
            <div className="filters">
                <label>
                    Filter by category:&nbsp;
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="all">All</option>
                        <option value="shirt">Shirts</option>
                        <option value="pants">Pants</option>
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
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
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