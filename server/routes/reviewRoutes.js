import express from "express";
import upload from "../middleware/uploadReview.js";

import {
  createReview,
  getReviewByBooking,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", upload.array("images", 5), createReview);

router.get("/booking/:bookingId", getReviewByBooking);

router.put("/:id", upload.array("images", 5), updateReview);

router.delete("/:id", deleteReview);

export default router;
