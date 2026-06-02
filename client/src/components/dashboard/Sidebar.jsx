import {
  FaHome,
  FaCalendarAlt,
  FaWallet,
  FaBell,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaQuestion,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/authSlice";

import { useNavigate } from "react-router-dom";


const Sidebar = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    localStorage.clear();

    navigate("/");
  };
  return (
    <aside className="w-full lg:w-[280px] bg-white rounded-3xl shadow-lg p-6 h-fit">
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
      <div className="space-y-3">
        <button className="w-full flex items-center gap-4 bg-blue-600 text-white px-5 py-4 rounded-2xl font-medium">
          <FaHome />
          Dashboard
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition">
          <FaCalendarAlt />
          My Bookings
        </button>

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

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition">
          <FaQuestion />
          Help & Support
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition">
          <FaCog />
          Settings
        </button>
      </div>

      {/* Bottom */}
      <div className="mt-12">
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
