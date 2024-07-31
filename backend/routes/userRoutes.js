// import the express router to route the queries from the client to the appropriate function
import express from 'express';
export const userRouter = express.Router();

// import the HTTP status codes to send success and failure codes
import { StatusCodes } from 'http-status-codes';

// import the functions that retrieve the information from the database
import { 
    getSingleUser, updateUser, updateUserPassword
} from '../controllers/userController.js';

// get the single user informatin
userRouter.get('/user', getSingleUser);