// import the express router to route the queries from the client to the appropriate function
import express from "express";
export const reviewRouter = express.Router();

// import the authentication function
import { authenticateUser } from "../middleware/authentication";

// import the review controller
import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";

// route to create a review (authenticated users only) and get all reviews for a specific product
reviewRouter.route("/").post(authenticateUser, createReview);
reviewRouter.route("/:itemID").get(getAllReviews);

// route to get single review, and update and delete reviews by authenticated users only
reviewRouter
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);
