import express from "express";

import {
  createChat,
  getUserChats,
  getChatMessages,
  sendMessage,
  markMessageSeen,
  assignWasher,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/create", createChat);

router.get("/user/:userId", getUserChats);

router.get("/:chatId", getChatMessages);

router.post("/send", sendMessage);

router.put("/seen/:messageId", markMessageSeen);

router.put("/assign-washer", assignWasher);

export default router;
