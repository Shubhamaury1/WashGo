import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import vehicleApi from "../../api/vehicleApi";
import { useSelector } from "react-redux";

import {
  FaCarSide,
  FaCheckCircle,
  FaArrowRight,
  FaBolt,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Services = () => {
  const BaseURL = import.meta.env.VITE_API_IMG_URL;
  const { user } = useSelector((state) => state.auth);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await vehicleApi.getVehicles();
      setServices(res.data.filter((vehicle) => vehicle.isActive));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="h-screen flex justify-center items-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 min-h-screen">
        {/* HERO */}
        <section className="py-8 sm:py-10 md:py-16 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mt-4 sm:mt-8">
              Our Services
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-4 sm:mt-6 px-2">
              Professional doorstep washing solutions for cars, bikes, tractors,
              trucks and heavy vehicles.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section className="px-4 sm:px-6 md:px-8 pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image?.startsWith("http") ? service.image : `${BaseURL}${service.image}`}
                      alt={service.name}
                      className="w-full h-48 sm:h-56 md:h-72 object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute top-3 sm:top-5 right-3 sm:right-5">
                      <span className="bg-white text-blue-600 px-3 sm:px-4 py-1 sm:py-2 rounded-full font-semibold text-xs sm:text-sm">
                        Available
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    <h2 className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 text-white text-xl sm:text-2xl md:text-3xl font-bold capitalize">
                      {service.name}
                    </h2>
                  </div>

                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-blue-600 text-sm sm:text-base">
                      <FaCarSide className="text-lg sm:text-xl" />
                      <span>{service?.title || "Professional Vehicle Care"}</span>
                    </div>

                    <p className="mt-3 sm:mt-4 text-gray-600 leading-relaxed min-h-[60px] sm:min-h-[80px] text-sm sm:text-base flex-1">
                      {service.description}
                    </p>

                    <div className="flex justify-between mt-4 sm:mt-5 text-xs sm:text-sm mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 text-green-600">
                        <FaCheckCircle />
                        Active
                      </div>

                      <span className="text-gray-500">Doorstep Service</span>
                    </div>

                    <Link
                      to={user ? "/booking" : "/login"}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold flex justify-center items-center gap-2 transition duration-200 text-sm sm:text-base"
                    >
                      Book Service
                      <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
              Why Choose WashGo?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-blue-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
                <FaBolt className="text-3xl sm:text-4xl text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-lg sm:text-xl">Fast Service</h3>
                <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
                  Service within 30 minutes.
                </p>
              </div>

              <div className="bg-green-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
                <FaShieldAlt className="text-3xl sm:text-4xl text-green-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-lg sm:text-xl">Trusted Team</h3>
                <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
                  Verified professionals.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
                <FaMapMarkerAlt className="text-3xl sm:text-4xl text-yellow-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-lg sm:text-xl">Doorstep Service</h3>
                <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
                  We come to your location.
                </p>
              </div>

              <div className="bg-purple-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
                <FaClock className="text-3xl sm:text-4xl text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-lg sm:text-xl">Quick Booking</h3>
                <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
                  Easy booking process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12 sm:py-16 md:py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 text-center text-white">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                  10K+
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-2">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                  50+
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-2">
                  Cities Covered
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                  4.8★
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-2">
                  Average Rating
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                  30 Min
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-2">
                  Response Time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[40px] p-6 sm:p-10 md:p-16 shadow-xl text-center">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready To Make Your Vehicle Shine?
              </h2>

              <p className="text-gray-500 mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg">
                Book a professional wash service today.
              </p>

              <Link
                to={user ? "/booking" : "/login"}
                className="inline-block mt-6 sm:mt-7 md:mt-8 bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Services;
