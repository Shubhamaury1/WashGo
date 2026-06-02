import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import authApi from "../../api/authApi";

import { loginSuccess } from "../../redux/authSlice";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.login(formData);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(
        loginSuccess({
          token: res.data.token,
          user: res.data.user,
        }),
      );

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex flex-col justify-center bg-blue-600 text-white p-16"
          >
            <h1 className="text-5xl font-bold leading-tight">
              Welcome Back To WashGo
            </h1>

            <p className="mt-8 text-lg leading-8 text-blue-100">
              Book trusted vehicle washing professionals instantly and enjoy
              premium doorstep cleaning services.
            </p>

            <img
              src="https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?q=80&w=1200&auto=format&fit=crop"
              alt="login"
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
                Login
              </h1>

              <p className="text-gray-500 mt-4">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Forgot */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Button */}
              <button
             
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-[1px] bg-gray-300"></div>

              <span className="text-gray-400">OR</span>

              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* Social Buttons */}
            <div className="space-y-4">
              <button className="w-full border border-gray-300 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition">
                Continue with Google
              </button>

              <button className="w-full border border-gray-300 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition">
                Continue with Phone
              </button>
            </div>

            {/* Signup */}
            <p className="text-center text-gray-600 mt-10">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold">
                Create Account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
