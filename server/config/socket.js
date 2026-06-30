import { Server } from "socket.io";

let io;

// Store Online Users
const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);

     // User Login
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);

      const onlineList = [...onlineUsers.keys()];
      console.log("Online Users:", onlineList.length, "users");

      io.emit("online-users", onlineList);

      // Emit user-online event to notify others
      socket.broadcast.emit("user-online", userId);
    });

     // Join Chat Room
    socket.on("join-chat", (chatId) => {
      socket.join(chatId);

      console.log(`Socket ${socket.id} joined room ${chatId}`);
    });


     //Typing Start
    socket.on("typing", ({ chatId, sender }) => {
      socket.to(chatId).emit("typing", sender);
    });


     // Typing Stop
    socket.on("stop-typing", ({ chatId }) => {
      socket.to(chatId).emit("stop-typing");
    });


     // Message Seen
    socket.on("seen", ({ chatId, messageId }) => {
      socket.to(chatId).emit("message-seen", messageId);
    });


     // Disconnect
    socket.on("disconnect", () => {
      console.log("❌ User Disconnected");

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;    
        }
      }

      io.emit("online-users", [...onlineUsers.keys()]);
    });
  });
};

export const getIO = () => io;

export const getReceiverSocketId = (userId) => {
  return onlineUsers.get(userId);
};
