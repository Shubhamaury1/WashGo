import Notification from "../models/Notification.js";

/**
 * Get User Notifications
 */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.params.userId,
    })
      .populate("sender", "fullName profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Mark Notification as Read
 */
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Notification
 */
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.notificationId);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Notification Count
 */
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      receiver: req.params.userId,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Clear Chat Notifications for a user coming online
 */
export const clearChatNotifications = async (req, res) => {
  try {
    const { userId, chatId } = req.params;

    await Notification.deleteMany({
      receiver: userId,
      chat: chatId,
      type: "chat",
    });

    res.status(200).json({
      success: true,
      message: "Chat notifications cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
