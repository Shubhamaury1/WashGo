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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../redux/authSlice";
import { setUnreadCount, setUnreadByChat } from "../../redux/notificationSlice";
import notificationApi from "../../api/notificationApi";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const currentUser = useSelector((state) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    setIsSidebarOpen(false);
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all duration-300 relative ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-slate-600 hover:bg-slate-100"
    }`;

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
        // className={`fixed top-0 left-0 z-40 w-60 max-w-sm bg-white rounded-3xl shadow-2xl p-6 flex flex-col h-screen transition-transform duration-300 md:top-24 md:left-6 md:w-[280px] md:rounded-[30px] md:h-[calc(100vh-120px)] md:shadow-lg md:p-5 ${
        //   isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        // }`}

        className={`fixed top-14 left-0 z-40 w-60 max-w-sm bg-white rounded-3xl shadow-2xl p-6 flex flex-col h-[calc(100vh-56px)] transition-transform duration-300 md:top-24 md:left-6 md:w-[280px] md:rounded-[30px] md:h-[calc(100vh-120px)] md:shadow-lg md:p-5 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header with Logo and Close Button - Hidden on Mobile */}
        <div className="hidden md:flex items-start justify-between mb-8">
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 flex-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              W
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-800">WashGo</h1>
              <p className="text-gray-400 text-sm">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
          <NavLink
            to="/admin/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className={menuClass}
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/vehicles"
            onClick={() => setIsSidebarOpen(false)}
            className={menuClass}
          >
            <FaCar />
            <span>Vehicles</span>
          </NavLink>

          <NavLink
            to="/admin/packages"
            onClick={() => setIsSidebarOpen(false)}
            className={menuClass}
          >
            <FaBoxOpen />
            <span>Packages</span>
          </NavLink>

          <NavLink
            to="/admin/bookings"
            onClick={() => setIsSidebarOpen(false)}
            className={menuClass}
          >
            <FaCalendarAlt />
            <span>Bookings</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            onClick={() => setIsSidebarOpen(false)}
            className={menuClass}
          >
            <FaUsers />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/chat"
            onClick={() => setIsSidebarOpen(false)}
            className={menuClass}
          >
            <FaComments />
            <span>Chats</span>
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/admin/offers"
            onClick={() => setIsSidebarOpen(false)}
            className={menuClass}
          >
            <BiSolidOffer />
            <span>Offers</span>
          </NavLink>

          <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:bg-slate-100 transition-all">
            <FaStar />
            <span>Reviews</span>
          </button>

          <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:bg-slate-100 transition-all">
            <FaCog />
            <span>Settings</span>
          </button>
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

export default AdminSidebar;
