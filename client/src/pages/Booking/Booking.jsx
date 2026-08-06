import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import vehicleApi from "../../api/vehicleApi";
import packageApi from "../../api/packageApi";

const Booking = () => {
  const BaseURL = import.meta.env.VITE_API_IMG_URL;
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

      // setPackages(packageRes.data);
      setPackages(packageRes.data.filter((pack) => pack.isActive));
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

  const isSlotDisabled = (slot) => {
    if (!selectedDate) return false;

    // Today's date in yyyy-mm-dd
    const today = new Date().toISOString().split("T")[0];

    // Future date
    if (selectedDate > today) return false;

    // Past date
    if (selectedDate < today) return true;

    // Same day
    const now = new Date();

    const endTime = slot.split(" - ")[1];

    let [time, meridian] = endTime.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;

    const slotEnd = new Date();
    slotEnd.setHours(hour, minute, 0, 0);

    return now >= slotEnd;
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3 md:p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl md:rounded-[40px] shadow-xl p-4 md:p-10">
          {/* Header */}
          <div className="flex justify-center mb-6 md:mb-10 overflow-x-auto">
            <div className="flex gap-2 md:gap-4 flex-wrap items-center justify-center">
              {/* VEHICLE */}
              <button
                onClick={() => {
                  if (step >= 2) {
                    setStep(1);
                    setSelectedDate("");
                    setSelectedTime("");
                  }
                }}
                className={`px-3 md:px-6 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm transition whitespace-nowrap ${
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
              <div className="w-6 md:w-10 h-[3px] bg-gray-300 rounded-full hidden sm:block"></div>

              {/* WASH TYPE */}
              <button
                onClick={() => {
                  if (step >= 3) {
                    setStep(2);
                    setSelectedDate("");
                    setSelectedTime("");
                  }
                }}
                className={`px-3 md:px-6 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm transition whitespace-nowrap ${
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
              <div className="w-6 md:w-10 h-[3px] bg-gray-300 rounded-full hidden sm:block"></div>

              {/* SCHEDULE */}
              <button
                disabled={step < 3}
                className={`px-3 md:px-6 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm transition whitespace-nowrap ${
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
              <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8">Select Vehicle Type</h1>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`cursor-pointer border-2 rounded-2xl md:rounded-3xl p-2 md:p-4 transition ${
                      selectedVehicle?._id === vehicle._id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={`${BaseURL}${vehicle.image}`}
                      alt={vehicle.name}
                      className="h-20 md:h-32 w-full object-cover rounded-xl md:rounded-2xl"
                    />

                    <h2 className="text-center font-semibold mt-2 md:mt-4 text-sm md:text-base">
                      {vehicle.name}
                    </h2>
                  </div>
                ))}
              </div>

              <button
                disabled={!selectedVehicle}
                onClick={() => setStep(2)}
                className="mt-6 md:mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-lg font-semibold transition"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8">Select Wash Type</h1>

              <div className="space-y-3 md:space-y-5">
                {packages
                  .filter((item) => item.vehicleId._id === selectedVehicle?._id)
                  .map((wash) => (
                    <div
                      key={wash._id}
                      onClick={() => setSelectedPackage(wash)}
                      className={`border-2 rounded-2xl md:rounded-3xl p-3 md:p-6 cursor-pointer transition flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0 ${
                        selectedPackage?._id === wash._id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg md:text-2xl font-bold">
                          {wash.packageName}
                        </h2>

                        <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm line-clamp-2">{wash.description}</p>
                      </div>

                      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 flex-shrink-0">
                        ₹{wash.price}
                      </h1>
                    </div>
                  ))}
              </div>

              <button
                disabled={!selectedPackage}
                onClick={() => setStep(3)}
                className="mt-6 md:mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-lg font-semibold transition"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8">Schedule Your Service</h1>

              {/* Calendar */}
              <div className="mb-6 md:mb-10">
                <label className="font-semibold text-sm md:text-lg">Select Date</label>

                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full mt-2 md:mt-4 border border-gray-300 p-3 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-lg"
                />
              </div>

              {/* Time Slots */}
              <div>
                <h2 className="font-semibold text-sm md:text-lg mb-3 md:mb-6">Select Time Slot</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                  {timeSlots.map((slot) => {
                    const disabled = isSlotDisabled(slot);

                    return (
                      <button
                        key={slot}
                        disabled={disabled}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 md:py-4 px-2 md:px-0 rounded-lg md:rounded-2xl border-2 font-semibold text-xs md:text-sm transition ${
                          disabled
                            ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                            : selectedTime === slot
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Link to="/address">
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
                  className="mt-6 md:mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-lg font-semibold transition"
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
