// import express from "express";

// import {
//   getNotifications,
//   markAsRead,
//   deleteNotification,
//   getUnreadCount,
//   markChatNotificationsAsRead,
//   clearChatNotifications,
// } from "../controllers/notificationController.js";

// const router = express.Router();

// router.get("/:userId", getNotifications);

// router.get("/count/:userId", getUnreadCount);

// router.put("/read/:notificationId", markAsRead);

// router.put("/chat-read", markChatNotificationsAsRead);

// router.delete("/:notificationId", deleteNotification);

// router.delete("/:userId/:chatId", clearChatNotifications);

// export default router;

import express from "express";

import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllRead,
  deleteNotification,
  markChatNotificationsAsRead,
  clearChatNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/:userId", getNotifications);

router.get("/count/:userId", getUnreadCount);

router.put("/read/:notificationId", markAsRead);

router.put("/read-all/:userId", markAllRead);

router.delete("/:notificationId", deleteNotification);

router.put("/chat/read", markChatNotificationsAsRead);

router.delete("/chat/:userId/:chatId", clearChatNotifications);

export default router;