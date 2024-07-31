// import the SQL database pool, HTTP status codes, and custom error messages
import { pool } from '../db/connect.js';
import { StatusCodes } from 'http-status-codes';
import "../errors/index.js";
import { attachCookiesToResponse } from '../Utils/index.js';

export const register = async (req, res) => {
    // extract the information from the request body
    const { firstName, lastName, email, password, role, phoneNum } = req.body;

    // create a new user
    const [ result ] = await pool.query(`
        INSERT INTO Users (firstName, lastName, email, password, role, phone) 
        VALUES (?,?,?,?,?,?)
        `, [firstName, lastName, email, password, role, phone]);

    // variable to hold the user name, id, and role for the token
    const userInfo = {name:firstName, userId:result[0].insertId, role:role}

    // creates a cookie with the authenticating token and sends it as a response
    attachCookiesToResponse({res,user:userInfo});

    // send the user info
    res.status(StatusCodes.CREATED).send({ user : userInfo });
};

export const login = async (req, res) => {
    // get the email and password
    const { email, password } = req.body;

    // check if the email or password exists
    if(!email || !password) {
        throw new CustomError.BadRequestError("Please provide email and password");
    }

    // retrieve the user
    const [ result ] = await pool.query(`
        SELECT * FROM Users WHERE email=?
        `, [email]);

    // check if the user exists
    if(!result[0]) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    // compare the passwords
    const match = (password == result[0].password);

    // check if the passwords matched
    if(match) {
        // get the user information for the token
        const userInfo = { name:result[0].firstName, userId:result[0].id, role:result[0].role }

        // creates a cookie with the authenticating token and sends it as a response
        attachCookiesToResponse({res,user:userInfo});

        res.status(StatusCodes.OK).send("User logged in");
    } else {
        throw new CustomError.UnauthenticatedError("Incorrect Credentials");
    }
};

export const logout = async (req, res) => {
    // remove the cookie
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    // send the 200 status
    res.status(StatusCodes.OK);
};