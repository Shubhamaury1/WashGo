import {
  FaHome,
  FaCar,
  FaBoxOpen,
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    localStorage.clear();

    navigate("/");
  };

  return (
    <aside className="w-full lg:w-[280px] bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-5">
      {/* Logo */}

      <Link to="/" className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
          W
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">WashGo</h1>

          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
      </Link>

      {/* Menu */}

      <div className="space-y-3">
        <NavLink
          to="/admin/dashboard"
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
          to="/admin/vehicles"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaCar />
          Vehicles
        </NavLink>

        <NavLink
          to="/admin/packages"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaBoxOpen />
          Packages
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaCalendarAlt />
          Bookings
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaUsers />
          Users
        </NavLink>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition">
          <FaStar />
          Reviews
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

export default AdminSidebar;
