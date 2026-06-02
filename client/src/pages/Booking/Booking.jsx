import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import vehicleApi from "../../api/vehicleApi";
import packageApi from "../../api/packageApi";

const Booking = () => {
  const [step, setStep] = useState(1);

  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [selectedWash, setSelectedWash] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");
  const [vehicles, setVehicles] = useState([]);

  const [packages, setPackages] = useState([]);

  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const vehicleRes = await vehicleApi.getVehicles();

      const packageRes = await packageApi.getPackages();

      setVehicles(vehicleRes.data);

      setPackages(packageRes.data);
    } catch (error) {
      console.log(error);
    }
  };
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-xl p-6 md:p-10">
          {/* Header */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-4 flex-wrap items-center">
              {/* VEHICLE */}
              <button
                onClick={() => {
                  if (step >= 2) {
                    setStep(1);

                    setSelectedWash("");
                    setSelectedDate("");
                    setSelectedTime("");
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  step === 1
                    ? "bg-blue-600 text-white"
                    : step > 1
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                Vehicle
              </button>

              {/* LINE */}
              <div className="w-10 h-[3px] bg-gray-300 rounded-full"></div>

              {/* WASH TYPE */}
              <button
                onClick={() => {
                  if (step >= 3) {
                    setStep(2);

                    setSelectedDate("");
                    setSelectedTime("");
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  step === 2
                    ? "bg-blue-600 text-white"
                    : step > 2
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                Wash Type
              </button>

              {/* LINE */}
              <div className="w-10 h-[3px] bg-gray-300 rounded-full"></div>

              {/* SCHEDULE */}
              <button
                disabled={step < 3}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  step === 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } ${step < 3 ? "cursor-not-allowed opacity-60" : ""}`}
              >
                Schedule
              </button>
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Select Vehicle Type</h1>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {vehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`cursor-pointer border-2 rounded-3xl p-4 transition ${
                      selectedVehicle?._id === vehicle._id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={`http://localhost:5000/${vehicle.image}`}
                      alt={vehicle.name}
                      className="h-32 w-full object-cover rounded-2xl"
                    />

                    <h2 className="text-center font-semibold mt-4">
                      {vehicle.name}
                    </h2>
                  </div>
                ))}
              </div>

              <button
                disabled={!selectedVehicle}
                onClick={() => setStep(2)}
                className="mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Select Wash Type</h1>

              <div className="space-y-5">
                {packages
                  .filter((item) => item.vehicleId._id === selectedVehicle?._id)
                  .map((wash) => (
                    <div
                      onClick={() => setSelectedPackage(wash)}
                      className={`border-2 rounded-3xl p-6 cursor-pointer transition flex justify-between items-center ${
                        selectedPackage?._id === wash._id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div>
                        <h2 className="text-2xl font-bold">
                          {wash.packageName}
                        </h2>

                        <p className="text-gray-500 mt-2">{wash.description}</p>
                      </div>

                      <h1 className="text-3xl font-bold text-blue-600">
                        ₹{wash.price}
                      </h1>
                    </div>
                  ))}
              </div>

              <button
                disabled={!selectedPackage}
                onClick={() => setStep(3)}
                className="mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Schedule Your Service</h1>

              {/* Calendar */}
              <div className="mb-10">
                <label className="font-semibold text-lg">Select Date</label>

                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full mt-4 border border-gray-300 p-5 rounded-2xl text-lg"
                />
              </div>

              {/* Time Slots */}
              <div>
                <h2 className="font-semibold text-lg mb-6">Select Time Slot</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-4 rounded-2xl border-2 font-semibold transition ${
                        selectedTime === slot
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <Link to="/address">
                {/* <button
                    disabled={!selectedDate || !selectedTime}
                    className="mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl text-lg font-semibold transition"
                  >
                    Continue →
                  </button> */}
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => {
                    // booking object
                    const bookingData = {
                      vehicleId: selectedVehicle._id,

                      vehicleName: selectedVehicle.name,

                      packageId: selectedPackage._id,

                      packageName: selectedPackage.packageName,

                      date: selectedDate,

                      timeSlot: selectedTime,

                      amount: selectedPackage.price,
                    };

                    // save booking
                    localStorage.setItem(
                      "washgo_booking",
                      JSON.stringify(bookingData),
                    );

                    // navigate
                    window.location.href = "/address";
                  }}
                  className="mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl text-lg font-semibold transition"
                >
                  Continue →
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Booking;
