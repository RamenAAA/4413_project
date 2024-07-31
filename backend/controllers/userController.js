import { StatusCodes } from "http-status-codes";
import { pool } from "../db/connect.js";
import { CustomAPIError, BadRequestError, UnauthenticatedError, UnauthorizedError, NotFoundError } from "../errors/index.js";

export const getSingleUser = async (req, res) => {
    // get the user id
    const { userId } = req.body;

    //query the database for the user with the specified id
    const [ result ] = await pool.query(`
        SELECT firstName, lastName, email, phone FROM Users
        WHERE id = ?
        `, [userId]);

    // check if the user exists
    if (!result[0]) {
        throw new BadRequestError("The user does not exist");
    }

    res.status(StatusCodes.OK).send(result[0]);
}

export async function updateUser() {
    return "update user info route";
}

export async function updateUserPassword() {
    return "update user password route"
}