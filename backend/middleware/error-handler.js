// import the HTTP status codes
import { StatusCodes } from 'http-status-codes';

// create the error handler middleware
export const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set the default message
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong. Try again later.',
    };

    return res.status(customError.statusCode).json({ msg: customError.msg });
};