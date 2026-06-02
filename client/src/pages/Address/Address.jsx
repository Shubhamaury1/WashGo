// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "../../layouts/MainLayout";

// const Address = () => {
//   const navigate = useNavigate();

//   const [addresses, setAddresses] = useState([]);

//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const [showForm, setShowForm] = useState(false);

//   const [editId, setEditId] = useState(null);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobile: "",
//     state: "",
//     district: "",
//     nearLocation: "",
//     pincode: "",
//   });

//   // fetch addresses
//   useEffect(() => {
//     const oldAddresses =
//       JSON.parse(localStorage.getItem("washgo_addresses")) || [];

//     setAddresses(oldAddresses);

//     const defaultAddress = oldAddresses.find((a) => a.default);

//     if (defaultAddress) {
//       setSelectedAddress(defaultAddress);
//     }
//   }, []);

//   // input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // mobile validation
//     if (name === "mobile") {
//       const mobileOnly = value.replace(/\D/g, "");

//       if (mobileOnly.length <= 10) {
//         setFormData({
//           ...formData,
//           mobile: mobileOnly,
//         });
//       }

//       return;
//     }

//     // pincode validation
//     if (name === "pincode") {
//       const pinOnly = value.replace(/\D/g, "");

//       if (pinOnly.length <= 6) {
//         setFormData({
//           ...formData,
//           pincode: pinOnly,
//         });
//       }

//       return;
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // save address
//   const handleSaveAddress = (e) => {
//     e.preventDefault();

//     // exact validation
//     if (formData.mobile.length !== 10) {
//       alert("Mobile number must be exactly 10 digits");
//       return;
//     }

//     if (formData.pincode.length !== 6) {
//       alert("Pincode must be exactly 6 digits");
//       return;
//     }

//     // EDIT
//     if (editId) {
//       const updatedAddresses = addresses.map((address) =>
//         address.id === editId
//           ? {
//               ...address,
//               ...formData,
//             }
//           : address,
//       );

//       localStorage.setItem(
//         "washgo_addresses",
//         JSON.stringify(updatedAddresses),
//       );

//       setAddresses(updatedAddresses);

//       // update selected address
//       const updatedSelected = updatedAddresses.find((a) => a.id === editId);

//       setSelectedAddress(updatedSelected);

//       setEditId(null);
//     } else {
//       // ADD NEW
//       const newAddress = {
//         id: Date.now(),
//         ...formData,
//         default: addresses.length === 0,
//       };

//       const updatedAddresses = [...addresses, newAddress];

//       localStorage.setItem(
//         "washgo_addresses",
//         JSON.stringify(updatedAddresses),
//       );

//       setAddresses(updatedAddresses);

//       setSelectedAddress(newAddress);
//     }

//     // reset
//     setShowForm(false);

//     setFormData({
//       fullName: "",
//       mobile: "",
//       state: "",
//       district: "",
//       nearLocation: "",
//       pincode: "",
//     });
//   };

//   // edit
//   const handleEdit = (address) => {
//     setEditId(address.id);

//     setFormData({
//       fullName: address.fullName,
//       mobile: address.mobile,
//       state: address.state,
//       district: address.district,
//       nearLocation: address.nearLocation,
//       pincode: address.pincode,
//     });

//     setShowForm(true);
//   };

//   // delete
//   const handleDelete = (id) => {
//     const updatedAddresses = addresses.filter((address) => address.id !== id);

//     localStorage.setItem("washgo_addresses", JSON.stringify(updatedAddresses));

//     setAddresses(updatedAddresses);

//     if (selectedAddress?.id === id) {
//       setSelectedAddress(null);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="min-h-screen bg-gray-100 flex justify-center p-4 md:p-10">
//         <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-xl p-6 md:p-10">
//           {/* HEADER */}
//           <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-10">
//             <h1 className="text-3xl md:text-4xl font-bold">Select Address</h1>

//             <button
//               onClick={() => {
//                 setShowForm(true);

//                 setEditId(null);

//                 setFormData({
//                   fullName: "",
//                   mobile: "",
//                   state: "",
//                   district: "",
//                   nearLocation: "",
//                   pincode: "",
//                 });
//               }}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
//             >
//               + Add New Address
//             </button>
//           </div>

//           {/* ADDRESS LIST */}
//           <div className="space-y-6">
//             {addresses.map((address) => (
//               <div
//                 key={address.id}
//                 onClick={() => {
//                   setSelectedAddress(address);

//                   localStorage.setItem(
//                     "selected_address",
//                     JSON.stringify(address),
//                   );

//                   const updatedAddresses = addresses.map((item) => ({
//                     ...item,
//                     default: item.id === address.id,
//                   }));

//                   localStorage.setItem(
//                     "washgo_addresses",
//                     JSON.stringify(updatedAddresses),
//                   );
//                 }}
//                 className={`border-2 rounded-3xl p-6 cursor-pointer transition

