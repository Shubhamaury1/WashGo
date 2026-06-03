import express from "express";

import {
  createBooking,
  getBookings,
  getBookingsByUser,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/", getBookings);

router.get("/user/:userId", getBookingsByUser);
export default router;
