import { createContext, useEffect, useState } from "react";
import notificationApi from "../api/notificationApi";
import { useSocket } from "../context/SocketProvider";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const socket = useSocket();

  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    loadNotifications();
    loadCount();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    };

    const handleCount = (count) => {
      setCount(count);
    };

    socket.on("new-notification", handleNotification);
    socket.on("notification-count", handleCount);

    return () => {
      socket.off("new-notification", handleNotification);
      socket.off("notification-count", handleCount);
    };
  }, [socket]);

  const loadNotifications = async () => {
    try {
      const res = await notificationApi.getNotifications(user._id);

      setNotifications(res.data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCount = async () => {
    try {
      const res = await notificationApi.getUnreadCount(user._id);

      setCount(res.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  const markRead = async (id) => {
    await notificationApi.markAsRead(id);

    setNotifications((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              isRead: true,
            }
          : item,
      ),
    );

    loadCount();
  };

  const removeNotification = async (id) => {
    await notificationApi.deleteNotification(id);

    setNotifications((prev) => prev.filter((item) => item._id !== id));

    loadCount();
  };

  const markAllRead = async () => {
    await notificationApi.markAllRead(user._id);

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      })),
    );

    setCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        count,
        markRead,
        markAllRead,
        removeNotification,
        loadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
