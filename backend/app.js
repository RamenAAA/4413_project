import dotenv from "dotenv";
dotenv.config();

// import async error handlers to handle errors from the controllers
import "express-async-errors";

// import express
import express from "express";
const app = express();

// import the cookie parser package
import pkg from "cookie-parser";
const cookieParser = pkg;

// import express file upload package for image upload
import pkg from 'express-fileupload';
const fileUpload = pkg;

// import database
import { pool } from "./db/connect.js";

// import routers
import { productRouter } from "./routes/productRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

// import error handlers
import { notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

// setup the express routes
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// setup the public folder for image uploads
app.use(express.static('./public'));
app.use(fileUpload());

// add the home router
app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

// use the routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

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
