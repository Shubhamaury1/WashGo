import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import authApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      const payload = {
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      };

      const res = await authApi.register(payload);

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };


  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-7xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex flex-col justify-center bg-blue-600 text-white p-16"
          >
            <h1 className="text-5xl font-bold leading-tight">
              Join WashGo Today
            </h1>

            <p className="mt-8 text-lg leading-8 text-blue-100">
              Create your account and book professional vehicle washing services
              at your doorstep instantly.
            </p>

            <img
              src="https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?q=80&w=1200&auto=format&fit=crop"
              alt="register"
              className="mt-12 rounded-3xl shadow-2xl"
            />
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="p-8 md:p-16 flex flex-col justify-center"
          >
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Create Account
              </h1>

              <p className="text-gray-500 mt-4">
                Fill the details below to register
              </p>
            </div>

            {/* Form */}
            <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="text-gray-700 font-medium">Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="text-gray-700 font-medium">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700 font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-700 font-medium">Password</label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-gray-700 font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Terms */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-5 h-5"
                />

                <p className="text-gray-600">
                  I agree to the Terms & Conditions
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-[1px] bg-gray-300"></div>

              <span className="text-gray-400">OR</span>

              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-4">
              <button className="w-full border border-gray-300 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition">
                Continue with Google
              </button>

              <button className="w-full border border-gray-300 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition">
                Continue with Phone
              </button>
            </div>

            {/* Login */}
            <p className="text-center text-gray-600 mt-10">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
