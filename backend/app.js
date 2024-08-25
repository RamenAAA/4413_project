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
import pkgs from "express-fileupload";
const fileUpload = pkgs;

// import cors to allow cross origin access
import cors from "cors";

// import helmet for securing Express apps
import helmet from "helmet";

// import xss sanitizer for sanitizing user input
import { xss } from "express-xss-sanitizer";

// import SQL sanitizer for sanitizing SQL inputs
import sqlSanitize from "sql-sanitizer";

// import database
import { pool } from "./db/connect.js";

// import routers
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { reviewRouter } from "./routes/reviewRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";

// import error handlers
import { notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

// setup the express routes
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// use cors for all routes
const corsCfg = {
  credentials: true,
  origin: true,
};
app.use(cors(corsCfg));

// use helmet, xss sanitizer, and sql sanitizer

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(xss());
app.use(sqlSanitize);

// setup the public folder for image uploads
app.use(fileUpload());
app.use(express.static('public'));

// add the home router
app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

// use the routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// specify the port to be the port stored in the env variable PORT
const port = process.env.PORT;

// start the server connection
const start = async () => {
  try {
    // connect to the database
    pool;

    // start the server
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
