import express from "express";
import {
  createOrder,
  verifyPayment,
  cashOnDelivery,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.post("/cod", cashOnDelivery);

export default router;
