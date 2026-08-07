import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import vehicleApi from "../../api/vehicleApi";
import packageApi from "../../api/packageApi";
import SkeletonService from "../skeleton/SkeletonService";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const BaseURL = import.meta.env.VITE_API_IMG_URL;

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const [vehiclesRes, packagesRes] = await Promise.all([
        vehicleApi.getVehicles(),
        packageApi.getPackages(),
      ]);

      const activeVehicles = vehiclesRes.data.filter(
        (vehicle) => vehicle.isActive,
      );

      const vehiclesWithPrice = activeVehicles.map((vehicle) => {
        const vehiclePackages = packagesRes.data.filter(
          (pkg) =>
            (pkg.vehicleId?._id || pkg.vehicleId) === vehicle._id &&
            pkg.isActive,
        );

        const minPrice =
          vehiclePackages.length > 0
            ? Math.min(...vehiclePackages.map((p) => p.price))
            : 0;

        let badge = "Available";
        let badgeColor = "bg-green-100 text-green-600";

        if (minPrice >= 1000) {
          badge = "Expert";
          badgeColor = "bg-red-100 text-red-600";
        } else if (minPrice >= 500) {
          badge = "Premium";
          badgeColor = "bg-orange-100 text-orange-600";
        } else if (minPrice >= 200) {
          badge = "Popular";
          badgeColor = "bg-blue-100 text-blue-600";
        }

        return {
          ...vehicle,
          minPrice,
          badge,
          badgeColor,
        };
      });

      const randomServices = [...vehiclesWithPrice]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      setServices(randomServices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="text-center mb-8 sm:mb-12 md:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
          Our Services
        </h1>

        <p className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl text-slate-500">
          Professional washing solutions for all types of vehicles.
        </p>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            title={service.name}
            image={`${BaseURL}${service.image}`}
            description={service.description}
            price={service.minPrice}
            badge={service.badge}
            badgeColor={service.badgeColor}
          />
        ))}
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonService key={index} />
            ))
          : services.map((service) => (
              <ServiceCard
                key={service._id}
                title={service.name}
                image={`${BaseURL}${service.image}`}
                description={service.description}
                price={service.minPrice}
                badge={service.badge}
                badgeColor={service.badgeColor}
              />
            ))}
      </div>
    </section>
  );
};

export default ServicesSection;
