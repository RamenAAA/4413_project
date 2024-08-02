// import the express router to route the queries from the client to the appropriate function
import express from "express";
export const productRouter = express.Router();

// import the HTTP status codes to send success and failure codes
import { StatusCodes } from "http-status-codes";

// import the functions that retrieve the information from the database
import {
  getAllItems,
  getSingleItem,
  getItemsByName,
  getItemsByCategory,
  getItemsByBrand,
  getItemsBySize,
  getItemsByColor,
  getItemsSortedByPriceAsc,
  getItemsSortedByPriceDesc,
  getItemsSortedByNameAsc,
  getItemsSortedByNameDesc,
} from "../controllers/productController.js";

// import the admin functions
import {
    createProduct
} from '../controllers/adminController.js';

// import the autentication and authorization middleware
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

// retrives all the products to send to the client
// TODO: add the admin route to create the product here with POST method and add authentication and authorization middleware
productRouter.route("/").get(getAllItems);

// admin route to create a new product
productRouter
  .route("/createProduct")
  .post([authenticateUser, authorizePermissions("admin")], createProduct);

// retrieve a single product using its ID
// TODO: add the admin route to update the single product and delete the single product using PATCH and DELETE
productRouter.route("/:id").get(getSingleItem);

// retrieve the products filtered using name, category, brand, size, and color
productRouter.route("/filter/name/:name").get(getItemsByName); // end of name route

productRouter.route("/filter/category/:category").get(getItemsByCategory); // end of category route

productRouter.route("/filter/brand/:brand").get(getItemsByBrand); // end of brand route

productRouter.route("/filter/size/:size").get(getItemsBySize); // end of size route

productRouter.route("/filter/color/:color").get(getItemsByColor); // end of color route

// retrieve the products sorted by price (ascending and descending) and name (alphabetically ascending and descending)
productRouter.route("/sort/price/asc").get(getItemsSortedByPriceAsc); // end of sort by price ASC route

productRouter.route("/sort/price/desc").get(getItemsSortedByPriceDesc); // end of sort by price DESC route

productRouter.route("/sort/name/asc").get(getItemsSortedByNameAsc); // end of sort by name ASC route

productRouter.route("/sort/name/desc").get(getItemsSortedByNameDesc); // end of sort by name ASC route
