import dotenv from 'dotenv';
dotenv.config();

import err from 'express-async-errors';

// import express
import express from 'express';
const app = express();

// import database
// TODO: connect to the database in app.js
import { pool } from './db/connect.js';

// import routers
import { router } from './routes/productRoutes.js';
const productRouter = router;

// import error handlers
import { notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

// setup the express routes
app.use(express.json());

// use the routers
app.use('/api/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// specify the port to be the port stored in the env variable PORT
const port = process.env.PORT;

// start the server connection
const start = async () => {
    try {
        // connect to the database
        await pool;

        // start the server
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();