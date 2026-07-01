import { useEffect, useState } from "react";
import reviewApi from "../../api/reviewApi";
import ReviewForm from "../../components/ReviewForm";
import ReviewCard from "../../components/ReviewCard";
import { useParams } from "react-router-dom";
import bookingApi from "../../api/bookingApi";
import MainLayout from "../../layouts/MainLayout";
import Sidebar from "../../components/dashboard/Sidebar";
import { toast } from "react-toastify";

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

              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl text-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold">
                  {booking.vehicleId?.name}
                </h1>

                <p className="mt-2 opacity-90">
                  Booking ID : {booking.bookingId}
                </p>

              
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
                  <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>

                  <div className="flex justify-between border-b pb-4 text-lg">
                    <span>Service Amount</span>

                    <span className="font-bold">₹ {booking.amount}</span>
                  </div>

                  <div className="flex justify-between pt-4 text-2xl font-bold text-green-600">
                    <span>Total Paid</span>

                    <span>₹ {booking.amount}</span>
                  </div>
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