//                 ${
//                   selectedAddress?.id === address.id
//                     ? "border-blue-600 bg-blue-50"
//                     : "border-gray-200"
//                 }
//                 `}
//               >
//                 <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
//                   {/* LEFT */}
//                   <div className="flex-1">
//                     <h2 className="text-2xl font-bold break-words">
//                       {address.fullName}
//                     </h2>

//                     <p className="text-gray-600 mt-3">{address.mobile}</p>

//                     <p className="text-gray-600 mt-3 break-words">
//                       {address.nearLocation}, {address.district},{" "}
//                       {address.state}
//                     </p>

//                     <p className="text-gray-600 mt-3">
//                       Pincode: {address.pincode}
//                     </p>
//                   </div>

//                   {/* RIGHT */}
//                   <div className="flex flex-wrap gap-3 items-start">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();

//                         handleEdit(address);
//                       }}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();

//                         handleDelete(address.id);
//                       }}
//                       className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
//                     >
//                       Delete
//                     </button>

//                     {address.default && (
//                       <span className="bg-green-500 text-white px-5 py-2 rounded-full">
//                         Default
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* FORM */}
//           {showForm && (
//             <form
//               onSubmit={handleSaveAddress}
//               className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
//             >
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-5 rounded-2xl"
//                 required
//               />

//               <input
//                 type="text"
//                 name="mobile"
//                 placeholder="Mobile Number"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-5 rounded-2xl"
//                 required
//               />

//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-5 rounded-2xl"
//                 required
//               />

//               <input
//                 type="text"
//                 name="district"
//                 placeholder="District"
//                 value={formData.district}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-5 rounded-2xl"
//                 required
//               />

//               <input
//                 type="text"
//                 name="nearLocation"
//                 placeholder="Near Location"
//                 value={formData.nearLocation}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-5 rounded-2xl"
//                 required
//               />

//               <input
//                 type="text"
//                 name="pincode"
//                 placeholder="Pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-5 rounded-2xl"
//                 required
//               />

//               <button
//                 type="submit"
//                 className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-lg font-semibold"
//               >
//                 {editId ? "Update Address" : "Save Address"}
//               </button>
//             </form>
//           )}

//           {/* CONFIRM BUTTON */}
//           {!showForm && (
//             <button
//               disabled={!selectedAddress}
//               onClick={() => {
//                 const finalOrder = {
//                   booking: JSON.parse(localStorage.getItem("washgo_booking")),

//                   address: selectedAddress,

//                   orderId: "WG" + Math.floor(Math.random() * 999999),

//                   status: "Confirmed",

//                   createdAt: new Date(),
//                 };

//                 const oldOrders =
//                   JSON.parse(localStorage.getItem("washgo_orders")) || [];

//                 localStorage.setItem(
//                   "washgo_orders",
//                   JSON.stringify([...oldOrders, finalOrder]),
//                 );

//                 localStorage.setItem(
//                   "latest_order",
//                   JSON.stringify(finalOrder),
//                 );

//                 navigate("/booking-success");
//               }}
//               className="mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-5 rounded-2xl text-lg font-semibold"
//             >
//               Confirm Booking
//             </button>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Address;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import bookingApi from "../../api/bookingApi";

