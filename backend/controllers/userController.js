import { StatusCodes } from "http-status-codes";
import { pool } from "../db/connect.js";
import "../errors/index.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { attachCookiesToResponse, checkPermissions } from "../Utils/index.js";

// get the user information for the user specified by id parameter
export const getSingleUser = async (req, res) => {
  // get the user id
  const userId = req.params.id;

  //query the database for the user with the specified id
  const [result] = await pool.query(
    `
        SELECT id, firstName, lastName, email, phone FROM Users
        WHERE id = ?
        `,
    [userId]
  );

  // check if the user exists
  if (!result[0]) {
    throw new BadRequestError("The user does not exist");
  }

  // check if the user requesting the information is the actual owner of that information
  checkPermissions(req.user, result[0].id);
  res.status(StatusCodes.OK).send(result[0]);
};

// get the information for the current user
export const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).send(req.user);
};

// update the user information
export const updateUser = async (req, res) => {
  // extract the information from the request body
  const { firstName, lastName, email, password, phone } = req.body;
  const isAdmin = req.user.role == "admin";
  // raise an error if the password is not provided
  if (!isAdmin && !password) {
    throw new BadRequestError("Please provide the password");
  }

  // get the password from the database
  const [result] = await pool.query(
    `SELECT * FROM Users
    WHERE email = ?`,
    [email]
  );

  // verify that the user who is updating the information is the owner or the admin
  checkPermissions(req.user, result[0].id);

  var userId = null;
  const sentUserId = req.body.userId;
  // check which id to use
  if (isAdmin && sentUserId) {
    // admin updating someone else's account
    userId = sentUserId;
  } else userId = req.user.userId; //user updating their own account


  if (!isAdmin) {
    console.log("not admin");
    // if not an admin, then the passwords must match
    if (password !== result[0].password) {
      throw new UnauthenticatedError("Invalid request");
    }
  } else if (userId == req.user.userId) {
    console.log("is admin");
    // if admin is updating their own account, passwords must match
    if (!password) {
      throw new UnauthenticatedError("Invalid request");
    }
    if (password !== result[0].password) {
      console.log("pas no match");
      throw new UnauthenticatedError("Invalid request");
    }
  }
  // if conditions met, update the information for the user
  await pool.query(
    `UPDATE Users
       SET firstName = ?, lastName = ?, phone = ?
       WHERE id = ?`,
    [firstName, lastName, phone, userId]
  );

  // update the user name in the cookies
  req.user.firstName = firstName;
  attachCookiesToResponse({ res, user: req.user });

  // send a OK status
  res.status(StatusCodes.OK).send("User Information updated");
};

// update the user password
export const updateUserPassword = async (req, res) => {
  // get the old password and new password from the request body
  const { oldPassword, newPassword } = req.body;

  // raise an error if one of the two is missing
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please enter the old and new password");
  }

  // get the old password from the database
  const [result] = await pool.query(
    `SELECT password FROM Users
    WHERE id = ?`,
    [req.user.userId]
  );

  // compare the user entered old password and database stored old password
  if (result[0].password !== oldPassword) {
    throw new UnauthenticatedError("Invalid request");
  } else {
    // update the password
    const [result] = await pool.query(
      `UPDATE Users
        SET password = ?
        WHERE id = ?`,
      [newPassword, req.user.userId]
    );
    res.status(StatusCodes.OK).send("Password updated");
  }
};

// get all userId, name, email, phone and role. admin only
export const getAllUsers = async (req, res) => {

  const [result] = await pool.query(
    `SELECT 
      u.id AS userId,
      u.firstName,
      u.lastName,
      u.email,
      u.phone,
      u.role
      FROM
      Users u`,
  );
  res.status(StatusCodes.OK).send(result);
};
