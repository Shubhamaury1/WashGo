import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {

  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="w-full bg-white shadow-sm px-4 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        WashGo
      </Link>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/services">Services</Link>
        </li>

        <li>
          <Link to="/reviews">Reviews</Link>
        </li>

        <li>
          <Link to="/about">About Us</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/admin/dashboard">Admin</Link>
        </li>
      </ul>

      {/* Dashboard Button */}
      {/* <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
      >
        Dashboard
      </Link> */}
      {/* <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
      >
        Login
      </Link> */}
      {user ? (
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          {user.fullName}
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;  