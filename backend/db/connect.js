// import dotenv to access environment variables
import dotenv from 'dotenv';
dotenv.config();

// import mysql
import mysql from 'mysql2';

// create a database pool with promise() for async connections
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function testFunc() {
    const [ rows ] = await pool.query("SELECT * FROM Users");
    return rows;
}