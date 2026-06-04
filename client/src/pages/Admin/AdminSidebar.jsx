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

import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
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
