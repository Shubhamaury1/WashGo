import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRole } from "../../utils/getRole";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const role = getRole(token);
  const { user } = useSelector((state) => state.auth);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-sm px-4 sm:px-6 md:px-10 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        onClick={closeMobileMenu}
        className="text-xl sm:text-2xl font-bold text-blue-600 whitespace-nowrap"
      >
        WashGo
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 lg:gap-8 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-600 transition duration-200">
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/services"
            className="hover:text-blue-600 transition duration-200"
          >
            Services
          </Link>
        </li>

        <li>
          <Link
            to="/reviews"
            className="hover:text-blue-600 transition duration-200"
          >
            Reviews
          </Link>
        </li>

        <li>
          <Link to="/about" className="hover:text-blue-600 transition duration-200">
            About Us
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className="hover:text-blue-600 transition duration-200"
          >
            Contact
          </Link>
        </li>

        {role === "admin" && (
          <li>
            <Link
              to="/admin/dashboard"
              className="hover:text-blue-600 transition duration-200"
            >
              Admin
            </Link>
          </li>
        )}
      </ul>

      {/* Desktop Auth Button */}
      <div className="hidden md:flex">
        {user ? (
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-5 py-2 rounded-xl transition duration-200"
          >
            {user.fullName}
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-5 py-2 rounded-xl transition duration-200"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition duration-200"
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span
          className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
            mobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
            mobileMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col py-2 px-4">
            <li className="py-2 border-b border-gray-100">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-gray-700 font-medium hover:text-blue-600 transition duration-200 block"
              >
                Home
              </Link>
            </li>

            <li className="py-2 border-b border-gray-100">
              <Link
                to="/services"
                onClick={closeMobileMenu}
                className="text-gray-700 font-medium hover:text-blue-600 transition duration-200 block"
              >
                Services
              </Link>
            </li>

            <li className="py-2 border-b border-gray-100">
              <Link
                to="/reviews"
                onClick={closeMobileMenu}
                className="text-gray-700 font-medium hover:text-blue-600 transition duration-200 block"
              >
                Reviews
              </Link>
            </li>

            <li className="py-2 border-b border-gray-100">
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="text-gray-700 font-medium hover:text-blue-600 transition duration-200 block"
              >
                About Us
              </Link>
            </li>

            <li className="py-2 border-b border-gray-100">
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="text-gray-700 font-medium hover:text-blue-600 transition duration-200 block"
              >
                Contact
              </Link>
            </li>

            {role === "admin" && (
              <li className="py-2 border-b border-gray-100">
                <Link
                  to="/admin/dashboard"
                  onClick={closeMobileMenu}
                  className="text-gray-700 font-medium hover:text-blue-600 transition duration-200 block"
                >
                  Admin
                </Link>
              </li>
            )}

            <li className="py-3">
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition duration-200 block text-center font-medium"
                >
                  {user.fullName}
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition duration-200 block text-center font-medium"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;  