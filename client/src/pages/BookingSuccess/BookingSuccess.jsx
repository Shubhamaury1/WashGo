import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import chatApi from "../../api/chatApi";
import { FaCheckCircle, FaCar, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaFileInvoice, FaMoneyBillWave } from "react-icons/fa";

const BookingSuccess = () => {
  const booking = JSON.parse(localStorage.getItem("latest_order"));
  const user = JSON.parse(localStorage.getItem("user"));

  const [chatCreated, setChatCreated] = useState(false);
  const [error, setError] = useState("");

  const address = booking?.address;
  const orderNumber = booking?.bookingId;

  // Auto-create chat for booking
  useEffect(() => {
    const createChatForBooking = async () => {
      try {
        console.log("Creating chat with:", { bookingId: booking._id, customerId: user.id });
        
        const res = await chatApi.createChat({
          bookingId: booking._id,
          customerId: user.id,
        });
        
        console.log("Chat created:", res.data);
        setChatCreated(true);
      } catch (err) {
        console.error("Failed to create chat:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to create chat");
      }
    };

    if (booking?._id && user?.id && !chatCreated) {
      createChatForBooking();
    }
  }, [booking?._id, user?.id, chatCreated]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center items-center p-3 md:p-4 py-6 md:py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl md:rounded-[40px] shadow-2xl overflow-hidden">
          {/* Success Header with gradient background */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 px-4 md:px-10 py-6 md:py-12 text-center">
            <div className="w-14 md:w-20 h-14 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <FaCheckCircle className="text-3xl md:text-5xl text-white" />
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Booking Confirmed! 🎉
            </h1>

            <p className="text-green-50 text-sm md:text-base mt-2">
              Your booking is confirmed and we're ready to serve you.
            </p>
          </div>

          {/* Content Section */}
          <div className="p-4 md:p-10">
            {/* Order ID Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl md:rounded-2xl p-3 md:p-5 mb-4 md:mb-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs md:text-sm">Order Number</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-600 break-all">{orderNumber}</p>
                </div>
                <FaFileInvoice className="text-3xl md:text-4xl text-blue-400" />
              </div>
            </div>

            {/* Two Column Layout for Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Booking Details */}
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200">
                <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  <FaCar className="text-blue-600 text-sm md:text-base" />
                  Booking Details
                </h2>

                <div className="space-y-2 md:space-y-3">
                  <div className="pb-2 md:pb-3 border-b border-gray-200">
                    <p className="text-xs text-gray-500 font-medium">Vehicle</p>
                    <p className="text-sm md:text-base font-semibold text-gray-800 mt-0.5">
                      {booking?.vehicleId?.name || "N/A"}
                    </p>
                  </div>

                  <div className="pb-2 md:pb-3 border-b border-gray-200">
                    <p className="text-xs text-gray-500 font-medium">Wash Package</p>
                    <p className="text-sm md:text-base font-semibold text-gray-800 mt-0.5">
                      {booking?.packageId?.packageName || "N/A"}
                    </p>
                  </div>

                  <div className="pb-2 md:pb-3 border-b border-gray-200">
                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" /> Date
                    </p>
                    <p className="text-sm md:text-base font-semibold text-gray-800 mt-0.5">
                      {booking?.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <FaClock className="text-xs" /> Time Slot
                    </p>
                    <p className="text-sm md:text-base font-semibold text-gray-800 mt-0.5">
                      {booking?.timeSlot || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price and Payment */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-200">
                <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600 text-sm md:text-base" />
                  Amount Details
                </h2>

                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between pb-2 md:pb-3 border-b border-green-200">
                    <p className="text-xs md:text-sm text-gray-600">Package Price</p>
                    <p className="text-sm md:text-base font-semibold text-gray-800">₹{booking?.amount || "0"}</p>
                  </div>

                  {booking?.discountAmount > 0 && (
                    <div className="flex justify-between pb-2 md:pb-3 border-b border-green-200">
                      <p className="text-xs md:text-sm text-gray-600">Discount</p>
                      <p className="text-sm md:text-base font-semibold text-green-600">-₹{booking?.discountAmount}</p>
                    </div>
                  )}

                  <div className="flex justify-between pt-1">
                    <p className="text-sm md:text-base font-bold text-gray-900">Total Amount</p>
                    <p className="text-lg md:text-2xl font-bold text-green-600">
                      ₹{(booking?.amount - (booking?.discountAmount || 0)).toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-green-200">
                    <p className="text-xs md:text-sm text-gray-600">Payment Status</p>
                    <p className="text-sm md:text-base font-semibold text-green-600 mt-1">
                      {booking?.paymentStatus || "Pending"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Address */}
            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 mb-6 md:mb-8">
              <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500 text-sm md:text-base" />
                Service Address
              </h2>

              <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                <div className="flex items-start gap-2 pb-2 md:pb-3 border-b border-gray-200">
                  <FaUser className="text-blue-500 flex-shrink-0 text-xs md:text-sm mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Name</p>
                    <p className="font-semibold text-gray-800">{address?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pb-2 md:pb-3 border-b border-gray-200">
                  <FaPhone className="text-green-500 flex-shrink-0 text-xs md:text-sm mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Mobile</p>
                    <p className="font-semibold text-gray-800">{address?.mobile || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-red-500 flex-shrink-0 text-xs md:text-sm mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-medium">Location</p>
                    <p className="font-semibold text-gray-800 break-words">
                      {address?.address || "N/A"}, {address?.city || "N/A"}, {address?.state || "N/A"} - {address?.pincode || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 md:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-semibold transition shadow-md hover:shadow-lg text-center"
              >
                📊 Dashboard
              </Link>

              <Link
                to="/chat"
                className="bg-green-600 hover:bg-green-700 text-white py-2.5 md:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-semibold transition shadow-md hover:shadow-lg text-center"
              >
                💬 Chat Admin
              </Link>

              <Link
                to={`/my-bookings/${booking._id}`}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 md:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-semibold transition shadow-md hover:shadow-lg text-center"
              >
                🔍 Track
              </Link>
            </div>

            {error && (
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-xs md:text-sm">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingSuccess;
