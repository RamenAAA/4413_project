// import the database connection
import { pool } from "../db/connect.js";

// import the custom errors
import * as CustomError from "../errors/index.js";

// import the HTTP status codes
import { StatusCodes } from "http-status-codes";

// import checkPermisssions function
import { checkPermissions } from "../Utils/index.js";

// function to create a review
export const createReview = async (req, res) => {
  // extract the information from req.body
  const { itemID, userID, rating, comment, reviewDate } = req.body;

  // check if the item exists
  const [result] = await pool.query(`SELECT * FROM Items WHERE id=?`, [itemID]);

  // raise an error if the product does not exist
  if (!result[0]) {
    throw new CustomError.NotFoundError("No product found");
  }

  // check if user has already submitted a review
  [result] = await pool.query(`SELECT * FROM Reviews WHERE userID=?`, [userID]);

  // raise an error if the review already exists
  if (!result[0]) {
    throw new CustomError.BadRequestError("Review already exists");
  }

  // create a new review
  await pool.query(
    `INSERT INTO Reviews (itemID, userID, rating, comment, reviewDate) VALUES (?,?,?,?,?)`,
    [itemID, userID, rating, comment, reviewDate]
  );

  res.status(StatusCodes.CREATED).send("Review added");
};

// function to get all reviews for a specific product
export const getAllReviews = async (req, res) => {
  // extract the item ID
  const itemID = req.params.itemID;

  // get all reviews for a specific product
  const [result] = pool.query(`SELECT * FROM Reviews WHERE itemID=?`, [itemID]);

  // raise an error if reviews do not exist
  if (!result[0]) {
    throw new CustomError.NotFoundError("No reviews found");
  }

  res.status(StatusCodes.OK).send(result);
};

// function to get single review
export const getSingleReview = async (req, res) => {
  // extract the review ID
  const id = req.params.id;

  // get single review
  const [result] = await pool.query(`SELECT * FROM Reviews WHERE id=?`, [id]);

  // raise an error if review does not exist
  if (!result[0]) {
    throw new CustomError.NotFoundError("No review found");
  }

  res.status(StatusCodes.OK).send(result);
};

// function to update review
export const updateReview = async (req, res) => {
  // extract the review ID
  const id = req.params.id;

  // extract the updated information
  const { rating, comment, reviewDate } = req.body;

  // get the review
  const [result] = await pool.query(`SELECT * FROM Reviews WHERE id=?`, [id]);

  // raise an error if review does not exist
  if (!result[0]) {
    throw new CustomError.NotFoundError("No review found");
  }

  // check permissions that the user who is requesting the deletion is the owner of that review
  checkPermissions(req.user, result[0].userID);

  // if everything is correct, delete the review
  await pool.query(
    `UPDATE Reviews SET rating=?, comment=?, reviewDate=? WHERE id=?`,
    [rating, comment, reviewDate, id]
  );

  req.status(StatusCodes.OK).send("Review updated");
};

// function to delete review
export const deleteReview = async (req, res) => {
  // extract the review ID
  const id = req.params.id;

  // get the review
  const [result] = await pool.query(`SELECT * FROM Reviews WHERE id=?`, [id]);

  // raise an error if review does not exist
  if (!result[0]) {
    throw new CustomError.NotFoundError("No review found");
  }

  // check permissions that the user who is requesting the deletion is the owner of that review
  checkPermissions(req.user, result[0].userID);

  // if everything is correct, delete the review
  await pool.query(`DELETE FROM Reviews WHERE id=?`, [id]);

  req.status(StatusCodes.OK).send("Review deleted");
};
