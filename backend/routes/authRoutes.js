// import the express router to route the queries from the client to the appropriate function
import express from 'express';
export const authRouter = express.Router();

// import the functions that retrieve the information from the database
import { 
    register, login, logout
} from '../controllers/authController.js';

// register the user
authRouter.post('/register', register);

// login the user
authRouter.post('/login', login);

// logout the user
authRouter.get('/logout', logout);