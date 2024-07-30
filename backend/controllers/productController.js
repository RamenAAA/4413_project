// import the database connection
import { pool } from '../db/connect.js';

// get all the items from the database
export async function getAllItems() {
    // sql query to get all items
    const [ rows ] = await pool.query("SELECT * FROM Items");
    return rows;
}

// get items specified by ID
export async function getSingleItem(ID) {
    // sql query to get the item by ID
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE id = ?
        `, [ID]);

    return rows;
}

// get item by name
export async function getItemsByName(name) {
    // sql query to get the items by name
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE name = ?
        `, [name]);

    return rows;
}

// get the items filtered by specific category
export async function getItemsByCategory(category) {
    // sql query to get items by category
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE category = ?
        `, [category]);

    return rows;
}

// get the items filtered by specific brand
export async function getItemsByBrand(brand) {
    // sql query to get items by brand
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE brand = ?
        `, [brand]);
    return rows;
}

// get the items filtered by specific size
export async function getItemsBySize(size) {
    // sql query to get items by size
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE size = ?
        `, [size]);
    return rows;
}

// get the items filtered by specific color
export async function getItemsByColor(color) {
    // sql query to get items by color
    const [ rows ] = await pool.query(`
        SELECT * 
        FROM Items 
        WHERE color = ?
        `, [color]);
    return rows;
}

// get the items sorted by price
export async function getItemsSortedByPrice(sortAsc) {

    // if sortAsc is true, sort the data in ascending order
    if (sortAsc) {
        // sql query to sort items by price
        const [ rows ] = await pool.query(`
            SELECT *
            FROM Items
            ORDER BY price ASC;
            `);
        return rows;
    } else { // if false, sort the data in descending order
        // sql query to sort items by price
        const [ rows ] = await pool.query(`
            SELECT *
            FROM Items
            ORDER BY price DESC;
            `);
        return rows;
    }
}

// get the items sorted by name alphabetically
export async function getItemsSortedByName(sortAsc) {
    // if sortAsc is true, sort the data in ascending order
    if (sortAsc) {
        // sql query to sort items by name
        const [ rows ] = await pool.query(`
            SELECT *
            FROM Items
            ORDER BY name ASC;
            `);
        return rows;
    } else { // if false, sort the data in descending order
        // sql query to sort items by name
        const [ rows ] = await pool.query(`
            SELECT *
            FROM Items
            ORDER BY name DESC;
            `);
        return rows;
    }
}