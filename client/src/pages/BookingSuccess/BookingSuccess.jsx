import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const BookingSuccess = () => {

  const latestOrder = JSON.parse(localStorage.getItem("latest_order"));

  const booking = latestOrder?.booking;

  const address = latestOrder?.address;


  const orderNumber = "WG" + Math.floor(Math.random() * 999999);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-6xl">✅</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold mt-8 text-gray-900">
            Booking Confirmed
          </h1>

          <p className="text-gray-500 text-lg mt-5 leading-8">
            Your vehicle washing booking has been successfully confirmed.
          </p>

          {/* Order Card */}
          <div className="mt-12 bg-gray-50 rounded-3xl p-8 text-left">
            <h2 className="text-3xl font-bold mb-6">Booking Details</h2>

            <div className="space-y-4 text-lg">
              <p>
                <strong>Order ID:</strong> {orderNumber}
              </p>

              <p>
                <strong>Vehicle:</strong> {booking?.vehicle}
              </p>

              <p>
                <strong>Wash Type:</strong> {booking?.washType}
              </p>

              <p>
                <strong>Date:</strong> {booking?.date}
              </p>

              <p>
                <strong>Time Slot:</strong> {booking?.time}
              </p>

              <p>
                <strong>Price:</strong> ₹{booking?.price}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="mt-8 bg-gray-50 rounded-3xl p-8 text-left">
            <h2 className="text-3xl font-bold mb-6">Service Address</h2>

            <div className="space-y-4 text-lg">
              <p>
                <strong>Name:</strong> {address?.fullName}
              </p>

              <p>
                <strong>Mobile:</strong> {address?.mobile}
              </p>

              <p>
                <strong>Location:</strong> {address?.nearLocation},
                {address?.district},{address?.state}
              </p>

              <p>
                <strong>Pincode:</strong> {address?.pincode}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col md:flex-row gap-5">
            <Link
              to="/dashboard"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-lg font-semibold transition"
            >
              Go To Dashboard
            </Link>

            <Link
              to="/tracking"
              className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-5 rounded-2xl text-lg font-semibold transition"
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
