import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const BookingSuccess = () => {
  const booking = JSON.parse(localStorage.getItem("latest_order"));

  const address = booking?.address;

  const orderNumber = booking?.bookingId;

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
              to="/tracking"
              className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Track Booking
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingSuccess;
