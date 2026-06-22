import React from "react";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaCheckCircle,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

function PaymentLoader({ message = "Connecting to Razorpay..." }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Animated Spinner */}

        <div className="relative flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="w-24 h-24 rounded-full border-[6px] border-blue-100 border-t-blue-600"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <FaCreditCard className="text-3xl text-blue-600" />
          </div>
        </div>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-2xl font-bold text-center text-gray-800"
        >
          Processing Payment
        </motion.h2>

        {/* Message */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-500 mt-3 leading-7"
        >
          {message}
        </motion.p>

        {/* Status */}

        <div className="mt-8 space-y-5">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-lg" />

            <span className="text-gray-700">Preparing your booking</span>
          </div>

          <div className="flex items-center gap-3">
            <FaLock className="text-blue-600 text-lg" />

            <span className="text-gray-700">
              Connecting securely with Razorpay
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>

            <span className="text-gray-700">
              Please don't close this window
            </span>
          </div>
        </div>

        {/* Security Box */}

        <div className="mt-8 rounded-2xl bg-blue-50 p-5">
          <div className="flex items-center gap-3 mb-2">
            <FaShieldAlt className="text-blue-600 text-xl" />

            <h3 className="font-semibold text-gray-800">Secure Payment</h3>
          </div>

          <p className="text-sm text-gray-600 leading-6">
            Your payment is encrypted using
            <span className="font-semibold text-blue-600">
              {" "}
              256-bit SSL Encryption
            </span>{" "}
            and processed securely through Razorpay.
          </p>
        </div>

        {/* Footer */}

        <p className="text-center text-xs text-gray-400 mt-6">
          Powered by Razorpay • WashGo
        </p>
      </motion.div>
    </div>
  );
}

export default PaymentLoader;