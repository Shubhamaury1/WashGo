
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaTint } from "react-icons/fa";
import { useSelector } from "react-redux";

import car from "../../assets/images/ca.webp";

const HeroSection = () => {

  const { user } = useSelector((state) => state.auth);

  return (
    <section className="bg-[#EEF5FF] min-h-[90vh] flex items-center">
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-5 py-2 rounded-full text-sm font-medium mb-6">
              <FaTint />
              Professional Vehicle Washing
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900">
              Professional Vehicle
              <br />
              Washing <span className="text-blue-600">At Your</span>
              <br />
              <span className="text-blue-600">Doorstep</span>
            </h1>

            <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-xl">
              Book bike, car, truck, tractor and JCB washing instantly. Find a
              trusted professional in 30 minutes and get your vehicle clean.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">
              {/* <Link
                to="/booking"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition"
              >
                Book Now
                <FaArrowRight />
              </Link> */}

              <Link
                to={user ? "/booking" : "/login"}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition"
              >
                Book Now
                <FaArrowRight />
              </Link>

              <button className="border-2 border-blue-200 text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition">
                Explore Services
              </button>
            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-4xl font-bold text-blue-600">10K+</h3>
                <p className="text-gray-500 mt-1">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-600">4.8★</h3>
                <p className="text-gray-500 mt-1">Average Rating</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-600">30 min</h3>
                <p className="text-gray-500 mt-1">Response Time</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-600">50+</h3>
                <p className="text-gray-500 mt-1">Cities Covered</p>
              </div>
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white p-2 rounded-[30px] shadow-2xl">
              <img
                src={car}
                alt="Vehicle Washing"
                className="w-full h-[440px] object-cover rounded-[28px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;