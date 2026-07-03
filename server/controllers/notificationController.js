// import Notification from "../models/Notification.js";

// //Get User Notifications
// export const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({
//       receiver: req.params.userId,
//     })
//       .populate("sender", "fullName profileImage")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       notifications,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //Mark Notification as Read
// export const markAsRead = async (req, res) => {
//   try {
//     const notification = await Notification.findByIdAndUpdate(
//       req.params.notificationId,
//       {
//         isRead: true,
//       },
//       {
//         new: true,
//       },
//     );

//     res.status(200).json({
//       success: true,
//       notification,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Delete Notification
// export const deleteNotification = async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.notificationId);

//     res.status(200).json({
//       success: true,
//       message: "Notification deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //Notification Count
// export const getUnreadCount = async (req, res) => {
//   try {
//     const count = await Notification.countDocuments({
//       receiver: req.params.userId,
//       isRead: false,
//     });

//     res.status(200).json({
//       success: true,
//       count,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Mark all chat notifications as read
// export const markChatNotificationsAsRead = async (req, res) => {
//   try {
//     const { userId, chatId } = req.body;

//     const result = await Notification.updateMany(
//       {
//         receiver: userId,
//         chat: chatId,
//         type: "chat",
//         isRead: false,
//       },
//       { isRead: true },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Chat notifications marked as read",
//       updatedCount: result.modifiedCount,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





import Notification from "../models/Notification.js";
import { getIO, getReceiverSocketId } from "../config/socket.js";

// Get All Notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.params.userId,
      isDeleted: false,
    })
      .populate("sender", "fullName profileImage")
      .populate("booking")
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

// Unread Count
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      receiver: req.params.userId,
      isRead: false,
      isDeleted: false,
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

// Mark Single Read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    const unread = await Notification.countDocuments({
      receiver: notification.receiver,
      isRead: false,
      isDeleted: false,
    });

    const socketId = getReceiverSocketId(notification.receiver.toString());

    if (socketId) {
      getIO().to(socketId).emit("notification-count", unread);
    }

    res.status(200).json({
      success: true,
      notification,
      unread,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark All Read
export const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        receiver: req.params.userId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    const socketId = getReceiverSocketId(req.params.userId);

    if (socketId) {
      getIO().to(socketId).emit("notification-count", 0);
    }

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isDeleted = true;

    await notification.save();

    const unread = await Notification.countDocuments({
      receiver: notification.receiver,
      isRead: false,
      isDeleted: false,
    });

    const socketId = getReceiverSocketId(notification.receiver.toString());

    if (socketId) {
      getIO().to(socketId).emit("notification-count", unread);
    }

    res.json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Chat Notifications Read
export const markChatNotificationsAsRead = async (req, res) => {
  try {
    const { userId, chatId } = req.body;

    await Notification.updateMany(
      {
        receiver: userId,
        chat: chatId,
        type: "chat",
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    const unread = await Notification.countDocuments({
      receiver: userId,
      isRead: false,
      isDeleted: false,
    });

    const socketId = getReceiverSocketId(userId);

    if (socketId) {
      getIO().to(socketId).emit("notification-count", unread);
    }

    res.json({
      success: true,
      unread,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Chat Notifications for a user coming online
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