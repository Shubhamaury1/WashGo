import { useState, useEffect } from "react";
import bookingApi from "../../api/bookingApi";
import { Link } from "react-router-dom";

const BookingCard = () => {
  const BaseURL = import.meta.env.VITE_API_IMG_URL;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await bookingApi.getUserBookings(user.id);

      // Only keep active bookings (exclude Completed)
      const activeBookings = res.data.filter(
        (booking) => booking.status !== "Completed",
      );

      setBookings(activeBookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-blue-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "assigned":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-md"
          >
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Top Section */}
              <div className="flex flex-col lg:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div className="flex items-start gap-3 md:gap-5 w-full">
                  {/* Vehicle Image */}
                  <img
                    src={
                      booking.vehicleId.image?.startsWith("http")
                        ? booking.vehicleId.image
                        : `${BaseURL}${booking.vehicleId.image}`
                    }
                    alt={booking.vehicleId.name}
                    className="w-20 md:w-28 h-20 md:h-28 rounded-xl md:rounded-2xl object-cover flex-shrink-0"
                  />

                  {/* Right Content */}
                  <div className="flex-1 min-w-0">
                    {/* Mobile Header */}
                    <div className="flex items-start justify-between gap-2 md:hidden">
                      <h1 className="text-xl font-bold leading-none">
                        {booking.vehicleId.name}
                      </h1>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Desktop Title */}
                    <h1 className="hidden md:block text-2xl font-bold">
                      {booking.vehicleId.name}
                    </h1>

                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                      {booking.packageId.packageName}
                    </p>

                    <p className="text-blue-600 font-bold mt-2 text-base">
                      ₹{booking.amount}
                    </p>
                  </div>
                </div>

                {/* Desktop Status + Button */}

                <div className="hidden md:flex items-center gap-4 flex-nowrap">
                  <span
                    className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusStyle(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>

                  <Link
                    to={`/my-bookings/${booking._id}`}
                    className="inline-flex items-center justify-center px-6 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap transition"
                  >
                    Track Live
                  </Link>
                </div>
              </div>

              {/* Mobile Button */}
              <Link
                to={`/my-bookings/${booking._id}`}
                className="md:hidden w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition text-sm text-center"
              >
                Track Live
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-10">
          No active bookings.
        </div>
      )}
    </>
  );
};

export default BookingCard;
