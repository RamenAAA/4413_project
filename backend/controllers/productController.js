// import the database connection
import { pool } from '../db/connect.js';

// get all the items from the database
export async function getAllItems() {
    const [ rows ] = await pool.query("SELECT * FROM Items");
    return rows;
}

// get items specified by ID
export async function getSingleItem(ID) {
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE id = ?
        `, [ID]);


    return rows;
}

// get the items filtered by specific category
export async function getItemsByCategory(category) {
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE category = ?
        `, [category]);
    return rows;
}

// get the items filtered by specific brand
export async function getItemsByBrand(brand) {
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE brand = ?
        `, [brand]);
    return rows;
}

// get the items filtered by specific size
export async function getItemsBySize(size) {
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE size = ?
        `, [size]);
    return rows;
}

// get the items filtered by specific color
export async function getItemsByColor(color) {
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE color = ?
        `, [color]);
    return rows;
}

// get the items sorted by price
export async function getItemsSortedByPrice(sort) {
    const [ rows ] = await pool.query(`
        SELECT *
        FROM Items
        ORDER BY price ?;
        `, [sort]);
    return rows;
}

// get the items sorted by name alphabetically
export async function getItemsSortedByName(sort) {
    const [ rows ] = await pool.query(`
        SELECT *
        FROM Items
        ORDER BY name ?;
        `, [sort]);
    return rows;
}