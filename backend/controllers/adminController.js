// import the database connection
import { pool } from "../db/connect.js";

// import the custom errors
import * as CustomError from "../errors/index.js";

// import the HTTP status codes
import { StatusCodes } from "http-status-codes";

// import the ID generator from Utils
import { generateID } from "../Utils/index.js";

// import the path module for uploading images
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create a new product
export const createProduct = async (req, res) => {
  // extract the information provided by the admin
  const { name, description, category, brand, size, color, quantity, price } =
    req.body;

  // generate a new UUID
  const id = generateID();

  // insert the data into the database
  const [result] = await pool.query(
    `
    INSERT INTO 
    Items (id, name, description, category, brand, size, color, price, quantity) 
    VALUES (?,?,?,?,?,?,?,?,?)
    `,
    [id, name, description, category, brand, size, color, price, quantity]
  );

  // raise an error if the insertion was unsuccessful
  if (!result) {
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
  await pool.query(`DELETE FROM Items WHERE id = ?`, id);

  res.status(StatusCodes.OK).send("Item deleted");
};

// upload the product image
export const uploadImage = async (req, res) => {
  // check if the image file is uploaded or not
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  // get the product ID for the image
  const productID = req.params.id;

  // get the image data
  const productImage = req.files.image;

  // raise an error if the selected file type is not an image
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  // set the max upload size
  const maxSize = 1024 * 1024;

  // raise an error if the image size exceeds max size
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please Upload Image smaller than 1MB"
    );
  }

  // set the image path to the public/uploads
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  // move the image to the uploads folder
  await productImage.mv(imagePath);

  // add the image path to the database
  await pool.query(
    `UPDATE Items
     SET image = ?
     WHERE id = ?`,
    [imagePath, productID]
  );

  res.status(StatusCodes.OK).send(`/uploads/${productImage.name}`);
};
