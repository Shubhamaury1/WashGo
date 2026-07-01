import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getUsers,
  googleLogin,
  changePassword,
  updateProfile,
} from "../controllers/authController.js";
import uploadProfile from "../middleware/uploadProfile.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password",forgotPassword);

router.post("/verify-otp",verifyOtp);

router.post("/reset-password", resetPassword);

router.get("/users", getUsers);

router.post("/google-login", googleLogin);

router.put("/change-password", changePassword);

router.put("/update-profile", uploadProfile.single("photo"), updateProfile);
export default router;
