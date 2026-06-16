import Sidebar from "../../components/dashboard/Sidebar";
import TopHeader from "../../components/dashboard/TopHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import VehicleCard from "../../components/dashboard/VehicleCard";
import BookingCard from "../../components/dashboard/BookingCard";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import vehicleApi from "../../api/vehicleApi";

const CustomerDashboard = () => {
  const BaseURL = import.meta.env.VITE_API_IMG_URL;
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await vehicleApi.getVehicles();

        // Keep only active vehicles
        const activeVehicles = response.data.filter(
          (vehicle) => vehicle.isActive,
        );

        // Randomly shuffle and take 4
        const randomVehicles = [...activeVehicles]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        // setVehicles(activeVehicles);
        setVehicles(randomVehicles);

      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div>
            {/* Header */}
            <TopHeader />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <StatsCard
                title="Wallet Balance"
                value="₹1250"
                color="text-blue-600"
              />

              <StatsCard title="Bookings" value="12" color="text-green-600" />

              <StatsCard title="Reviews" value="4.8★" color="text-yellow-500" />
            </div>

            {/* Vehicle Categories */}
            <div className="mt-14">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  Book New Service
                </h1>

                <button className="text-blue-600 font-semibold">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle._id}
                      title={vehicle.name}
                      image={`${BaseURL}${vehicle.image}`}
                    />
                  ))
                ) : (
                  <p>No active vehicles found.</p>
                )}
              </div>
            </div>

            {/* Active Booking */}
            <div className="mt-14">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  Active Booking
                </h1>

                <button className="text-blue-600 font-semibold">
                  View All
                </button>
              </div>

              <div className="space-y-6">
                <BookingCard />
      
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomerDashboard;
