import express from "express";

import {
  sendAdminNotification,
  getCoupons,
  toggleCouponStatus,
  deleteCoupon,
  validateCoupon,
} from "../controllers/adminNotificationController.js";

const router = express.Router();

router.post("/send", sendAdminNotification);

router.get("/coupons", getCoupons);

router.post("/validate-coupon", validateCoupon);

router.put("/toggle/:id", toggleCouponStatus);

router.delete("/:id", deleteCoupon);

export default router;
