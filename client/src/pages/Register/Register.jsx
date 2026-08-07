import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authApi from "../../api/authApi";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import reglogo from "../../assets/logos/register.jpg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
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
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      toast.error("Please accept Terms & Conditions");
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

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // console.log("Button clicked");

      const provider = new GoogleAuthProvider();

      // console.log("Opening popup");

      const result = await signInWithPopup(auth, provider);

      // console.log(result);

      const idToken = await result.user.getIdToken();

     
      const res = await authApi.googleLogin({
        token: idToken,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(
        loginSuccess({
          token: res.data.token,
          user: res.data.user,
        }),
      );

      navigate("/dashboard");

      // console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#EEF3FB] flex items-center justify-center px-4 sm:px-5 py-8 sm:py-10">
        <div className="w-full max-w-7xl bg-white rounded-2xl sm:rounded-[36px] overflow-hidden shadow-lg sm:shadow-2xl grid lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#244FD5] via-[#3568F3] to-[#2249C7] p-8 lg:p-12 text-white"
          >
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-10 lg:mb-14">
                <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/20 flex items-center justify-center text-lg lg:text-xl">
                  ⚡
                </div>

                <h2 className="font-bold text-2xl lg:text-3xl">WashGo</h2>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Join WashGo Today
              </h1>

              <p className="mt-6 lg:mt-8 text-blue-100 text-base lg:text-xl leading-8 lg:leading-9 max-w-md">
                Create your account and book professional vehicle washing
                services at your doorstep instantly.
              </p>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl">
                <img
                  src={reglogo}
                  alt=""
                  className="w-full h-48 lg:h-72 object-cover"
                />
              </div>

              <div className="flex items-center gap-4 lg:gap-5">
                <div className="flex -space-x-2 lg:-space-x-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-300 border-3 lg:border-4 border-[#2D5AE7] flex items-center justify-center text-sm lg:text-base">
                    2K
                  </div>

                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-200 border-3 lg:border-4 border-[#2D5AE7] flex items-center justify-center text-sm lg:text-base">
                    3K
                  </div>

                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-100 border-3 lg:border-4 border-[#2D5AE7] flex items-center justify-center text-sm lg:text-base text-black">
                    4K
                  </div>
                </div>

                <p className="text-sm lg:text-lg">
                  Trusted by
                  <span className="font-bold"> 10,000+ </span>
                  customers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-5 sm:p-8 lg:p-12 flex flex-col justify-center"
          >
            <div className="w-full max-w-md">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Create Account
              </h1>

              <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
                Fill the details below to register
              </p>
            </div>

            {/* Form */}
            <form className="mt-8 sm:mt-12 space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="text-gray-700 font-medium text-sm sm:text-base">Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-2 sm:mt-3 w-full rounded-xl sm:rounded-2xl border border-blue-100 bg-[#F8FAFD] px-4 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="text-gray-700 font-medium text-sm sm:text-base">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="mt-2 sm:mt-3 w-full rounded-xl sm:rounded-2xl border border-blue-100 bg-[#F8FAFD] px-4 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700 font-medium text-sm sm:text-base">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="mt-2 sm:mt-3 w-full rounded-xl sm:rounded-2xl border border-blue-100 bg-[#F8FAFD] px-4 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-700 font-medium text-sm sm:text-base">Password</label>

                <div className="relative mt-2 sm:mt-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full rounded-xl sm:rounded-2xl border border-blue-100 bg-[#F8FAFD] px-4 sm:px-6 py-2.5 sm:py-4 pr-12 sm:pr-14 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                  >
                    {showPassword ? (
                      <IoEye size={20} className="sm:w-[22px] sm:h-[22px]" />
                    ) : (
                      <IoEyeOff size={20} className="sm:w-[22px] sm:h-[22px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-gray-700 font-medium text-sm sm:text-base">
                  Confirm Password
                </label>

                <div className="relative mt-2 sm:mt-3">
                  <input
                    type={confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full rounded-xl sm:rounded-2xl border border-blue-100 bg-[#F8FAFD] px-4 sm:px-6 py-2.5 sm:py-4 pr-12 sm:pr-14 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPassword(!confirmPassword)}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                  >
                    {confirmPassword ? (
                      <IoEye size={20} className="sm:w-[22px] sm:h-[22px]" />
                    ) : (
                      <IoEyeOff size={20} className="sm:w-[22px] sm:h-[22px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer"
                />

                <p className="text-gray-600 text-xs sm:text-sm">
                  I agree to the Terms & Conditions
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-xl sm:rounded-2xl py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-[#2E63F4] to-[#244ED6] shadow-xl hover:scale-[1.02] transition active:scale-95"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6 sm:my-10">
              <div className="flex-1 h-px bg-gray-300"></div>

              <span className="text-gray-400 font-medium text-xs sm:text-sm">OR</span>

              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* Social Login */}

            <button
              onClick={handleGoogleLogin}
              className="w-full h-11 sm:h-14 rounded-xl sm:rounded-2xl border border-gray-300 flex items-center justify-center gap-3 font-semibold text-sm sm:text-base hover:bg-gray-50 transition active:scale-95"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 sm:w-6"
                alt=""
              />
              Continue with Google
            </button>

            {/* Login */}
            <p className="text-center text-gray-600 mt-6 sm:mt-10 text-xs sm:text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-[#2E63F4] hover:underline">
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
