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
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-7">
      {/* Header */}

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
          <FaLock className="text-green-600 text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>

          <p className="text-gray-500">Powered by Razorpay</p>
        </div>
      </div>

      {/* Payment Methods */}

      <div className="space-y-4">
        {paymentOptions.map((item) => (
          <label
            key={item.id}
            className={`flex items-center justify-between rounded-2xl border-2 p-4 cursor-pointer transition-all duration-300
            ${
              selectedMethod === item.id
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div
              className="flex items-center gap-4 flex-1"
              onClick={() => setSelectedMethod(item.id)}
            >
              {item.icon}

              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>

                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>

            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === item.id}
              onChange={() => setSelectedMethod(item.id)}
              className="w-5 h-5 accent-blue-600"
            />
          </label>
        ))}
      </div>

      {/* Security */}

      <div className="mt-8 bg-green-50 rounded-2xl p-5 flex gap-4">
        <FaShieldAlt className="text-green-600 text-2xl mt-1" />

        <div>
          <h3 className="font-semibold text-gray-800">100% Secure Payments</h3>

          <p className="text-sm text-gray-600 mt-1">
            Your payment is encrypted using 256-bit SSL and securely processed
            by Razorpay.
          </p>
        </div>
      </div>

      {/* Total */}

      <div className="mt-10 flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total Payable</p>

          <h2 className="text-3xl font-bold text-blue-600">₹{amount}</h2>
        </div>

        <button
          onClick={onPay}
          disabled={loading}
          className="px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:bg-gray-400"
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>
    </div>
  );
}

export default PaymentMethodCard;