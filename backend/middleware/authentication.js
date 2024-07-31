// import custom errors and token validation from Utils
import * as CustomError from "../errors/index.js";
import { isTokenValid } from "../Utils/index.js";

// function to authenticate user
export const authenticateUser = async (req, res, next) => {
  // get the token
  const token = req.signedCookies.token;

  // if no token present, throw an error
  if (!token) {
    throw new CustomError.UnauthenticatedError("Autentication Invalid");
  }

  // verify the token, if present
  try {
    // check the data inside the token
    const { name, userId, role } = isTokenValid({ token });

    // put the user information in the request
    req.user = { name: name, userId: userId, role: role };

    // pass the token to the function that is calling this method
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Autentication Invalid");
  }
};

// function to authorize users for admin level functionalities
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // get the user role
    const userRole = req.user.role;

    // raise an error if the user is not one of the accepted roles
    if (!roles.includes(userRole)) {
      throw new CustomError.UnauthorizedError("Access denied");
    }
    next();
  };
};
