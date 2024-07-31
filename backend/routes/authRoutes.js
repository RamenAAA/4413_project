// import the express router to route the queries from the client to the appropriate function
import express from 'express';
export const authRouter = express.Router();

// import the HTTP status codes to send success and failure codes
import { StatusCodes } from 'http-status-codes';

// import the functions that retrieve the information from the database
import { 
    register, login, logout
} from '../controllers/authController.js';

// register the user
authRouter.post('/register', register);

// login the user
authRouter.post('/login', login);
authRouter.route('/login').post( async (req, res) => {
    try{
        

        const result = await login(email, password);

        // check if the result returned an error
        if (result == StatusCodes.BAD_REQUEST || result == StatusCodes.UNAUTHORIZED) {
            res.status(result);
        } else {
            res.status(StatusCodes.OK).json({ result });
        }
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND)
    }
});

// logout the user
authRouter.route('/logout').get( async (req, res) => {
    try{
        await logout();
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND)
    }
});