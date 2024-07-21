import dotenv from 'dotenv';
dotenv.config();

import err from 'express-async-errors';

// import express
import express from 'express';
const app = express();

// import database
import { testFunc } from './db/connect.js';

// import error handlers
import { notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

// test for database connection
app.get("/test", async (req, res) => {
    const t = await testFunc();
    res.send(t)
});

// setup the express routes
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// specify the port to be the port stored in the env variable PORT
const port = process.env.PORT;

// start the server connection
const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();