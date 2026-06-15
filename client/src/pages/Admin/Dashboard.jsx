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
    <div>
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Dashboard</h1>

      {/* Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} p-6 rounded-3xl hover:scale-105 transition-all duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">{item.title}</p>

                <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
              </div>

              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}

      <div className="bg-white rounded-3xl shadow-sm p-6 mt-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6">Recent Bookings</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-4">Order ID</th>
              <th className="pb-4">Customer</th>
              <th className="pb-4">Vehicle</th>
              <th className="pb-4">Package</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

         
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-slate-50">
                <td className="py-4">{booking._id.slice(-6).toUpperCase()}</td>

                <td>{booking.userId?.fullName || booking.customerName || "N/A"}</td>

                <td>{booking.vehicleId?.name || "N/A"}</td>

                <td>{booking.packageId?.packageName || "N/A"}</td>

                <td className="font-semibold">
                  ₹{booking.packageId?.price || 0}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
