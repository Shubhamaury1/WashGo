import { useEffect, useState } from "react";
import { FaCar, FaBoxOpen, FaCalendarAlt, FaUsers } from "react-icons/fa";
import vehicleApi from "../../api/vehicleApi";
import packageApi from "../../api/packageApi";
import bookingApi from "../../api/bookingApi";
import authApi from "../../api/authApi";

const Dashboard = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [stats, setStats] = useState({
    vehicles: 0,
    packages: 0,
    bookings: 0,
    users: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [vehiclesRes, packagesRes, bookingsRes, usersRes] =
        await Promise.all([
          vehicleApi.getVehicles(),
          packageApi.getPackages(),
          bookingApi.getBookings(),
          authApi.getUsers(),
        ]);

      setStats({
        vehicles: vehiclesRes.data.length,
        packages: packagesRes.data.length,
        bookings: bookingsRes.data.length,
        users: usersRes.data.length,
      });

      // Last 5 bookings
      const lastFiveBookings = bookingsRes.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setRecentBookings(lastFiveBookings);

    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Vehicles",
      value: stats.vehicles,
      icon: <FaCar className="text-4xl text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Packages",
      value: stats.packages,
      icon: <FaBoxOpen className="text-4xl text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Bookings",
      value: stats.bookings,
      icon: <FaCalendarAlt className="text-4xl text-orange-500" />,
      bg: "bg-orange-100",
    },
    {
      title: "Users",
      value: stats.users,
      icon: <FaUsers className="text-4xl text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <h1 className="hidden md:block text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-6 sm:mb-8">
        Dashboard
      </h1>

      {/* Cards Grid - 2 columns on mobile, responsive on larger screens */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl hover:scale-105 transition-all duration-300`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-slate-500">{item.title}</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2">
                  {item.value}
                </h2>
              </div>

              <div className="text-3xl sm:text-4xl">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 mt-6 sm:mt-8 overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          Recent Bookings
        </h2>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-slate-500 text-sm">
                <th className="pb-4 px-2">Order ID</th>
                <th className="pb-4 px-2">Customer</th>
                <th className="pb-4 px-2">Vehicle</th>
                <th className="pb-4 px-2">Package</th>
                <th className="pb-4 px-2">Amount</th>
                <th className="pb-4 px-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-slate-50 text-sm"
                >
                  <td className="py-4 px-2">
                    {booking._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="px-2">
                    {booking.userId?.fullName ||
                      booking.customerName ||
                      "N/A"}
                  </td>

                  <td className="px-2">{booking.vehicleId?.name || "N/A"}</td>

                  <td className="px-2">
                    {booking.packageId?.packageName || "N/A"}
                  </td>

                  <td className="font-semibold px-2">
                    ₹{booking.packageId?.price || 0}
                  </td>

                  <td className="px-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {booking.status || "Booked"}
                    </span>
                  </td>
                </tr>
              ))}

              {recentBookings.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500 text-sm"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-3">
          {recentBookings.length > 0 ? (
            recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-200 rounded-lg p-3 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-semibold text-sm">
                      {booking._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {booking.status || "Booked"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Customer</p>
                    <p className="font-medium">
                      {booking.userId?.fullName ||
                        booking.customerName ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Vehicle</p>
                    <p className="font-medium">
                      {booking.vehicleId?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Package</p>
                    <p className="font-medium">
                      {booking.packageId?.packageName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-semibold text-green-600">
                      ₹{booking.packageId?.price || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              No bookings found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
