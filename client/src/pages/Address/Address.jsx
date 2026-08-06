import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import addressApi from "../../api/addressApi";
import { toast } from "react-toastify";

const Address = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // fetch addresses
  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const userId = user?._id || user?.id;

      const res = await addressApi.getAddressesByUserId(userId);

      setAddresses(res.data);

      const defaultAddress = res.data.find((item) => item.isDefault);

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (res.data.length > 0) {
        setSelectedAddress(res.data[0]);
      } else {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // input change
  const handleConfirmBooking = () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    localStorage.setItem("selected_address", JSON.stringify(selectedAddress));

    navigate("/payment");
  };
  
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
  const handleSaveAddress = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        userId: user?._id || user?.id,
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      };

      let response;

      if (editId) {
        response = await addressApi.updateAddress(editId, payload);

        setAddresses((prev) =>
          prev.map((item) => (item._id === editId ? response.data : item)),
        );
      } else {
        response = await addressApi.createAddress(payload);
        await loadAddresses();

        setSelectedAddress(response.data);

        // setAddresses((prev) => [...prev, response.data]);
      }

      setShowForm(false);

      setEditId(null);

      setFormData({
        name: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Save Failed");
    }
  };

  // edit
  const handleEdit = (address) => {
    setEditId(address._id);

    setFormData({
      name: address.name,
      mobile: address.mobile,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });

    setShowForm(true);
  };

  // delete
  const handleDelete = async (id) => {
    try {
      await addressApi.deleteAddress(id);

      const updatedAddresses = addresses.filter((item) => item._id !== id);

      setAddresses(updatedAddresses);

      if (selectedAddress?._id === id) {
        if (updatedAddresses.length > 0) {
          const defaultAddress =
            updatedAddresses.find((item) => item.isDefault) ||
            updatedAddresses[0];

          setSelectedAddress(defaultAddress);
        } else {
          setSelectedAddress(null);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 flex justify-center p-3 md:p-10">
        <div className="w-full max-w-5xl bg-white rounded-2xl md:rounded-[40px] shadow-xl p-4 md:p-10">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-5 mb-6 md:mb-10">
            <h1 className="text-2xl md:text-4xl font-bold">Select Address</h1>

            <button
              onClick={() => {
                setShowForm(true);

                setFormData({
                  name: "",
                  mobile: "",
                  address: "",
                  city: "",
                  state: "",
                  pincode: "",
                });

                setEditId(null);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold whitespace-nowrap"
            >
              + Add New Address
            </button>
          </div>

          {/* ADDRESS LIST */}
          <div className="space-y-3 md:space-y-6">
            {addresses.map((address) => (
              <div
                key={address._id}
                onClick={() => {
                  setSelectedAddress(address);
                }}
                className={`border-2 rounded-2xl md:rounded-3xl p-3 md:p-6 cursor-pointer transition ${
                  selectedAddress?._id === address._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex flex-col gap-3 md:gap-6">
                  {/* LEFT */}
                  <div className="flex-1">
                    <h2 className="text-lg md:text-2xl font-bold break-words">
                      {address.name}
                    </h2>

                    <p className="text-gray-600 mt-1 md:mt-3 text-sm md:text-base">{address.mobile}</p>

                    <p className="text-gray-600 mt-1 md:mt-3 break-words text-sm md:text-base">
                      {address.address}, {address.city}, {address.state}
                    </p>

                    <p className="text-gray-600 mt-1 md:mt-3 text-sm md:text-base">
                      Pincode: {address.pincode}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-wrap gap-2 md:gap-3 items-start">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(address);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 md:px-5 py-1 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(address._id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-5 py-1 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold"
                    >
                      Delete
                    </button>

                    {address.isDefault && (
                      <span className="bg-green-500 text-white px-3 md:px-5 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold">
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
              className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-base"
                required
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="border border-gray-300 p-3 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-base"
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border border-gray-300 p-3 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-base"
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border border-gray-300 p-3 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-base"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Near Location"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 p-3 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-base"
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border border-gray-300 p-3 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-base"
                required
              />

              <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-5 rounded-xl md:rounded-2xl text-sm md:text-lg font-semibold"
              >
                {editId ? "Update Address" : "Save Address"}
              </button>
            </form>
          )}

          {/* CONFIRM BUTTON */}
          {!showForm && (
            <button
              disabled={!selectedAddress}
              onClick={handleConfirmBooking}
              className="mt-6 md:mt-10 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 md:py-5 rounded-xl md:rounded-2xl text-sm md:text-lg font-semibold"
            >
              Continue To Payment
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Address;
