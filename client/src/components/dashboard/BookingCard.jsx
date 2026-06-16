import { useState, useEffect } from "react";
import bookingApi from "../../api/bookingApi";

const BookingCard = () => {
   const BaseURL = import.meta.env.VITE_API_IMG_URL;
   const [bookings, setBookings] = useState([]);

   useEffect(() => {
     loadBookings();
   }, []);

  const loadBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await bookingApi.getUserBookings(user.id);

      // Only keep active bookings (exclude Completed)
      const activeBookings = res.data.filter(
        (booking) => booking.status !== "Completed",
      );

      setBookings(activeBookings);
    } catch (error) {
      console.log(error);
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
            className="bg-white rounded-3xl p-6 shadow-md flex flex-col lg:flex-row justify-between items-center gap-6"
          >
            <div className="flex items-center gap-5">
              <img
                src={`${BaseURL}${booking.vehicleId.image}`}
                alt={booking.vehicleId.name}
                className="w-28 h-28 rounded-2xl object-cover"
              />

              <div>
                <h1 className="text-2xl font-bold">{booking.vehicleId.name}</h1>

                <p className="text-gray-500 mt-2">
                  {booking.packageId.packageName}
                </p>

                <p className="text-blue-600 font-bold mt-3">
                  ₹{booking.amount}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              {/* <span className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-medium">
                {booking.status}
              </span> */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                  booking.status,
                )}`}
              >
                {booking.status}
              </span>

              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl transition">
                Track Live
              </button>
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
