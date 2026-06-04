import { FaCar, FaBoxOpen, FaCalendarAlt, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Vehicles</p>

              <h2 className="text-4xl font-bold mt-2">10</h2>
            </div>

            <FaCar className="text-4xl text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Packages</p>

              <h2 className="text-4xl font-bold mt-2">25</h2>
            </div>

            <FaBoxOpen className="text-4xl text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Bookings</p>

              <h2 className="text-4xl font-bold mt-2">150</h2>
            </div>

            <FaCalendarAlt className="text-4xl text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Users</p>

              <h2 className="text-4xl font-bold mt-2">50</h2>
            </div>

            <FaUsers className="text-4xl text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
