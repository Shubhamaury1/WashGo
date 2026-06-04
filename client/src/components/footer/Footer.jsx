import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#08152F] text-white">
      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo Section */}

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
                W
              </div>

              <h2 className="text-3xl font-bold">WashGo</h2>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Professional doorstep vehicle washing service for cars, bikes,
              trucks, tractors and more.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-700 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center hover:bg-sky-600 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:text-white">
                  Services
                </Link>
              </li>

              <li>
                <Link to="/reviews" className="hover:text-white">
                  Reviews
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}

          <div>
            <h3 className="text-xl font-semibold mb-5">Services</h3>

            <ul className="space-y-3 text-gray-400">
              <li>Car Washing</li>

              <li>Bike Washing</li>

              <li>Truck Washing</li>

              <li>Tractor Washing</li>

              <li>Premium Wash</li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold mb-5">Contact Us</h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                <span>Prayagraj, Uttar Pradesh</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <span>+91 9876543210</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>support@washgo.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© 2026 WashGo. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
