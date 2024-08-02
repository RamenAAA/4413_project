// import the database connection
import { pool } from "../db/connect.js";

// import the custom errors
import * as CustomError from "../errors/index.js";

// import the HTTP status codes
import { StatusCodes } from "http-status-codes";

// import the ID generator from Utils
import { generateID } from "../Utils/index.js";

// create a new product
export const createProduct = async (req, res) => {
  // extract the information provided by the admin
  const { name, description, category, brand, size, color, quantity, price } =
    req.body;

  // generate a new UUID
  const id = generateID();

  // insert the data into the database
  const [result] = pool.query(
    `
    INSERT INTO 
    Items (id, name, description, category, brand, size, color, price, quantity) 
    VALUES (?,?,?,?,?,?,?,?,?)
    `,
    [id, name, description, category, brand, size, color, price, quantity]
  );

  // raise an error if the insertion was unsuccessful
  if (!result[0]) {
    throw new CustomError.BadRequestError("Operation unsuccessful");
  }

  res.status(StatusCodes.OK).send("Item inserted");
};

// update an existing product
export const updateProduct = async (req, res) => {
  // extract the information
  const { name, description, category, brand, size, color, quantity, price } =
    req.body;

  const id = req.params.id;

  // update the product specified by id
  await pool.query(
    `UPDATE Items
     SET name = ?, description = ?, category = ?, brand = ?, size = ?, color = ?, quantity = ?, price = ?
     WHERE id = ?`,
    [name, description, category, brand, size, color, quantity, price, id]
  );

  // send a OK status
  res.status(StatusCodes.OK).send("Item updated");
};

// delete an existing product
export const deleteProduct = async (req, res) => {
  // get the id
  const id = req.params.id;

  // delete the product
  await pool.query(`DELETE FROM Items WHERE id = ?`, [id]);

  res.status(StatusCodes.OK).send("Item deleted");
};
