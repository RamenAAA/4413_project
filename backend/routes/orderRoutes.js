// import express router
import express from "express";
export const orderRouter = express();

// import the authentication and authorization middleware
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

// import the controller functions
import {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} from "../controllers/orderController.js";

orderRouter
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders);

orderRouter
  .route("/showAllMyOrders")
  .get(authenticateUser, getCurrentUserOrders);

orderRouter
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);
