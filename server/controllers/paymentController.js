import crypto from "crypto";
import Payment from "../models/Payment.js";
import razorpay from "../config/razorpayConfig.js";
import { sendNotification } from "../utils/notificationService.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
    console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking,
      user,
      paymentMethod,
      amount,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const payment = await Payment.create({
      booking,
      user,
      amount,
      paymentMethod,
      paymentStatus: "Paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    await sendNotification({
      receiver: user,
      booking,
      title: "Payment Successful",
      message: `Your payment of ₹${amount} has been received successfully.`,
      type: "payment",
    });

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const cashOnDelivery = async (req, res) => {
  try {
    const { booking, user, amount } = req.body;

    const payment = await Payment.create({
      booking,
      user,
      amount,
      paymentMethod: "COD",
      paymentStatus: "Pending",
    });

    await sendNotification({
      receiver: user,
      booking,
      title: "Cash on Delivery Selected",
      message: `Your booking has been confirmed with Cash on Delivery. Amount payable: ₹${amount}.`,
      type: "payment",
    });

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
