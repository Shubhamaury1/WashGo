import express from "express";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
  getUnreadCount,
  clearChatNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/:userId", getNotifications);

router.get("/count/:userId", getUnreadCount);

router.put("/read/:notificationId", markAsRead);

router.delete("/:notificationId", deleteNotification);

router.delete("/:userId/:chatId", clearChatNotifications);

export default router;
