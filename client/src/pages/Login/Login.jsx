import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { loginSuccess } from "../../redux/authSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import loginlogo from "../../assets/logos/logi.avif"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
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
      toast.error(err.response?.data?.message || "Login Failed");
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

      // console.log(idToken);

      // const res = await authApi.googleLogin({
      //   token: idToken,
      // });
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
          {/* LEFT SIDE */}
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
                Welcome Back
                <br />
                To WashGo
              </h1>

              <p className="mt-6 lg:mt-8 text-blue-100 text-base lg:text-xl leading-8 lg:leading-9 max-w-md">
                Book trusted vehicle washing professionals instantly and enjoy
                premium doorstep cleaning services.
              </p>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl">
                <img src={loginlogo} alt="" className="w-full h-48 lg:h-72 object-cover" />
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

          {/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center p-5 sm:p-8 lg:p-16"
          >
            <div className="w-full max-w-md">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Login</h2>

              <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
                Enter your credentials to continue
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
                {/* Email */}

                <div>
                  <label className="font-semibold text-gray-700 text-sm sm:text-base">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="mt-2 sm:mt-3 w-full rounded-xl sm:rounded-2xl border border-blue-100 bg-[#F8FAFD] px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

               

                <div>
                  <label className="font-semibold text-gray-700 text-sm sm:text-base">
                    Password
                  </label>

                  <div className="relative mt-2 sm:mt-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded-xl sm:rounded-2xl border border-blue-100 bg-[#F8FAFD] px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-14 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
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

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 font-semibold text-xs sm:text-md hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* LOGIN */}

                <button
                  type="submit"
                  className="w-full rounded-xl sm:rounded-2xl py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-[#2E63F4] to-[#244ED6] shadow-xl hover:scale-[1.02] transition active:scale-95"
                >
                  Login →
                </button>
              </form>

              {/* Divider */}

              <div className="flex items-center gap-4 my-6 sm:my-10">
                <div className="flex-1 h-px bg-gray-300"></div>

                <span className="text-gray-400 font-medium text-xs sm:text-sm">OR</span>

                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* GOOGLE */}

              <button
                onClick={handleGoogleLogin}
                className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border border-gray-300 flex items-center justify-center gap-3 font-semibold text-sm sm:text-base hover:bg-gray-50 transition active:scale-95"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 sm:w-6"
                  alt=""
                />
                Continue with Google
              </button>


              <p className="text-center text-gray-500 mt-6 sm:mt-10 text-xs sm:text-sm">
                Don't have an account?
                <Link to="/register" className="ml-1 sm:ml-2 font-bold text-[#2E63F4] hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
