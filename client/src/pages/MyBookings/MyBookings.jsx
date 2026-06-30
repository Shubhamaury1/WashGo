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
        <div className="flex p-6 gap-6">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 ml-[294px]">
            <h1 className="text-4xl font-bold text-[#0d2240] mb-8">
              My Bookings
            </h1>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-10 text-center text-xl font-semibold">
                No Bookings Found
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden border"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {booking.vehicleId?.name}
                        </h2>

                        <p className="text-sm mt-1 opacity-90">
                          Booking ID : {booking.bookingId}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Booking */}
                      <div>
                        <h3 className="font-bold text-lg mb-4">
                          Booking Details
                        </h3>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <FaCar className="text-blue-600" />
                            <span>{booking.vehicleId?.name}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaBoxOpen className="text-purple-600" />
                            <span>{booking.packageId?.packageName}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaMoneyBillWave className="text-green-600" />
                            <span>₹{booking.amount}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-orange-500" />
                            <span>
                              {new Date(booking.bookingDate).toLocaleDateString(
                                "en-GB",
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaClock className="text-indigo-600" />
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
                            <FaUser className="text-blue-600" />
                            <span>{booking.address?.name}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <FaPhoneAlt className="text-green-600" />
                            <span>{booking.address?.mobile}</span>
                          </div>

                          <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-red-600 mt-1" />

                            <div>
                              <p>{booking.address?.address}</p>

                              <p>
                                {booking.address?.city},{" "}
                                {booking.address?.state}
                              </p>

                              <p>{booking.address?.pincode}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t bg-gray-50 px-6 py-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Booking Date :{" "}
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </span>

                      <Link
                        to={`/my-bookings/${booking._id}`}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        View Details
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