import express from "express";

import {
  sendAdminNotification,
  getCoupons,
  toggleCouponStatus,
  deleteCoupon,
} from "../controllers/adminNotificationController.js";

const router = express.Router();

router.post("/send", sendAdminNotification);

router.get("/coupons", getCoupons);

router.put("/toggle/:id", toggleCouponStatus);

router.delete("/:id", deleteCoupon);

export default router;
