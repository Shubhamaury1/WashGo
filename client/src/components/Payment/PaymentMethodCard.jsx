import React from "react";
import {
  FaShieldAlt,
  FaUniversity,
  FaWallet,
  FaCreditCard,
  FaGooglePay,
  FaLock,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";

function PaymentMethodCard({
  amount,
  onPay,
  loading,
  selectedMethod,
  setSelectedMethod,
}) {
  const paymentOptions = [
    {
      id: "upi",
      title: "UPI",
      subtitle: "Google Pay, PhonePe, BHIM",
      icon: <FaGooglePay className="text-3xl text-blue-600" />,
    },
    {
      id: "phonepe",
      title: "PhonePe",
      subtitle: "Pay using PhonePe UPI",
      icon: <SiPhonepe className="text-3xl text-purple-600" />,
    },
    {
      id: "paytm",
      title: "Paytm",
      subtitle: "Paytm Wallet / UPI",
      icon: <SiPaytm className="text-3xl text-sky-600" />,
    },
    {
      id: "card",
      title: "Debit / Credit Card",
      subtitle: "Visa • MasterCard • RuPay",
      icon: <FaCreditCard className="text-3xl text-indigo-600" />,
    },
    {
      id: "netbanking",
      title: "Net Banking",
      subtitle: "All Major Banks",
      icon: <FaUniversity className="text-3xl text-green-600" />,
    },
    {
      id: "wallet",
      title: "Wallet",
      subtitle: "Amazon Pay & Others",
      icon: <FaWallet className="text-3xl text-orange-500" />,
    },
    {
      id: "cod",
      title: "COD",
      subtitle: "Cash On Delivery",
      icon: <FaMoneyBillAlt className="text-3xl text-green-600" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 p-4 md:p-7">
      {/* Header */}

      <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8">
        <div className="w-10 md:w-14 h-10 md:h-14 rounded-xl md:rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
          <FaLock className="text-green-600 text-base md:text-xl" />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">Secure Payment</h2>

          <p className="text-gray-500 text-xs md:text-sm">Powered by Razorpay</p>
        </div>
      </div>

      {/* Payment Methods */}

      <div className="space-y-2 md:space-y-4">
        {paymentOptions.map((item) => (
          <label
            key={item.id}
            className={`flex items-center justify-between rounded-lg md:rounded-2xl border-2 p-2 md:p-4 cursor-pointer transition-all duration-300 text-sm md:text-base
            ${
              selectedMethod === item.id
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div
              className="flex items-center gap-2 md:gap-4 flex-1 min-w-0"
              onClick={() => setSelectedMethod(item.id)}
            >
              <div className="text-xl md:text-3xl flex-shrink-0">{item.icon}</div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800 text-xs md:text-base">{item.title}</h3>

                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </div>

            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === item.id}
              onChange={() => setSelectedMethod(item.id)}
              className="w-4 md:w-5 h-4 md:h-5 accent-blue-600 flex-shrink-0 ml-2"
            />
          </label>
        ))}
      </div>

      {/* Security */}

      <div className="mt-4 md:mt-8 bg-green-50 rounded-lg md:rounded-2xl p-3 md:p-5 flex gap-2 md:gap-4">
        <FaShieldAlt className="text-green-600 text-lg md:text-2xl flex-shrink-0 mt-0 md:mt-1" />

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 text-xs md:text-base">100% Secure Payments</h3>

          <p className="text-xs text-gray-600 mt-0.5 md:mt-1">
            Your payment is encrypted using 256-bit SSL and securely processed
            by Razorpay.
          </p>
        </div>
      </div>

      {/* Total */}

      <div className="mt-4 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-0">
        <div>
          <p className="text-gray-500 text-xs md:text-sm">Total Payable</p>

          <h2 className="text-2xl md:text-3xl font-bold text-blue-600">₹{amount}</h2>
        </div>

        <button
          onClick={onPay}
          disabled={loading}
          className="w-full sm:w-auto px-4 md:px-10 py-3 md:py-4 rounded-lg md:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base transition-all disabled:bg-gray-400"
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>
    </div>
  );
}

export default PaymentMethodCard;