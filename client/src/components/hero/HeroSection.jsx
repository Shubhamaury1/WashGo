import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTint } from "react-icons/fa";
import { useSelector } from "react-redux";

import car from "../../assets/images/ca.webp";

const HeroSection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="bg-[#EEF5FF] min-h-screen sm:min-h-[90vh] flex items-center py-6 sm:py-6 md:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <FaTint className="text-sm sm:text-base" />
              <span>Professional Vehicle Washing</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold leading-tight text-slate-900">
              Professional Vehicle
              <br />
              Washing <span className="text-blue-600">At Your</span>
              <br />
              <span className="text-blue-600">Doorstep</span>
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              Book bike, car, truck, tractor and JCB washing instantly. Find a
              trusted professional in 30 minutes and get your vehicle clean.
            </p>
          </motion.div>

          {/* Mobile Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 sm:mt-8"
          >
            <div className="bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl">
              <img
                src={car}
                alt="Vehicle Washing"
                className="w-full h-64 sm:h-80 object-cover rounded-xl sm:rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Mobile Book Now Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4"
          >
            <Link
              to={user ? "/booking" : "/login"}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition duration-200 text-sm sm:text-base w-full"
            >
              Book Now
              <FaArrowRight />
            </Link>

            <button className="border-2 border-blue-200 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:bg-blue-50 transition duration-200 text-sm sm:text-base">
              Explore Services
            </button>
          </motion.div>

          {/* Mobile Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-6 text-center"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                10K+
              </h3>
              <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">
                Happy Customers
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                4.8★
              </h3>
              <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">
                Average Rating
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                30 min
              </h3>
              <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">
                Response Time
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                50+
              </h3>
              <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">
                Cities Covered
              </p>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 rounded-full text-sm font-medium mb-6 w-fit">
              <FaTint className="text-base" />
              <span>Professional Vehicle Washing</span>
            </div>

            {/* Heading */}
            <h1 className="text-6xl font-bold leading-tight text-slate-900 mb-6">
              Professional Vehicle
              <br />
              Washing <span className="text-blue-600">At Your</span>
              <br />
              <span className="text-blue-600">Doorstep</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              Book bike, car, truck, tractor and JCB washing instantly. Find a
              trusted professional in 30 minutes and get your vehicle clean.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mb-10">
              <Link
                to={user ? "/booking" : "/login"}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition duration-200 text-sm"
              >
                Book Now
                <FaArrowRight className="text-sm" />
              </Link>

              <button className="border-2 border-blue-200 text-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition duration-200 text-sm">
                Explore Services
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <h3 className="text-4xl font-bold text-blue-600">10K+</h3>
                <p className="text-gray-500 mt-1 text-md">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-600">4.8★</h3>
                <p className="text-gray-500 mt-1 text-md">Average Rating</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-600">30 <span className="text-md">min</span></h3>
                <p className="text-gray-500 mt-1 text-md">Response Time</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-600">50+</h3>
                <p className="text-gray-500 mt-1 text-md">Cities Covered</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white p-4 rounded-[30px] shadow-2xl">
              <img
                src={car}
                alt="Vehicle Washing"
                className="w-full h-auto object-cover rounded-[28px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
