// import the express router to route the queries from the client to the appropriate function
import express from "express";
export const userRouter = express.Router();

// import the authentication and authorization functions
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

// import the functions that retrieve the information from the database
import {
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";

// update the user information and password
userRouter.get('/showCurrentUser', authenticateUser, showCurrentUser);
userRouter.patch('/updateUser', authenticateUser, authorizePermissions('admin', 'customer'), updateUser);
userRouter.patch('/updatePassword', authenticateUser, authorizePermissions('admin', 'customer'), updateUserPassword);

// get the single user information
userRouter.get(
  '/user/:id',
  authenticateUser,
  authorizePermissions('admin', 'customer'),
  getSingleUser
);
