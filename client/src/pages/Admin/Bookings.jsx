import { useEffect, useState } from "react";
import bookingApi from "../../api/bookingApi";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const { data } = await bookingApi.getBookings();

      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-blue-100 text-blue-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "active":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-[#0d2240] mb-8">Bookings</h1>

      <div className="bg-white rounded-3xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-4">Order ID</th>
                <th className="text-left py-4">Customer</th>
                <th className="text-left py-4">Vehicle</th>
                <th className="text-left py-4">Package</th>
                <th className="text-left py-4">Price</th>
                <th className="text-left py-4">Date</th>
                <th className="text-left py-4">Status</th>
                <th className="text-left py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">
                    No Bookings Found
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="py-5">
                      WG-{String(index + 1).padStart(6, "0")}
                    </td>

                    <td className="py-5 font-semibold">
                      {booking.userId?.fullName}
                    </td>

                    <td className="py-5">{booking.vehicleId?.name}</td>

                    <td className="py-5">{booking.packageId?.packageName}</td>

                    <td className="py-5 font-bold text-blue-600">
                      ₹{booking.packageId?.price}
                    </td>

                    <td className="py-5">
                      {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="py-5">
                      <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-200">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
