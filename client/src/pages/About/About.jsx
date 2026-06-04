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

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}

            <div>
              <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-medium">
                🚗 About WashGo
              </span>

              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mt-8 leading-tight">
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
        </section>

        {/* WHY CHOOSE US */}

        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold">Why Choose WashGo?</h2>

              <p className="text-xl text-gray-500 mt-5">
                Premium doorstep vehicle washing experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              <div className="bg-blue-50 p-8 rounded-3xl hover:-translate-y-2 transition">
                <FaBolt className="text-blue-600 text-5xl mb-6" />

                <h3 className="text-2xl font-bold">Fast Booking</h3>

                <p className="text-gray-600 mt-4 leading-7">
                  Book your vehicle wash in under 30 seconds.
                </p>
              </div>

              <div className="bg-green-50 p-8 rounded-3xl hover:-translate-y-2 transition">
                <FaMapMarkerAlt className="text-green-600 text-5xl mb-6" />

                <h3 className="text-2xl font-bold">Doorstep Service</h3>

                <p className="text-gray-600 mt-4 leading-7">
                  We come directly to your location.
                </p>
              </div>

              <div className="bg-yellow-50 p-8 rounded-3xl hover:-translate-y-2 transition">
                <FaShieldAlt className="text-yellow-600 text-5xl mb-6" />

                <h3 className="text-2xl font-bold">Trusted Team</h3>

                <p className="text-gray-600 mt-4 leading-7">
                  Background verified professionals.
                </p>
              </div>

              <div className="bg-purple-50 p-8 rounded-3xl hover:-translate-y-2 transition">
                <FaStar className="text-purple-600 text-5xl mb-6" />

                <h3 className="text-2xl font-bold">Premium Quality</h3>

                <p className="text-gray-600 mt-4 leading-7">
                  Professional cleaning products and tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[35px] shadow-lg">
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>

              <p className="text-gray-600 text-lg leading-8">
                To simplify vehicle cleaning by providing convenient, affordable
                and professional doorstep washing services across India.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[35px] shadow-lg">
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>

              <p className="text-gray-600 text-lg leading-8">
                To become India's most trusted vehicle care platform with
                innovative technology and premium customer experience.
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section className="py-24 bg-blue-600">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 text-center text-white">
              <div>
                <FaUsers className="mx-auto text-5xl mb-4" />
                <h2 className="text-5xl font-bold">10K+</h2>
                <p>Customers Served</p>
              </div>

              <div>
                <FaCarSide className="mx-auto text-5xl mb-4" />
                <h2 className="text-5xl font-bold">25K+</h2>
                <p>Vehicles Cleaned</p>
              </div>

              <div>
                <FaStar className="mx-auto text-5xl mb-4" />
                <h2 className="text-5xl font-bold">4.8</h2>
                <p>Average Rating</p>
              </div>

              <div>
                <FaMapMarkerAlt className="mx-auto text-5xl mb-4" />
                <h2 className="text-5xl font-bold">50+</h2>
                <p>Cities Covered</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-16 text-center text-white">
              <h2 className="text-5xl font-bold">
                Ready To Experience Premium Vehicle Care?
              </h2>

              <p className="mt-6 text-xl text-blue-100">
                Book your first wash today and keep your vehicle shining.
              </p>

              <button className="mt-10 bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition">
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