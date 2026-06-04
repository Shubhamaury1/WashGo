
import { FaCar, FaBoxOpen, FaCalendarAlt, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    {
      title: "Vehicles",
      value: "10",
      icon: <FaCar className="text-4xl text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Packages",
      value: "25",
      icon: <FaBoxOpen className="text-4xl text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Bookings",
      value: "150",
      icon: <FaCalendarAlt className="text-4xl text-orange-500" />,
      bg: "bg-orange-50",
    },
    {
      title: "Users",
      value: "50",
      icon: <FaUsers className="text-4xl text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  const bookings = [
    {
      id: "WG-24001",
      customer: "Shubham Maurya",
      vehicle: "Car",
      package: "Premium Wash",
      amount: "₹399",
      status: "Active",
    },
    {
      id: "WG-24002",
      customer: "Rahul Kumar",
      vehicle: "Bike",
      package: "Basic Wash",
      amount: "₹149",
      status: "Completed",
    },
    {
      id: "WG-24003",
      customer: "Priya Sharma",
      vehicle: "SUV",
      package: "Deluxe Wash",
      amount: "₹599",
      status: "Pending",
    },
    {
      id: "WG-24004",
      customer: "Amit Singh",
      vehicle: "Car",
      package: "Premium Wash",
      amount: "₹399",
      status: "Completed",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Dashboard</h1>

      {/* Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {stats.map((item, index) => (
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
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-slate-50">
                <td className="py-4">{booking.id}</td>

                <td>{booking.customer}</td>

                <td>{booking.vehicle}</td>

                <td>{booking.package}</td>

                <td className="font-semibold">{booking.amount}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;