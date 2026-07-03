import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

import BookingSummary from "../../components/Payment/BookingSummary";
import PaymentMethodCard from "../../components/Payment/PaymentMethodCard";
import PaymentLoader from "../../components/Payment/PaymentLoader";

import paymentApi from "../../api/paymentApi";
import bookingApi from "../../api/bookingApi";

import { toast } from "react-toastify";

function Payment() {
  const navigate = useNavigate();

  const booking = JSON.parse(localStorage.getItem("washgo_booking"));
  const address = JSON.parse(localStorage.getItem("selected_address"));
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);
  const [finalAmount, setFinalAmount] = useState(booking?.amount || 0);

  const [loadingMessage, setLoadingMessage] = useState(
    "Connecting to Razorpay...",
  );

  const [selectedMethod, setSelectedMethod] = useState("upi");

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      // CASH ON DELIVERY
      if (selectedMethod === "cod") {
        setLoading(true);
        setLoadingMessage("Confirming your booking...");

        const payload = {
          bookingId: "WG" + Date.now(),

          userId: user.id,

          vehicleId: booking.vehicleId,

          packageId: booking.packageId,

          addressId: address._id,

          bookingDate: booking.date,

          timeSlot: booking.timeSlot,

          amount: finalAmount,

          paymentId: null,

          paymentOrderId: null,

          paymentMethod: "cod",

          paymentStatus: "Pending", // or "COD"
        };

        const bookingRes = await bookingApi.createBooking(payload);

        localStorage.setItem(
          "latest_order",
          JSON.stringify(bookingRes.data.booking),
        );

        localStorage.removeItem("washgo_booking");
        localStorage.removeItem("selected_address");

        setLoading(false);

        navigate("/booking-success");

        return; // Stop here. Don't open Razorpay.
      }

      // ONLINE PAYMENT
      setLoading(true);
      setLoadingMessage("Creating Secure Payment...");

      const loaded = await loadRazorpayScript();

      if (!loaded) {
        toast.error("Unable to load Razorpay.");
        setLoading(false);
        return;
      }

      const response = await paymentApi.createOrder({
        amount: finalAmount,
      });

      const { order, key } = response;
console.log("Backend Response:", response);
console.log("Order:", order);
console.log("Key:", key); 
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "WashGo",
        description: "Vehicle Wash Booking",

        // image: "/logo.png",

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.mobile,
        },

        theme: {
          color: "#2563EB",
        },

        modal: {
          ondismiss() {
            setLoading(false);
          },
        },

        handler: async function (payment) {
          try {
            setLoadingMessage("Verifying Payment...");

            const verify = await paymentApi.verifyPayment({
              razorpay_order_id: payment.razorpay_order_id,
              razorpay_payment_id: payment.razorpay_payment_id,
              razorpay_signature: payment.razorpay_signature,
              booking: booking._id,
              user: user._id,
              paymentMethod: selectedMethod,
              amount: finalAmount,
            });

            if (!verify.success) {
              setLoading(false);
              toast.error("Payment verification failed.");
              return;
            }

            setLoadingMessage("Creating Booking...");

            const payload = {
              bookingId: "WG" + Date.now(),

              userId: user.id,

              vehicleId: booking.vehicleId,

              packageId: booking.packageId,

              addressId: address._id,

              bookingDate: booking.date,

              timeSlot: booking.timeSlot,

              amount: finalAmount,

              paymentId: payment.razorpay_payment_id,

              paymentOrderId: payment.razorpay_order_id,

              paymentMethod: selectedMethod,

              paymentStatus: "Paid",
            };

            const bookingRes = await bookingApi.createBooking(payload);

            localStorage.setItem(
              "latest_order",
              JSON.stringify(bookingRes.data.booking),
            );

            localStorage.removeItem("washgo_booking");
            localStorage.removeItem("selected_address");

            setLoading(false);

            navigate("/booking-success");
          } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error("Booking creation failed.");
          }
        },
      };

      console.log(options);
      const razor = new window.Razorpay(options);

     
      razor.on("payment.failed", function (res) {
        setLoading(false);

        console.log("===== PAYMENT FAILED =====");
        console.log(res);

        console.log("Code:", res.error.code);
        console.log("Description:", res.error.description);
        console.log("Source:", res.error.source);
        console.log("Step:", res.error.step);
        console.log("Reason:", res.error.reason);
        console.log("Metadata:", res.error.metadata);

        toast.error(`
Code: ${res.error.code}

Description: ${res.error.description}

Reason: ${res.error.reason}

Source: ${res.error.source}

Step: ${res.error.step}
`);
      });

      razor.open();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Payment initialization failed.");
    }
  };
  return (
    <MainLayout>
      {loading && <PaymentLoader message={loadingMessage} />}

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Secure Checkout</h1>

            <p className="text-gray-500 mt-2">
              Complete your payment to confirm your booking.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <BookingSummary booking={booking} address={address} onAmountChange={setFinalAmount} />

            <PaymentMethodCard
              amount={finalAmount}
              loading={loading}
              onPay={handlePayment}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Payment;