// import the bcrypt library
import * as bcrypt from 'bcryptjs';

export async function hash(password) {
    // get the salt
    const salt = bcrypt.genSalt(10);

    // hash the password
    return bcrypt.hash(password, salt);
}

export async function compare(userPassword, savedPassword) {
    // compare the two passwords
    const isSame = bcrypt.compare(userPassword, savedPassword);

    return isSame;
}