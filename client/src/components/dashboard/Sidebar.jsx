import {
  FaHome,
  FaCalendarAlt,
  FaWallet,
  FaBell,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaComments,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    setIsSidebarOpen(false);
  };
  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-24 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg ${
          isSidebarOpen ? "hidden" : "block"
        }`}
      >
        <FaBars size={24} />
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-60 max-w-sm bg-white rounded-3xl shadow-2xl p-6 flex flex-col h-screen transition-transform duration-300 md:top-24 md:left-6 md:w-[280px] md:rounded-[30px] md:h-[calc(100vh-120px)] md:shadow-lg md:p-5 ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
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
      <div className="flex-1 space-y-1 overflow-y-auto pr-2">
        <NavLink
          to="/dashboard"
          onClick={() => setIsSidebarOpen(false)}
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
          onClick={() => setIsSidebarOpen(false)}
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
          onClick={() => setIsSidebarOpen(false)}
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
          onClick={() => setIsSidebarOpen(false)}
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
          onClick={() => setIsSidebarOpen(false)}
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

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition-all mt-4"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
      </aside>
    </>
  );
};

export default Sidebar;

