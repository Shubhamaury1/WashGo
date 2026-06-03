import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import bookingApi from "../../api/bookingApi";
import Sidebar from "../../components/dashboard/Sidebar";

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
      <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <Sidebar />

          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">My Bookings</h1>

            {bookings.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl text-center">
                No Bookings Found
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  bookings.length === 1
                    ? "grid-cols-1 max-w-lg mx-auto"
                    : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white rounded-3xl shadow-lg p-6"
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <h2 className="text-3xl font-bold text-gray-900">
                          {booking.bookingId}
                        </h2>

                        <p>
                          <strong>Vehicle:</strong> {booking.vehicleId?.name}
                        </p>

                        <p>
                          <strong>Wash Type:</strong>{" "}
                          {booking.packageId?.packageName}
                        </p>

                        <p>
                          <strong>Amount:</strong> ₹{booking.amount}
                        </p>

                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>

                        <p>
                          <strong>Time Slot:</strong> {booking.timeSlot}
                        </p>
                      </div>

                      {/* Address */}
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold">Service Address</h3>

                        <p>{booking.address?.name}</p>

                        <p>{booking.address?.mobile}</p>

                        <p>
                          {booking.address?.address},{booking.address?.city},
                          {booking.address?.state}
                        </p>

                        <p>{booking.address?.pincode}</p>

                        <span
                          className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusColor(
                            booking.status,
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyBookings;
