import Notification from "../models/Notification.js";
import { getReceiverSocketId, getIO } from "../config/socket.js";

export const sendNotification = async ({
  sender = null,
  receiver,
  booking = null,
  chat = null,
  title,
  message,
  type = "admin",
  couponCode = "",
  redeemCode = "",
  image = "",
}) => {
  try {
    // Save notification
    const notification = await Notification.create({
      sender,
      receiver,
      booking,
      chat,
      title,
      message,
      type,
      couponCode,
      redeemCode,
      image,
    });

    // Populate notification
    const populatedNotification = await Notification.findById(notification._id)
      .populate("sender", "fullName profileImage")
      .populate("booking");

    const socketId = getReceiverSocketId(receiver?.toString());

    if (socketId) {
      // Send new notification
      getIO().to(socketId).emit("new-notification", populatedNotification);

      // Update unread count
      const unreadCount = await Notification.countDocuments({
        receiver,
        isRead: false,
        isDeleted: false,
      });

      getIO().to(socketId).emit("notification-count", unreadCount);
    }

    return populatedNotification;
  } catch (error) {
    console.log("Notification Error:", error.message);
  }
};
