import express from "express";

import {
  createBooking,
  getBookings,
  getBookingsByUser,
  updateBookingStatus,
  getBookingById,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/", getBookings);

router.get("/user/:userId", getBookingsByUser);

router.patch("/:id/status", updateBookingStatus);

router.get("/:id", getBookingById);
export default router;
