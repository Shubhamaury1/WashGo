import Sidebar from "../../components/dashboard/Sidebar";
import TopHeader from "../../components/dashboard/TopHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import VehicleCard from "../../components/dashboard/VehicleCard";
import BookingCard from "../../components/dashboard/BookingCard";
import MainLayout from "../../layouts/MainLayout";

const vehicles = [
  {
    title: "Car",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Bike",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Truck",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Tractor",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop",
  },
];

const CustomerDashboard = () => {
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
                {vehicles.map((vehicle, index) => (
                  <VehicleCard key={index} {...vehicle} />
                ))}
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
