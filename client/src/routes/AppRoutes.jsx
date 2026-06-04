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
import MyBookings from "../pages/MyBookings/MyBookings";
import AdminLayout from "../pages/Admin/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import Vehicles from "../pages/Admin/Vehicles";
import Packages from "../pages/Admin/Packages";
// import Bookings from "../pages/Admin/Bookings";
// import Users from "../pages/Admin/Users";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/my-bookings" element={<MyBookings />} />
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
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/vehicles" element={<Vehicles />} />

        <Route path="/admin/packages" element={<Packages />} />

        {/* <Route path="/admin/bookings" element={<Bookings />} /> */}

        {/* <Route path="/admin/users" element={<Users />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
