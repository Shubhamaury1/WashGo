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

      // setServices(res.data);
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

        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-medium">
              Premium Vehicle Washing
            </span> */}

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mt-8">
              Our Services
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Professional doorstep washing solutions for cars, bikes, tractors,
              trucks and heavy vehicles.
            </p>
          </div>
        </section>

        {/* SERVICES */}

        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="group bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`${BaseURL}${service.image}`}
                      alt={service.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute top-5 right-5">
                      <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold">
                        Available
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    <h2 className="absolute bottom-5 left-5 text-white text-3xl font-bold capitalize">
                      {service.name}
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-blue-600">
                      <FaCarSide />
                      <span>
                        {service?.title || "Professional Vehicle Care"}
                      </span>
                    </div>

                    <p className="mt-4 text-gray-600 leading-7 min-h-[80px]">
                      {service.description}
                    </p>

                    <div className="flex justify-between mt-5">
                      <div className="flex items-center gap-2 text-green-600">
                        <FaCheckCircle />
                        Active
                      </div>

                      <span className="text-gray-500">Doorstep Service</span>
                    </div>

                    <Link
                      // to="/booking"
                      to={user ? "/booking" : "/login"}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-2"
                    >
                      Book Service
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16">
              Why Choose WashGo?
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-blue-50 p-8 rounded-3xl text-center">
                <FaBolt className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl">Fast Service</h3>
                <p className="text-gray-500 mt-3">Service within 30 minutes.</p>
              </div>

              <div className="bg-green-50 p-8 rounded-3xl text-center">
                <FaShieldAlt className="text-4xl text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl">Trusted Team</h3>
                <p className="text-gray-500 mt-3">Verified professionals.</p>
              </div>

              <div className="bg-yellow-50 p-8 rounded-3xl text-center">
                <FaMapMarkerAlt className="text-4xl text-yellow-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl">Doorstep Service</h3>
                <p className="text-gray-500 mt-3">We come to your location.</p>
              </div>

              <div className="bg-purple-50 p-8 rounded-3xl text-center">
                <FaClock className="text-4xl text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl">Quick Booking</h3>
                <p className="text-gray-500 mt-3">Easy booking process.</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 text-center text-white">
              <div>
                <h2 className="text-5xl font-bold">10K+</h2>
                <p>Happy Customers</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">50+</h2>
                <p>Cities Covered</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">4.8★</h2>
                <p>Average Rating</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">30 Min</h2>
                <p>Response Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[40px] p-16 shadow-xl text-center">
              <h2 className="text-5xl font-bold">
                Ready To Make Your Vehicle Shine?
              </h2>

              <p className="text-gray-500 mt-5 text-lg">
                Book a professional wash service today.
              </p>

              <Link
                // to="/booking"
                className="inline-block mt-8 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700"
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
