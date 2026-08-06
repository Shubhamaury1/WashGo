import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Sidebar from "../../components/dashboard/Sidebar";
import bookingApi from "../../api/bookingApi";

import {
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaMoneyBillWave,
  FaBoxOpen,
} from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await bookingApi.getUserBookings(user.id);

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Assigned":
        return "bg-purple-100 text-purple-700";

      case "In Progress":
        return "bg-indigo-100 text-indigo-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#f5f7fb] min-h-screen">
        <div className="flex p-4 md:p-6 gap-4 md:gap-6">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 md:ml-[294px] w-full md:w-auto">
             <h1 className="px-12 sm:px-12 lg:px-0 py-6 sm:py-6 lg:py-0 text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2240] mb-6 md:mb-8">
              My Bookings
            </h1>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-10 text-center text-base md:text-xl font-semibold">
                No Bookings Found
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {bookings.map((booking) => (

                  <div
                    key={booking._id}
                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="text-2xl font-bold truncate">
                            {booking.vehicleId?.name}
                          </h2>

                          <p className="text-xs opacity-90 mt-1 break-all">
                            Booking ID : {booking.bookingId}
                          </p>
                        </div>

                        <span
                          className={`px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Booking Details */}
                      <div>
                        <h3 className="font-bold text-lg mb-5">Booking Details</h3>

                        <div className="space-y-4">

                          <div className="flex items-center gap-3">
                            <FaCar className="text-blue-600 text-lg" />
                            <span>{booking.vehicleId?.name}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaBoxOpen className="text-purple-600 text-lg" />
                            <span>{booking.packageId?.packageName}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaMoneyBillWave className="text-green-600 text-lg" />
                            <span className="font-semibold">
                              ₹{booking.amount}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-orange-500 text-lg" />
                            <span>
                              {new Date(
                                booking.bookingDate
                              ).toLocaleDateString("en-GB")}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaClock className="text-indigo-600 text-lg" />
                            <span>{booking.timeSlot}</span>
                          </div>

                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <h3 className="font-bold text-lg mb-5">
                          Service Address
                        </h3>

                        <div className="space-y-4">

                          <div className="flex items-center gap-3">
                            <FaUser className="text-blue-600 text-lg" />
                            <span>{booking.address?.name}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaPhoneAlt className="text-green-600 text-lg" />
                            <span>{booking.address?.mobile}</span>
                          </div>

                          <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-red-600 text-lg mt-1" />

                            <div>
                              <p className="font-medium">
                                {booking.address?.city}
                              </p>

                              <p className="text-gray-500 text-sm">
                                {booking.address?.address}
                              </p>

                              <p className="text-gray-500 text-sm">
                                {booking.address?.state} - {booking.address?.pincode}
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t bg-gray-50 px-5 py-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(
                          booking.createdAt
                        ).toLocaleDateString("en-GB")}
                      </span>

                      <Link
                        to={`/my-bookings/${booking._id}`}
                        className="text-blue-600 font-semibold hover:text-blue-800 transition"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyBookings;