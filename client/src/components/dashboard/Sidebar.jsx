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

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const currentUser = useSelector((state) => state.auth.user);

  // Load unread count whenever user is available
  useEffect(() => {
    if (!currentUser?.id) return;

    const loadUnreadCount = async () => {
      try {
        // Load notifications to count unread by chat
        const notificationsRes = await notificationApi.getNotifications(currentUser.id);
        const notifications = notificationsRes.data.notifications || [];

        // Count unread
        const unreadByChat = {};
        let totalUnread = 0;
        
        notifications.forEach((notif) => {
          if (!notif.isRead) {
            const chatId = notif.chat || notif.chatId;
            if (chatId) {
              unreadByChat[chatId] = (unreadByChat[chatId] || 0) + 1;
              totalUnread += 1;
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

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition">
          <FaWallet />
          Wallet
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition">
          <FaBell />
          Notifications
        </button>

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
          {unreadCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
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

