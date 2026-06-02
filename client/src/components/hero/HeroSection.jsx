import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import car from "../../assets/images/ca.webp"
const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-16 bg-gradient-to-br from-blue-50 to-white gap-10">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
          Professional Vehicle Washing At Your Doorstep
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          <span>Book bike, car, truck, tractor and JCB washing instantly.</span>
          <br />
          <span>
            Book a trusted professional in 30 Minutes and get your vehicle
            clean.
          </span>
        </p>

        <p className="mt-6 text-lg text-gray-600"></p>

        <div className="mt-8 flex gap-4 flex-wrap">
          <Link
            to="/booking"
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl"
          >
            Book Now
          </Link>

          <button className="border border-gray-300 px-8 py-4 rounded-2xl">
            Explore Service
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1"
      >
        <img
          // src="https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?q=80&w=1200&auto=format&fit=crop"
          src={car}
          alt="car"
          className="w-full max-w-md md:max-w-lg lg:max-w-4xl mx-auto rounded-3xl shadow-2xl object-cover"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
