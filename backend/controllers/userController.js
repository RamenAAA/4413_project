import { StatusCodes } from "http-status-codes";
import { pool } from "../db/connect.js";
import "../errors/index.js";

// get the user information for the user specified by id parameter
export const getSingleUser = async (req, res) => {
  // get the user id
  const userId = req.params.id;

  //query the database for the user with the specified id
  const [result] = await pool.query(
    `
        SELECT firstName, lastName, email, phone FROM Users
        WHERE id = ?
        `,
    [userId]
  );

  // check if the user exists
  if (!result[0]) {
    throw new BadRequestError("The user does not exist");
  }

  res.status(StatusCodes.OK).send(result[0]);
};

// get the information for the current user
export const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).send(req.user);
};

// update the user information
export const updateUser = async (req, res) => {
  res.send("update user info route");
};

// update the user password
export const updateUserPassword = async (req, res) => {
  res.send("update user info route");
};
