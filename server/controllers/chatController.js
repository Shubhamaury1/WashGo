import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import Notification from "../models/Notification.js";
import { getIO, getReceiverSocketId } from "../config/socket.js";
import User from "../models/User.js";

export const createChat = async (req, res) => {
  try {
    const { bookingId, customerId } = req.body;

    if (!bookingId || !customerId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and Customer ID are required.",
      });
    }

    // Check if chat already exists for this booking
    const existingChat = await Chat.findOne({
      bookingId,
      customer: customerId,
    });

    if (existingChat) {
      return res.status(200).json({
        success: true,
        chat: existingChat,
      });
    }

    // Find Admin
    const admin = await User.findOne({
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Create Chat
    const chat = await Chat.create({
      bookingId,
      customer: customerId,
      admin: admin._id,
      washer: null,
      participants: [customerId, admin._id],
      currentSupport: "admin",
    });

    // Populate before returning
    const populatedChat = await Chat.findById(chat._id)
      .populate("customer", "fullName profileImage role")
      .populate("admin", "fullName profileImage role")
      .populate("washer", "fullName profileImage role")
      .populate("lastMessage");

    return res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chat: populatedChat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.params.userId,
    })
      .populate("customer", "fullName profileImage role")
      .populate("admin", "fullName profileImage role")
      .populate("washer", "fullName profileImage role")
      .populate("lastMessage")
      .sort({
        updatedAt: -1,
      });

    // Remove duplicates - keep only latest chat for each booking
    const uniqueChats = {};
    chats.forEach((chat) => {
      const bookingId = chat.bookingId.toString();
      if (!uniqueChats[bookingId] || new Date(chat.updatedAt) > new Date(uniqueChats[bookingId].updatedAt)) {
        uniqueChats[bookingId] = chat;
      }
    });

    const deduplicatedChats = Object.values(uniqueChats);

    res.status(200).json({
      success: true,
      chats: deduplicatedChats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "fullName")
      .populate("receiver", "fullName")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, sender, text } = req.body;

    // Get Chat
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    let receiver;

    // Customer sending
    if (sender.toString() === chat.customer.toString()) {
      if (chat.currentSupport === "admin") {
        receiver = chat.admin;
      } else {
        receiver = chat.washer;
      }
    }

    // Admin sending
    else if (sender.toString() === chat.admin.toString()) {
      receiver = chat.customer;
    }

    // Washer sending
    else if (chat.washer && sender.toString() === chat.washer.toString()) {
      receiver = chat.customer;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid sender",
      });
    }

    // Save Message
    const message = await Message.create({
      chat: chatId,
      sender,
      receiver,
      text,
    });

    // Update last message
    chat.lastMessage = message._id;
    await chat.save();

    // Populate message
    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "fullName profileImage role")
      .populate("receiver", "fullName profileImage role");

    // Check receiver online
    const receiverSocket = getReceiverSocketId(receiver.toString());
    const io = getIO();

    if (receiverSocket) {
      // Receiver is online - emit to chat room (includes receiver)
      io.to(chatId).emit("receive-message", populatedMessage);
    } else {
      // Receiver offline - save notification instead of emitting
      await Notification.create({
        sender,
        receiver,
        chat: chat._id,
        booking: chat.bookingId,
        title: "New Message",
        message: text,
        type: "chat",
      });
    }

    res.status(201).json({
      success: true,
      message: populatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markMessageSeen = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      {
        seen: true,
      },
      {
        new: true,
      },
    );

    const io = getIO();

    io.to(message.chat.toString()).emit("message-seen", {
      messageId: message._id,
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const assignWasher = async (req, res) => {
  try {

    const { bookingId, washerId } = req.body;

    if (!bookingId || !washerId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and Washer ID are required",
      });
    }

    const chat = await Chat.findOne({
      bookingId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    chat.washer = washerId;

    chat.currentSupport = "washer";

    // Keep admin in participants
    if (!chat.participants.includes(washerId)) {
      chat.participants.push(washerId);
    }

    await chat.save();

    res.status(200).json({
      success: true,
      message: "Washer assigned successfully",
      chat,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};