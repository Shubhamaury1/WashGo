import {
  FaHome,
  FaCar,
  FaBoxOpen,
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaComments,
} from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../redux/authSlice";
import { setUnreadCount, setUnreadByChat } from "../../redux/notificationSlice";
import notificationApi from "../../api/notificationApi";

const AdminSidebar = () => {
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

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all duration-300 relative ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-[280px] bg-white rounded-[30px] shadow-lg  p-5  fixed top-24 flex flex-col left-6  h-[calc(100vh-120px)]">
      {/* Logo */}

      <Link to="/" className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
          W
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-800">WashGo</h1>

          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
      </Link>

      {/* Menu */}

      <div className="flex-1 space-y-2">
        <NavLink to="/admin/dashboard" className={menuClass}>
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/admin/vehicles" className={menuClass}>
          <FaCar />
          Vehicles
        </NavLink>

        <NavLink to="/admin/packages" className={menuClass}>
          <FaBoxOpen />
          Packages
        </NavLink>

        <NavLink to="/admin/bookings" className={menuClass}>
          <FaCalendarAlt />
          Bookings
        </NavLink>

        <NavLink to="/admin/users" className={menuClass}>
          <FaUsers />
          Users
        </NavLink>

        <NavLink to="/admin/chat" className={menuClass}>
          <FaComments />
          Chats
          {unreadCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/admin/offers" className={menuClass}>
          <BiSolidOffer />
          Offers
        </NavLink>

        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:bg-slate-100">
          <FaStar />
          Reviews
        </button>

        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:bg-slate-100">
          <FaCog />
          Settings
        </button>
      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition-all"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
