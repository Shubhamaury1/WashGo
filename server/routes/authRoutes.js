import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getUsers,
  googleLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password",forgotPassword);

router.post("/verify-otp",verifyOtp);

router.post("/reset-password", resetPassword);

router.get("/users", getUsers);

router.post("/google-login", googleLogin);
export default router;
