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
      <div className="bg-[#f5f7fb] min-h-screen">
        <div className="flex h-full p-4 md:p-6 gap-4 md:gap-6">
          {/* Sidebar */}
          <Sidebar />

          {/* Right Content */}
          {/* <main className="flex-1 md:ml-[294px] overflow-y-auto pr-2 w-full md:w-auto">
           */}
          <main className="flex-1 w-full md:w-auto md:ml-[294px] overflow-y-auto pt-4 md:pt-0 px-4 md:px-0 pr-0 md:pr-2">
            <TopHeader />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
              <StatsCard
                title="Wallet Balance"
                value="₹1250"
                color="text-blue-600"
              />

              <StatsCard title="Bookings" value="12" color="text-green-600" />

              <StatsCard title="Reviews" value="4.8★" color="text-yellow-500" />
            </div>

            {/* Vehicle */}
            <div className="mt-8 md:mt-12">
              <div className="flex justify-between items-center gap-4 mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Book New Service
                </h1>

                <button className="text-blue-600 font-semibold text-sm sm:text-base">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle._id}
                    title={vehicle.name}
                    image={`${BaseURL}${vehicle.image}`}
                  />
                ))}
              </div>
            </div>

            {/* Booking */}
            <div className="mt-8 md:mt-12 pb-10">
              <div className="flex justify-between items-center gap-4 mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Active Booking
                </h1>

                <button className="text-blue-600 font-semibold text-sm sm:text-base">
                  View All
                </button>
              </div>

              <div className="space-y-6">
                <BookingCard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomerDashboard;
