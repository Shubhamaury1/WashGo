import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import authApi from "../../api/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");

  // Step 1
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.forgotPassword({
        email,
      });

      alert(res.data.message);

      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2
  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.verifyOtp({
        email,
        otp,
      });

      alert(res.data.message);

      setStep(3);
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  // Step 3
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await authApi.resetPassword({
        email,
        otp,
        password: newPassword,
      });

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-8 md:p-14">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Forgot Password
            </h1>

            <p className="text-gray-500 mt-4">Reset your password securely</p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="mt-12 space-y-6">
              <div>
                <label className="font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                Send OTP
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="mt-12 space-y-6">
              <div>
                <label className="font-medium text-gray-700">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                Continue
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <form onSubmit={handleOTPSubmit} className="mt-12 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">OTP Verification</h2>

                <p className="text-gray-500 mt-4">
                  Enter 6 digit OTP sent to email
                </p>

                <p className="mt-3 text-blue-600 font-bold">Demo OTP: 123456</p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 text-center text-2xl tracking-[10px] outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </MainLayout>
  );
};;

export default ForgotPassword;
