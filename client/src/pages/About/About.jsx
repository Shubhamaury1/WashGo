import MainLayout from "../../layouts/MainLayout";
import car from "../../assets/images/ca.webp";

import {
  FaBolt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaCarSide,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-slate-50 via-blue-50 to-white">
        {/* HERO */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Badge */}
              <span className="inline-block bg-blue-100 text-blue-600 px-3 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm mb-4">
                🚗 About WashGo
              </span>

              {/* Heading */}
              <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-slate-900 mt-2 leading-tight mb-6">
                Professional Vehicle
                <br />
                Washing At Your
                <br />
                Doorstep
              </h1>

              {/* Text Content */}
              <p className="text-base text-gray-600 leading-relaxed mb-4">
                WashGo is a modern vehicle washing platform that provides
                premium doorstep washing services for cars, bikes, tractors,
                trucks, JCBs and heavy vehicles.
              </p>

              <p className="text-base text-gray-600 leading-relaxed mb-8">
                Our mission is to make vehicle cleaning fast, affordable and
                accessible with seamless booking and premium quality service.
              </p>

              {/* Image */}
              <div className="relative mb-8">
                <img
                  src={car}
                  alt="about"
                  className="w-full rounded-2xl sm:rounded-3xl shadow-lg"
                />

                <div className="absolute -bottom-4 left-4 sm:left-8 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-lg w-fit">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FaCheckCircle className="text-green-500 text-2xl sm:text-3xl flex-shrink-0" />

                    <div className="min-w-0">
                      <h4 className="font-bold text-sm sm:text-base">
                        Trusted Service
                      </h4>

                      <p className="text-gray-500 text-xs sm:text-sm">
                        Verified Professionals
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
                    10K+
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm">
                    Happy Customers
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
                    50+
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm">
                    Cities Covered
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
                    4.8★
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm">
                    Customer Rating
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              {/* Left */}
              <div>
                <span className="inline-block bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-medium text-sm">
                  🚗 About WashGo
                </span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mt-8 leading-tight">
                  Professional Vehicle Washing At Your Doorstep
                </h1>

                <p className="mt-8 text-xl text-gray-600 leading-9">
                  WashGo is a modern vehicle washing platform that provides
                  premium doorstep washing services for cars, bikes, tractors,
                  trucks, JCBs and heavy vehicles.
                </p>

                <p className="mt-6 text-xl text-gray-600 leading-9">
                  Our mission is to make vehicle cleaning fast, affordable and
                  accessible with seamless booking and premium quality service.
                </p>

                <div className="flex flex-wrap gap-8 mt-10">
                  <div>
                    <h2 className="text-4xl font-bold text-blue-600">10K+</h2>

                    <p className="text-gray-500">Happy Customers</p>
                  </div>

                  <div>
                    <h2 className="text-4xl font-bold text-blue-600">50+</h2>

                    <p className="text-gray-500">Cities Covered</p>
                  </div>

                  <div>
                    <h2 className="text-4xl font-bold text-blue-600">4.8★</h2>

                    <p className="text-gray-500">Customer Rating</p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="relative">
                <img
                  src={car}
                  alt="about"
                  className="w-full rounded-[40px] shadow-2xl"
                />

                <div className="absolute -bottom-6 left-8 bg-white p-5 rounded-3xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-3xl" />

                    <div>
                      <h4 className="font-bold">Trusted Service</h4>

                      <p className="text-gray-500 text-sm">
                        Verified Professionals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Why Choose WashGo?
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-500 mt-3 sm:mt-4 md:mt-5 px-2">
                Premium doorstep vehicle washing experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-blue-50 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:-translate-y-2 transition duration-300">
                <FaBolt className="text-blue-600 text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-6" />

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  Fast Booking
                </h3>

                <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-base leading-relaxed md:leading-7">
                  Book your vehicle wash in under 30 seconds.
                </p>
              </div>

              <div className="bg-green-50 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:-translate-y-2 transition duration-300">
                <FaMapMarkerAlt className="text-green-600 text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-6" />

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  Doorstep Service
                </h3>

                <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-base leading-relaxed md:leading-7">
                  We come directly to your location.
                </p>
              </div>

              <div className="bg-yellow-50 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:-translate-y-2 transition duration-300">
                <FaShieldAlt className="text-yellow-600 text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-6" />

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  Trusted Team
                </h3>

                <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-base leading-relaxed md:leading-7">
                  Background verified professionals.
                </p>
              </div>

              <div className="bg-purple-50 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:-translate-y-2 transition duration-300">
                <FaStar className="text-purple-600 text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-6" />

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  Premium Quality
                </h3>

                <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-base leading-relaxed md:leading-7">
                  Professional cleaning products and tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[35px] shadow-md md:shadow-lg">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6">
                Our Mission
              </h2>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed md:leading-8">
                To simplify vehicle cleaning by providing convenient, affordable
                and professional doorstep washing services across India.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[35px] shadow-md md:shadow-lg">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6">
                Our Vision
              </h2>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed md:leading-8">
                To become India's most trusted vehicle care platform with
                innovative technology and premium customer experience.
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12 sm:py-16 md:py-24 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 text-center text-white">
              <div>
                <FaUsers className="mx-auto text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4" />
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                  10K+
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
                  Customers Served
                </p>
              </div>

              <div>
                <FaCarSide className="mx-auto text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4" />
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                  25K+
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
                  Vehicles Cleaned
                </p>
              </div>

              <div>
                <FaStar className="mx-auto text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4" />
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                  4.8
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
                  Average Rating
                </p>
              </div>

              <div>
                <FaMapMarkerAlt className="mx-auto text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4" />
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                  50+
                </h2>
                <p className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
                  Cities Covered
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl md:rounded-[40px] p-6 sm:p-10 md:p-16 text-center text-white">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready To Experience Premium Vehicle Care?
              </h2>

              <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-xl text-blue-100">
                Book your first wash today and keep your vehicle shining.
              </p>

              <button className="mt-6 sm:mt-8 md:mt-10 bg-white text-blue-600 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold hover:scale-105 transition duration-200 text-sm sm:text-base">
                Book Service Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;