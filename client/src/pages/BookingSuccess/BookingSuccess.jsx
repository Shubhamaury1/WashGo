import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import chatApi from "../../api/chatApi";

const BookingSuccess = () => {
  const navigate = useNavigate();
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
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-2">
        <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-2xl p-6 md:p-10 text-center">
          {/* Success Icon */}
          <div className="w-18 h-18 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">✅</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold mt-4 text-gray-900">
            Booking Confirmed
          </h1>

          <p className="text-gray-500 text-lg mt-2 leading-8">
            Your vehicle washing booking has been successfully confirmed.
          </p>

          {/* Order Card */}
          <div className="mt-8 bg-gray-50 rounded-3xl p-6 text-left">
            <h2 className="text-2xl font-bold mb-3">Booking Details</h2>

            <div className="space-y-2 text-lg">
              <p>
                <strong>Order ID:</strong> {orderNumber}
              </p>

              <p>
                <strong>Vehicle: </strong>
                {booking?.vehicleId?.name || "N/A"}
              </p>

              <p>
                <strong>Wash Type:</strong>{" "}
                {booking?.packageId?.packageName || "N/A"}
              </p>

              <p>
                <strong>Date: </strong>
                {booking?.bookingDate
                  ? new Date(booking.bookingDate).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                <strong>Time Slot:</strong> {booking?.timeSlot || "N/A"}
              </p>

              <p>
                <strong>Price: </strong>₹{booking?.amount || "N/A"}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="mt-8 bg-gray-50 rounded-3xl p-6 text-left">
            <h2 className="text-2xl font-bold mb-3">Service Address</h2>

            <div className="space-y-2 text-lg">
              <p>
                <strong>Name:</strong> {address?.name || "N/A"}
              </p>

              <p>
                <strong>Mobile:</strong> {address?.mobile || "N/A"}
              </p>

              <p>
                <strong>Location:</strong> {address?.address || "N/A"},{" "}
                {address?.city || "N/A"}, {address?.state || "N/A"}
              </p>

              <p>
                <strong>Pincode:</strong> {address?.pincode || "N/A"}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col md:flex-row gap-5">
            <Link
              to="/dashboard"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
            >
              Go To Dashboard
            </Link>

            <Link
              to="/chat"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
            >
              💬 Chat with Admin
            </Link>

            <Link
              to="/tracking"
              className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Track Booking
            </Link>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingSuccess;
