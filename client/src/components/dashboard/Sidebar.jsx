import {
  FaHome,
  FaCalendarAlt,
  FaWallet,
  FaBell,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaComments,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { logout } from "../../redux/authSlice";
import { setUnreadCount, setUnreadByChat } from "../../redux/notificationSlice";
import notificationApi from "../../api/notificationApi";
import { useSocket } from "../../socket/SocketProvider";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const unreadChatCount = useSelector((state) => state.notification.unreadChatCount);
  const currentUser = useSelector((state) => state.auth.user);
  const socket = useSocket();

  // Load unread count whenever user is available
  useEffect(() => {
    if (!currentUser?.id) return;

    const loadUnreadCount = async () => {
      try {
        // Load notifications to count unread
        const notificationsRes = await notificationApi.getNotifications(currentUser.id);
        const notifications = notificationsRes.data.notifications || [];

        // Count ALL unread notifications
        let totalUnread = 0;
        const unreadByChat = {};
        
        notifications.forEach((notif) => {
          if (!notif.isRead) {
            totalUnread += 1;
            
            // Also track unread by chat if it has a chat ID
            const chatId = notif.chat || notif.chatId;
            if (chatId) {
              unreadByChat[chatId] = (unreadByChat[chatId] || 0) + 1;
            }
          }
        });
        
        dispatch(setUnreadCount(totalUnread));
        dispatch(setUnreadByChat(unreadByChat));
      } catch (err) {
        console.error("Failed to load unread count:", err);
      }
    };

    loadUnreadCount();
  }, [currentUser?.id, dispatch]);

  // Listen to real-time notification updates via Socket
  useEffect(() => {
    if (!socket) return;

    const handleNotificationCount = (count) => {
      dispatch(setUnreadCount(count));
    };

    socket.on("notification-count", handleNotificationCount);

    return () => {
      socket.off("notification-count", handleNotificationCount);
    };
  }, [socket, dispatch]);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.clear();

    navigate("/");
  };
  return (
    // <aside className="w-full lg:w-[270px] bg-white rounded-3xl shadow-lg p-6 h-fit">
    <aside className="fixed lg:w-[270px] bg-white rounded-3xl shadow-lg p-6  h-[calc(100vh-112px)]">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
          W
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">WashGo</h1>

          <p className="text-gray-400 text-sm">Customer Panel</p>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/my-bookings"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaCalendarAlt />
          My Bookings
        </NavLink>


        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition relative ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaBell />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </NavLink>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition">
          <FaStar />
          Reviews
        </button>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition relative ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaComments />
          Chat
          {unreadChatCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadChatCount > 9 ? "9+" : unreadChatCount}
            </span>
          )}
        </NavLink>
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaCog />
          Settings
        </NavLink>
      </div>

      {/* Bottom */}
      <div className="space-y-3 mt-80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

