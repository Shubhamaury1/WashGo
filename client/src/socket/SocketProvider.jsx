import { createContext, useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import socket from "./socket";

import { setConnected, setOnlineUsers } from "../redux/socketSlice";
import notificationApi from "../api/notificationApi";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { selectedChat } = useSelector((state) => state.chat);

  const clearChatNotifications = async (userId, chatId) => {
    try {
      await notificationApi.clearChatNotifications(userId, chatId);
      console.log("Chat notifications cleared for chat:", chatId);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket Connected");

      dispatch(setConnected(true));

      if (user?.id) {
        socket.emit("join", user.id);

        console.log("Joined Socket :", user.id);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");

      dispatch(setConnected(false));
    });

    socket.on("online-users", (users) => {
      console.log("Online Users Updated:", users.length, "users");
      dispatch(setOnlineUsers(users));
    });

    // Listen for when a user comes online
    socket.on("user-online", (userId) => {
      console.log("User came online:", userId);

      // If current user has a chat with the online user, clear notifications
      if (
        selectedChat &&
        (selectedChat.customer._id === userId ||
          selectedChat.admin._id === userId ||
          selectedChat.washer?._id === userId)
      ) {
        clearChatNotifications(userId, selectedChat._id);
      }
    });

    socket.on("new-notification", (notification) => {
      console.log("Realtime Notification", notification);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("online-users");
      socket.off("user-online");
      socket.off("new-notification");

      socket.disconnect();
    };
  }, [user, selectedChat, dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
