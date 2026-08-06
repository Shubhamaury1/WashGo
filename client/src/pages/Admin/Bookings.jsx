import { useEffect, useState } from "react";
import bookingApi from "../../api/bookingApi";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

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

  const handleUpdate = async (id) => {
    try {
      await bookingApi.updateBookingStatus(id, selectedStatus);

      setEditingId(null);

      loadBookings();
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
      <div className="px-10 sm:px-6 lg:px-6 py-4 sm:py-6 lg:py-1 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">Bookings</h1>
      </div>

      <div className="p-3 sm:p-6">
        {/* Mobile Card View */}
        <div className="sm:hidden space-y-3 ">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No Bookings Found</div>
          ) : (
            bookings.map((booking, index) => (
              <div key={booking._id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Order ID</p>
                        <p className="font-bold text-sm">WG-{String(index + 1).padStart(6, "0")}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Customer</p>
                        <p className="font-semibold text-sm">{booking.userId?.fullName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-medium">Price</p>
                        <p className="font-bold text-sm text-blue-600">₹{booking.packageId?.price}</p>
                      </div>
                    </div>

                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Vehicle</p>
                        <p className="font-semibold text-sm">{booking.vehicleId?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-medium">Date</p>
                        <p className="font-semibold text-sm">
                          {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-medium">Package</p>
                      <p className="font-semibold text-sm">{booking.packageId?.packageName}</p>
                    </div>

                    {booking.status !== "Completed" && (
                      <div className="border-t pt-3">
                        {editingId === booking._id ? (
                          <div className="space-y-2">
                            <select
                              value={selectedStatus}
                              onChange={(e) => setSelectedStatus(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Assigned">Assigned</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleUpdate(booking._id)}
                              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-semibold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingId(booking._id);
                              setSelectedStatus(booking.status);
                            }}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-semibold"
                          >
                            Update Status
                          </button>
                        )}
                      </div>
                    )}
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block bg-white rounded-3xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="text-left py-4 px-4 sm:px-6">Order ID</th>
                  <th className="text-left py-4 px-4 sm:px-6">Customer</th>
                  <th className="text-left py-4 px-4 sm:px-6">Vehicle</th>
                  <th className="text-left py-4 px-4 sm:px-6">Package</th>
                  <th className="text-left py-4 px-4 sm:px-6">Price</th>
                  <th className="text-left py-4 px-4 sm:px-6">Date</th>
                  <th className="text-left py-4 px-4 sm:px-6">Status</th>
                  <th className="text-left py-4 px-4 sm:px-6">Action</th>
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
                      <td className="py-5 px-4 sm:px-6">
                        WG-{String(index + 1).padStart(6, "0")}
                      </td>

                      <td className="py-5 px-4 sm:px-6 font-semibold">
                        {booking.userId?.fullName}
                      </td>

                      <td className="py-5 px-4 sm:px-6">{booking.vehicleId?.name}</td>

                      <td className="py-5 px-4 sm:px-6">{booking.packageId?.packageName}</td>

                      <td className="py-5 px-4 sm:px-6 font-bold text-blue-600">
                        ₹{booking.packageId?.price}
                      </td>

                      <td className="py-5 px-4 sm:px-6">
                        {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-5 px-4 sm:px-6">
                        {editingId === booking._id ? (
                          <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Assigned">Assigned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                              booking.status,
                            )}`}
                          >
                            {booking.status}
                          </span>
                        )}
                      </td>

                      <td className="py-5 px-4 sm:px-6">
                        {booking.status !== "Completed" &&
                          (editingId === booking._id ? (
                            <button
                              onClick={() => handleUpdate(booking._id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingId(booking._id);
                                setSelectedStatus(booking.status);
                              }}
                              className="bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-700"
                            >
                              Update
                            </button>
                          ))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      </div>
    </>
  );
};

export default Bookings;
