// import the SQL database pool, HTTP status codes, and custom error messages
import { pool } from '../db/connect.js';
import { StatusCodes } from 'http-status-codes';
// import * as CustomError from '../errors';
import { hash, compare } from '../Utils/password.js';


export async function register(firstName, lastName, email, password, role, phone) {
    // hash the password
    const hashedPassword = hash(password);

    // create a new user
    const [ result ] = await pool.query(`
        INSERT INTO Users (firstName, lastName, email, password, role, phone) 
        VALUES (?,?,?,?,?,?)
        `, [firstName, lastName, email, hashedPassword, role, phone]);

    return result.insertId;
}

export async function login(email, password) {
    // check if the email or password exists
    if(!email || !password) {
        return StatusCodes.BAD_REQUEST;
    }

    // retrieve the user
    const [ result ] = await pool.query(`
        SELECT * FROM Users WHERE email=?
        `, [email]);

    // check if the user exists
    if( result === 0) {
        return StatusCodes.UNAUTHORIZED;
    }

    // compare the passwords
    const match = compare(password, result[0].password);

    // check if the passwords matched
    if(match) {
        return result;
    } else {
        return StatusCodes.UNAUTHORIZED;
    }
}

export async function logout() {

}