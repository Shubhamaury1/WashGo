import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CustomerDashboard from "../pages/CustomerDashboard/CustomerDashboard";
import Booking from "../pages/Booking/Booking";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Reviews from "../pages/Reviews/Reviews";
import Services from "../pages/Services/Services";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Address from "../pages/Address/Address";
import BookingSuccess from "../pages/BookingSuccess/BookingSuccess";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<Booking />} />
      {/* <Route path="/dashboard" element={<CustomerDashboard />} /> */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/address" element={<Address />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
    </Routes>
  );
};

export default AppRoutes;
