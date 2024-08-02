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
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminController.js";

// import the autentication and authorization middleware
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

// retrives all the products to send to the client
productRouter
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .get(getAllItems);

// retrieve a single product using its ID
productRouter
  .route("/:id")
  .get(getSingleItem)
  .post([authenticateUser, authorizePermissions("admin")], updateProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

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
