import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Sidebar from "../../components/dashboard/Sidebar";
import { IoEye, IoEyeOff } from "react-icons/io5";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaBell,
  FaMoon,
  FaSave,
} from "react-icons/fa";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const IMG_URL = import.meta.env.VITE_API_IMG_URL;

  const [profileImage, setProfileImage] = useState(
    user?.photo ? `${IMG_URL}${user.photo}` : "",
  );

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotification: true,
    smsNotification: false,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update Profile
      const data = new FormData();

      data.append("userId", user.id || user._id);
      data.append("fullName", formData.fullName);
      data.append("mobile", formData.mobile);

      if (profileFile) {
        data.append("photo", profileFile);
      }

      const profileRes = await authApi.updateProfile(data);

      // localStorage.setItem("user", JSON.stringify(profileRes.data.user));
      const updatedUser = profileRes.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setProfileImage(
        updatedUser.photo
          ? `${IMG_URL}${updatedUser.photo}`
          : "",
      );

      setProfileImage(`${IMG_URL}${profileRes.data.user.photo}`);

      localStorage.setItem("user", JSON.stringify(profileRes.data.user));

      // Change password only if any password field is filled
      if (
        formData.currentPassword ||
        formData.newPassword ||
        formData.confirmPassword
      ) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("New Password and Confirm Password do not match");
          return;
        }

        const passRes = await authApi.changePassword({
          userId: user.id || user._id,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });

        toast.success(passRes.data.message);

        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }

      toast.success("Profile Updated Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileFile(file);

    setProfileImage(URL.createObjectURL(file));
  };
  return (
    <MainLayout>
      <div className="bg-[#f5f7fb] min-h-screen">
        <div className="flex gap-6 p-6">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 ml-[294px]">
            <h1 className="text-3xl font-bold text-[#0d2240] mb-3">
              Account Settings
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile */}
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="border-b">
                  <div className="flex items-center gap-3 p-4">
                    <FaUser className="text-2xl text-blue-600" />

                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-3">
                        Profile Information
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="grid lg:grid-cols-3 gap-10 p-6">
                  {/* Left Side */}
                  <div className="lg:col-span-2 space-y-2">
                    {/* Full Name */}
                    <div>
                      <label className="font-semibold  mb-1 block">
                        Full Name
                      </label>

                      <div className="relative">
                        <FaUser className="absolute top-4 left-4 text-gray-400" />

                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full rounded-xl h-12 border border-gray-300 pl-12 pr-5 text-lg outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="font-semibold mb-1 block">
                        Mobile Number
                      </label>

                      <div className="relative">
                        <FaPhoneAlt className="absolute top-4 left-4 text-gray-400" />

                        <input
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full h-12 rounded-2xl border border-gray-300 pl-14 pr-5 text-lg outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-semibold mb-1 block">Email</label>

                      <div className="relative">
                        <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                        <input
                          type="email"
                          disabled
                          value={formData.email}
                          className="w-full h-12 rounded-2xl border border-gray-300 bg-gray-100 pl-14 pr-5 text-lg cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="border-l lg:pl-10 flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">
                      Profile Image
                    </h3>

                    <div className="relative">
                      {/* <img
                        src={
                          formData.photo ||
                          `https://ui-avatars.com/api/?name=${formData.fullName}&background=eaf2ff&color=2563eb&size=250`
                        }
                        alt=""
                        className="w-44 h-44 rounded-full object-cover border shadow-md"
                      /> */}
                      <img
                        src={
                          profileImage ||
                          `https://ui-avatars.com/api/?name=${formData.fullName}`
                        }
                        className="w-44 h-44 rounded-full object-cover"
                      />

                      <label
                        htmlFor="profile"
                        className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer flex justify-center items-center text-white text-2xl shadow-lg"
                      >
                        📷
                      </label>

                      <input
                        id="profile"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>

                    <p className="text-gray-500 mt-6 text-lg">
                      JPG, PNG (Max 2MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="bg-white rounded-3xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <FaLock className="text-red-500" />
                  Change Password
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Current Password */}
                  <div>
                    <label className="block font-semibold mb-1">
                      Current Password
                    </label>

                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        className="w-full h-12 border border-gray-300 rounded-xl px-4 pr-12 outline-none focus:border-blue-600"
                      />

                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-blue-600"
                      >
                        {showCurrent ? <IoEyeOff /> : <IoEye />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block font-semibold mb-1">
                      New Password
                    </label>

                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="w-full h-12 border border-gray-300 rounded-xl px-4 pr-12 outline-none focus:border-blue-600"
                      />

                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-blue-600"
                      >
                        {showNew ? <IoEyeOff /> : <IoEye />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block font-semibold mb-1">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="w-full h-12 border border-gray-300 rounded-xl px-4 pr-12 outline-none focus:border-blue-600"
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-blue-600"
                      >
                        {showConfirm ? <IoEyeOff /> : <IoEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-3xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <FaBell className="text-yellow-500" />
                  Preferences
                </h2>

                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="font-semibold">Email Notifications</h3>

                      <p className="text-gray-500 text-sm">
                        Receive booking updates through email.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      name="emailNotification"
                      checked={formData.emailNotification}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="font-semibold">SMS Notifications</h3>

                      <p className="text-gray-500 text-sm">
                        Receive booking updates through SMS.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      name="smsNotification"
                      checked={formData.smsNotification}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FaMoon className="text-indigo-600" />

                      <div>
                        <h3 className="font-semibold">Dark Mode</h3>

                        <p className="text-gray-500 text-sm">
                          Enable dark appearance.
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      name="darkMode"
                      checked={formData.darkMode}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                  </div>
                </div>
              </div>

              {/* Save */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