const Address = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    state: "",
    district: "",
    nearLocation: "",
    pincode: "",
  });

  // fetch addresses
  useEffect(() => {
    const oldAddresses =
      JSON.parse(localStorage.getItem("washgo_addresses")) || [];

    setAddresses(oldAddresses);

    const defaultAddress = oldAddresses.find((a) => a.default);

    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, []);

  const handleConfirmBooking = async () => {
    try {
      const booking = JSON.parse(localStorage.getItem("washgo_booking"));

      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        bookingId: "WG" + Date.now(),

        userId: user._id,

        vehicleId: booking.vehicleId,

        packageId: booking.packageId,

        addressId: selectedAddress._id,

        bookingDate: booking.date,

        timeSlot: booking.timeSlot,

        amount: booking.amount,
      };

      const response = await bookingApi.createBooking(payload);

      const latestOrder = {
        booking: {
          orderId: response.data.bookingId,

          vehicle: booking.vehicleName,

          washType: booking.packageName,

          date: booking.date,

          time: booking.timeSlot,

          price: booking.amount,
        },

        address: {
          fullName: selectedAddress.name,

          mobile: selectedAddress.mobile,

          nearLocation: selectedAddress.address,

          district: selectedAddress.city,

          state: selectedAddress.state,

          pincode: selectedAddress.pincode,
        },
      };

      localStorage.setItem("latest_order", JSON.stringify(latestOrder));

      navigate("/booking-success");
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }
  };
  
  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // mobile validation
    if (name === "mobile") {
      const mobileOnly = value.replace(/\D/g, "");

      if (mobileOnly.length <= 10) {
        setFormData({
          ...formData,
          mobile: mobileOnly,
        });
      }

      return;
    }

    // pincode validation
    if (name === "pincode") {
      const pinOnly = value.replace(/\D/g, "");

      if (pinOnly.length <= 6) {
        setFormData({
          ...formData,
          pincode: pinOnly,
        });
      }

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // save address
  const handleSaveAddress = (e) => {
    e.preventDefault();

    // exact validation
    if (formData.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (formData.pincode.length !== 6) {
      alert("Pincode must be exactly 6 digits");
      return;
    }

    // EDIT
    if (editId) {
      const updatedAddresses = addresses.map((address) =>
        address.id === editId
          ? {
              ...address,
              ...formData,
            }
          : address,
      );

      localStorage.setItem(
        "washgo_addresses",
        JSON.stringify(updatedAddresses),
      );

      setAddresses(updatedAddresses);

      // update selected address
      const updatedSelected = updatedAddresses.find((a) => a.id === editId);

      setSelectedAddress(updatedSelected);

      setEditId(null);
    } else {
      // ADD NEW
      const newAddress = {
        id: Date.now(),
        ...formData,
        default: addresses.length === 0,
      };

      const updatedAddresses = [...addresses, newAddress];

      localStorage.setItem(
        "washgo_addresses",
        JSON.stringify(updatedAddresses),
      );

      setAddresses(updatedAddresses);

      setSelectedAddress(newAddress);
    }

    // reset
    setShowForm(false);

    setFormData({
      fullName: "",
      mobile: "",
      state: "",
      district: "",
      nearLocation: "",
      pincode: "",
    });
  };

  // edit
  const handleEdit = (address) => {
    setEditId(address.id);

    setFormData({
      fullName: address.fullName,
      mobile: address.mobile,
      state: address.state,
      district: address.district,
      nearLocation: address.nearLocation,
      pincode: address.pincode,
    });

    setShowForm(true);
  };

  // delete
  const handleDelete = (id) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);

    localStorage.setItem("washgo_addresses", JSON.stringify(updatedAddresses));

    setAddresses(updatedAddresses);

    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 flex justify-center p-4 md:p-10">
        <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-xl p-6 md:p-10">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold">Select Address</h1>

            <button
              onClick={() => {
                setShowForm(true);

                setEditId(null);

                setFormData({
                  fullName: "",
                  mobile: "",
                  state: "",
                  district: "",
                  nearLocation: "",
                  pincode: "",
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
            >
              + Add New Address
            </button>
          </div>

          {/* ADDRESS LIST */}
          <div className="space-y-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => {
                  setSelectedAddress(address);

                  localStorage.setItem(
                    "selected_address",
                    JSON.stringify(address),
                  );

                  const updatedAddresses = addresses.map((item) => ({
                    ...item,
                    default: item.id === address.id,
                  }));

                  localStorage.setItem(
                    "washgo_addresses",
                    JSON.stringify(updatedAddresses),
                  );
                }}
                className={`border-2 rounded-3xl p-6 cursor-pointer transition

                ${
                  selectedAddress?.id === address.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }
                `}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                  {/* LEFT */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold break-words">
                      {address.fullName}
                    </h2>

                    <p className="text-gray-600 mt-3">{address.mobile}</p>

                    <p className="text-gray-600 mt-3 break-words">
                      {address.nearLocation}, {address.district},{" "}
                      {address.state}
                    </p>

                    <p className="text-gray-600 mt-3">
                      Pincode: {address.pincode}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-wrap gap-3 items-start">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        handleEdit(address);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        handleDelete(address.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                    >
                      Delete
                    </button>

                    {address.default && (
                      <span className="bg-green-500 text-white px-5 py-2 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          {showForm && (
            <form
              onSubmit={handleSaveAddress}
              className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="border border-gray-300 p-5 rounded-2xl"
                required
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="border border-gray-300 p-5 rounded-2xl"
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border border-gray-300 p-5 rounded-2xl"
                required
              />

              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="border border-gray-300 p-5 rounded-2xl"
                required
              />

              <input
                type="text"
                name="nearLocation"
                placeholder="Near Location"
                value={formData.nearLocation}
                onChange={handleChange}
                className="border border-gray-300 p-5 rounded-2xl"
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border border-gray-300 p-5 rounded-2xl"
                required
              />

              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-lg font-semibold"
              >
                {editId ? "Update Address" : "Save Address"}
              </button>
            </form>
          )}

          {/* CONFIRM BUTTON */}
          {!showForm && (
            <button
              disabled={!selectedAddress}
              // onClick={() => {
              //   const finalOrder = {
              //     booking: JSON.parse(localStorage.getItem("washgo_booking")),

              //     address: selectedAddress,

              //     orderId: "WG" + Math.floor(Math.random() * 999999),

              //     status: "Confirmed",

              //     createdAt: new Date(),
              //   };

              //   const oldOrders =
              //     JSON.parse(localStorage.getItem("washgo_orders")) || [];

              //   localStorage.setItem(
              //     "washgo_orders",
              //     JSON.stringify([...oldOrders, finalOrder]),
              //   );

              //   localStorage.setItem(
              //     "latest_order",
              //     JSON.stringify(finalOrder),
              //   );

              //   navigate("/booking-success");
              // }}
              onClick={handleConfirmBooking}
              className="mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-5 rounded-2xl text-lg font-semibold"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Address;