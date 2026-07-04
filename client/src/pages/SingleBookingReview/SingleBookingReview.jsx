import { useEffect, useState } from "react";
import reviewApi from "../../api/reviewApi";
import ReviewForm from "../../components/ReviewForm";
import ReviewCard from "../../components/ReviewCard";
import { useParams } from "react-router-dom";
import bookingApi from "../../api/bookingApi";
import MainLayout from "../../layouts/MainLayout";
import Sidebar from "../../components/dashboard/Sidebar";
import { toast } from "react-toastify";
import generateInvoicePDF from "../../components/PDFInvoice";

import {
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPhoneAlt,
  FaMoneyBillWave,
  FaBoxOpen,
  FaCheckCircle,
  FaTag,
  FaGift,
  FaDownload,
} from "react-icons/fa";

const statusSteps = [
  "Pending",
  "Confirmed",
  "Assigned",
  "In Progress",
  "Completed",
];

function SingleBookingReview() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [review, setReview] = useState(null);
  const [loadingReview, setLoadingReview] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadBooking();
    loadReview(id);
  }, []);

  const loadBooking = async () => {
    try {
      const res = await bookingApi.getBookingById(id);
      setBooking(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadReview = async (bookingId) => {
    try {
      const res = await reviewApi.getReviewByBooking(bookingId);

      setReview(res.data.data);
    } catch (err) {
      setReview(null);
    } finally {
      setLoadingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await reviewApi.deleteReview(review._id);

      setReview(null);

      toast.success("Review Deleted Successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to delete review.");
    }
  };

  const handleDownloadInvoice = () => {
    try {
      generateInvoicePDF(booking);
      toast.success("Invoice downloaded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to download invoice.");
    }
  };

  if (!booking)
    return (
      <MainLayout>
        <div className="p-10 text-center text-xl font-semibold">Loading...</div>
      </MainLayout>
    );

  const currentStep = statusSteps.indexOf(booking.status);

  return (
    <MainLayout>
      <div className="bg-[#f5f7fb] min-h-screen">
        <div className="flex p-6 gap-6">
          <Sidebar />

          <main className="flex-1 ml-[294px]">
            {" "}
            <div className="space-y-8">
              {/* Header */}

              {/* <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl text-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold">
                  {booking.vehicleId?.name}
                </h1>

                <p className="mt-2 opacity-90">
                  Booking ID : {booking.bookingId}
                </p>
                <button
                  onClick={handleDownloadInvoice}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  <FaDownload className="text-lg" />
                  Invoice
                </button>
              </div> */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl text-white p-8 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left Side */}
                  <div>
                    <h1 className="text-3xl font-bold">
                      {booking.vehicleId?.name}
                    </h1>

                    <p className="mt-2 text-blue-100">
                      Booking ID : {booking.bookingId}
                    </p>
                  </div>

                  {/* Right Side */}
                  <div className="flex justify-end items-center">
                    <button
                      onClick={handleDownloadInvoice}
                      className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                    >
                      <FaDownload className="text-lg" />
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Timeline */}

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Booking Timeline</h2>

                {booking.status === "Cancelled" ? (
                  <div className="text-center py-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500 text-white text-4xl">
                      ✕
                    </div>

                    <h3 className="mt-3 text-2xl font-bold text-red-600">
                      Booking Cancelled
                    </h3>

                    <p className="text-gray-500 mt-1">
                      This booking has been cancelled.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start">
                    {statusSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center flex-1 last:flex-none"
                      >
                        {/* Circle + Text */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-4 transition-all duration-300
                ${
                  index <= currentStep
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
                          >
                            {index <= currentStep ? "✓" : index + 1}
                          </div>

                          <p
                            className={`mt-2 text-sm font-semibold text-center whitespace-nowrap
                ${index <= currentStep ? "text-green-600" : "text-gray-500"}`}
                          >
                            {step}
                          </p>
                        </div>

                        {/* Connecting Line */}
                        {index !== statusSteps.length - 1 && (
                          <div className="flex-1 h-1 mx-2 mb-8">
                            <div
                              className={`h-full rounded-full transition-all duration-300
                  ${index < currentStep ? "bg-green-500" : "bg-gray-300"}`}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Booking */}

                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <FaCar className="text-blue-600" />
                      <span>{booking.vehicleId?.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <FaBoxOpen className="text-purple-600" />
                      <span>{booking.packageId?.packageName}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <FaMoneyBillWave className="text-green-600" />
                      <span>₹ {booking.amount}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <FaCalendarAlt className="text-orange-600" />
                      <span>
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "en-GB",
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <FaClock className="text-indigo-600" />
                      <span>{booking.timeSlot}</span>
                    </div>
                  </div>
                </div>

                {/* Address */}

                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Service Address</h2>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <FaUser className="text-blue-600" />
                      <span>{booking.address?.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <FaPhoneAlt className="text-green-600" />
                      <span>{booking.address?.mobile}</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <FaMapMarkerAlt className="text-red-600 mt-1" />

                      <div>
                        <p>{booking.address?.address}</p>

                        <p>
                          {booking.address?.city}, {booking.address?.state}
                        </p>

                        <p>{booking.address?.pincode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Payment Summary</h2>
                    {/* <button
                      onClick={handleDownloadInvoice}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      <FaDownload className="text-lg" />
                      Invoice
                    </button> */}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b pb-3">
                      <div className="flex items-center gap-3">
                        <FaMoneyBillWave className="text-green-600 text-lg" />
                        <span className="text-gray-600">Service Amount</span>
                      </div>
                      <span className="font-semibold">
                        ₹{" "}
                        {(
                          booking.amount + (booking.discountAmount || 0)
                        )?.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b pb-3">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-blue-600 text-lg" />
                        <span className="text-gray-600">Convenience Fee</span>
                      </div>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>

                    {booking.discountAmount > 0 && (
                      <div className="flex justify-between items-center border-b pb-3">
                        <div className="flex items-center gap-3">
                          <FaGift className="text-purple-600 text-lg" />
                          <span className="text-gray-600">Discount</span>
                        </div>
                        <span className="text-green-600 font-semibold">
                          -₹ {booking.discountAmount?.toFixed(2) || 0}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2  ">
                      <div className="flex items-center gap-3">
                        <FaTag className="text-blue-600 text-lg" />
                        <span className="text-lg font-bold text-gray-800">
                          Total Paid
                        </span>
                      </div>
                      <span className="text-xl font-bold text-green-600">
                        ₹ {booking.amount?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {/* <div className="mt-6 pt-6 border-t space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-semibold text-gray-800">{booking.bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-semibold capitalize text-gray-800">
                        {booking.paymentMethod || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                        booking.status === "Completed" ? "bg-green-100 text-green-700" :
                        booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        booking.status === "Cancelled" ? "bg-red-100 text-red-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* ===================== Review Section ===================== */}

              {booking.status === "Completed" && (
                <>
                  {loadingReview ? (
                    <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
                      Loading Review...
                    </div>
                  ) : review && !editing ? (
                    <ReviewCard
                      review={review}
                      onEdit={() => setEditing(true)}
                      onDelete={handleDeleteReview}
                    />
                  ) : (
                    <ReviewForm
                      bookingId={booking._id}
                      reviewData={review}
                      isEditing={editing}
                      onReviewAdded={(data) => {
                        setReview(data);
                        setEditing(false);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}

export default SingleBookingReview;
