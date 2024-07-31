// import the dotenv package
import dotenv from 'dotenv';
dotenv.config();

// import the JWT package
import * as jwt from 'jsonwebtoken';

// function to create a JWT token
export const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_LIFETIME
    });
    return token;
};

// function to verify the token
export const isTokenValid = ({token}) => jwt.verify(token, process.env.JWT_SECRET);

// function to create and attach cookies that contain the token
export const attachCookiesToResponse = ({res,user}) => {
    // create the token with the user information
    const token = createJWT({payload:user});

    // create the cookie
    const expiry = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + expiry),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
};