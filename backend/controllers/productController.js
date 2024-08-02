// import the database connection
import { pool } from "../db/connect.js";

// import the custom errors
import * as CustomError from "../errors/index.js";

// import the HTTP status codes
import { StatusCodes } from "http-status-codes";

// get all the items from the database
export const getAllItems = async (req, res) => {
  // sql query to get all items
  const [rows] = await pool.query("SELECT * FROM Items");

  if (!rows[0]) {
    throw new CustomError.NotFoundError("Invalid query");
  }

  // return the items
  res.status(StatusCodes.OK).send(rows);
};

// get items specified by ID
export const getSingleItem = async (req, res) => {
  // extract the item ID
  const id = req.params.id;

  // sql query to get the item by ID
  const [rows] = await pool.query(
    `
        SELECT * 
        FROM Items 
        WHERE id = ?
        `,
    [id]
  );

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};

// get item by name
export const getItemsByName = async (req, res) => {
  // extract the name
  const name = req.params.name;

  // sql query to get the items by name
  const [rows] = await pool.query(
    `
        SELECT * 
        FROM Items 
        WHERE name = ?
        `,
    [name]
  );

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};

// get the items filtered by specific category
export const getItemsByCategory = async (req, res) => {
  // extract the category
  const category = req.params.category;

  // sql query to get items by category
  const [rows] = await pool.query(
    `
        SELECT * 
        FROM Items 
        WHERE category = ?
        `,
    [category]
  );

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};

// get the items filtered by specific brand
export const getItemsByBrand = async (req, res) => {
  // extract the brand
  const brand = req.params.brand;

  // sql query to get items by brand
  const [rows] = await pool.query(
    `
        SELECT * 
        FROM Items 
        WHERE brand = ?
        `,
    [brand]
  );

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};

// get the items filtered by specific size
export const getItemsBySize = async (req, res) => {
  // extract the size
  const size = req.params.size;

  // sql query to get items by size
  const [rows] = await pool.query(
    `
        SELECT * 
        FROM Items 
        WHERE size = ?
        `,
    [size]
  );

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};

// get the items filtered by specific color
export const getItemsByColor = async (req, res) => {
  // extract the color
  const color = req.params.color;

  // sql query to get items by color
  const [rows] = await pool.query(
    `
        SELECT * 
        FROM Items 
        WHERE color = ?
        `,
    [color]
  );

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};

// get the items sorted by price
export const getItemsSortedByPriceAsc = async (req, res) => {
  // sql query to sort items by price ascending
  const [rows] = await pool.query(`
        SELECT *
        FROM Items
        ORDER BY price ASC;
        `);

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};
export const getItemsSortedByPriceDesc = async (req, res) => {
  // sql query to sort items by price descending
  const [rows] = await pool.query(`
        SELECT *
        FROM Items
        ORDER BY price DESC;
        `);

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};

// get the items sorted by name alphabetically
export const getItemsSortedByNameAsc = async (req, res) => {
  // sql query to sort items by name ascending
  const [rows] = await pool.query(`
          SELECT *
          FROM Items
          ORDER BY name ASC;
          `);

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};
export const getItemsSortedByNameDesc = async (req, res) => {
  // sql query to sort items by name descending
  const [rows] = await pool.query(`
          SELECT *
          FROM Items
          ORDER BY name DESC;
          `);

  // raise an error if no item found
  if (!rows[0]) {
    throw new CustomError.NotFoundError("No item found");
  }

  res.status(StatusCodes.OK).send(rows);
};
