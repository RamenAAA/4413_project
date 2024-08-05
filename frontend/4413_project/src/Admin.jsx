import React from 'react';
import { PRODUCTS } from './products';
function Admin(){

    return(
        <div className="admin">
            <div className="sales">
                <h2>Manage Sales History</h2>
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PRODUCTS.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td><button>DELETE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="inventory">
                <h2>Manage Inventory</h2>
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PRODUCTS.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td><button>DELETE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="accounts">
                <h2>Manage User Accounts</h2>
                <table className="account-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PRODUCTS.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td><button>DELETE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        
    );
}

export default Admin