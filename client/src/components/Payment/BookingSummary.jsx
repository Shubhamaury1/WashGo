import React, { useState } from "react";
import {
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTag,
  FaUser,
  FaPhoneAlt,
  FaHome,
  FaGift,
} from "react-icons/fa";
import { toast } from "react-toastify";
import adminNotificationApi from "../../api/adminNotificationApi";

function BookingSummary({ booking, address, onAmountChange }) {
  const [couponCode, setCouponCode] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [validating, setValidating] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  if (!booking) return null;

  const handleValidateCoupon = async () => {
    if (!couponCode.trim() || !redeemCode.trim()) {
      toast.error("Please enter both coupon and redeem code");
      return;
    }

    try {
      setValidating(true);
      const response = await adminNotificationApi.validateCoupon(
        couponCode,
        redeemCode,
      );

      if (response.data.success) {
        const coupon = response.data.coupon;
        setAppliedCoupon(coupon);

        // Calculate discount
        let discount = 0;
        if (coupon.discountType === "percentage") {
          discount = (booking.amount * coupon.discountValue) / 100;
        } else {
          discount = coupon.discountValue;
        }

        const finalDiscount = Math.min(discount, booking.amount);
        setDiscountAmount(finalDiscount);

        // Update localStorage with discount info
        const updatedBooking = {
          ...booking,
          discountAmount: finalDiscount,
          couponCode: coupon.couponCode,
        };
        localStorage.setItem("washgo_booking", JSON.stringify(updatedBooking));

        // Call callback with new amount
        if (onAmountChange) {
          onAmountChange(booking.amount - finalDiscount);
        }

        toast.success("Coupon applied successfully!");
      }
    } catch (err) {
      setAppliedCoupon(null);
      setDiscountAmount(0);
      if (onAmountChange) {
        onAmountChange(booking.amount);
      }
      toast.error(err.response?.data?.message || "Invalid coupon code");
    } finally {
      setValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setRedeemCode("");
    setDiscountAmount(0);

    // Update localStorage to remove discount info
    const updatedBooking = {
      ...booking,
      discountAmount: 0,
      couponCode: null,
    };
    localStorage.setItem("washgo_booking", JSON.stringify(updatedBooking));

    // Reset amount to original
    if (onAmountChange) {
      onAmountChange(booking.amount);
    }
  };

  const totalAmount = booking.amount - discountAmount;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
          <FaCar className="text-2xl text-blue-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Booking Summary</h2>

          <p className="text-gray-500">Review your booking before payment</p>
        </div>
      </div>

      {/* Vehicle */}
      <div className="flex justify-between items-center py-3 border-b">
        <div className="flex items-center gap-3">
          <FaCar className="text-blue-600" />

          <span className="text-gray-500">Vehicle</span>
        </div>

        <span className="font-semibold text-gray-800">
          {booking.vehicleName}
        </span>
      </div>

      {/* Package */}
      <div className="flex justify-between items-center py-3 border-b">
        <div className="flex items-center gap-3">
          <FaTag className="text-green-600" />

          <span className="text-gray-500">Wash Package</span>
        </div>

        <span className="font-semibold text-gray-800">
          {booking.packageName}
        </span>
      </div>

      {/* Date */}
      <div className="flex justify-between items-center py-3 border-b">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-orange-500" />

          <span className="text-gray-500">Date</span>
        </div>

        <span className="font-semibold">
          {new Date(booking.date).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Time */}
      <div className="flex justify-between items-center py-3 border-b">
        <div className="flex items-center gap-3">
          <FaClock className="text-purple-500" />

          <span className="text-gray-500">Time Slot</span>
        </div>

        <span className="font-semibold">{booking.timeSlot}</span>
      </div>

      {/* Address */}

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <FaMapMarkerAlt className="text-red-500 text-lg" />
          <h3 className="text-lg font-bold text-gray-800">Service Address</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          {/* First Row */}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-500" />
              <span className="text-gray-500 font-medium">Name :</span>
              <span className="font-semibold text-gray-800">
                {address?.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-500" />
              <span className="text-gray-500 font-medium">Mobile :</span>
              <span className="font-semibold text-gray-800">
                {address?.mobile}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-4"></div>

          {/* Second Row */}
          <div className="flex items-start gap-2">
            <FaHome className="text-orange-500 mt-1" />

            <div>
              <span className="text-gray-500 font-medium">Address :</span>

              <span className="ml-2 text-gray-800">
                {address?.address}, {address?.city}, {address?.state} -{" "}
                {address?.pincode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Section */}

      <div className="mt-6 rounded-2xl bg-blue-50 p-6">
        {/* Coupon Section */}
        <div className="mb-2 pb-4 border-b">
          <h3 className="font-semibold text-gray-800 mb-2">Apply Coupon</h3>
          {!appliedCoupon ? (
            
            <div className="flex flex-col gap-3">
              <div className="mb-1 flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                  <FaTag className="text-blue-600 text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-10 px-2 text-xl outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="mb-1 flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                  <FaGift className="text-blue-600 text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Redeem Code"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  className="flex-1 h-10 px-2 text-xl outline-none placeholder:text-gray-400"
                />
              </div>
              <button
                onClick={handleValidateCoupon}
                disabled={validating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {validating ? "Verifying..." : "Verify"}
              </button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="font-semibold text-green-800">
                    {appliedCoupon.title}
                  </p>
                  <p className="text-sm text-green-700">
                    {appliedCoupon.message}
                  </p>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-red-600 hover:text-red-800 font-semibold mt-3 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Package Price</span>

          <span className="font-semibold">₹{booking.amount}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Convenience Fee</span>

          <span className="text-green-600 font-semibold">FREE</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Discount</span>

            <span className="text-green-600 font-semibold">
              -₹{discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        <hr className="my-4" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-blue-600" />

            <span className="text-xl font-bold">Total</span>
          </div>

          <span className="text-2xl font-bold text-blue-600">
            ₹{totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Security Badge */}

      <div className="mt-8 flex items-center gap-3 bg-green-50 rounded-2xl p-4">
        <FaCheckCircle className="text-green-600 text-xl" />

        <p className="text-sm text-gray-700">
          Your booking will be confirmed instantly after successful payment.
        </p>
      </div>
    </div>
  );
}

export default BookingSummary;
