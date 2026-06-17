import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import authApi from "../../api/authApi";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");

  // Step 1
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      setSendingOtp(true);

      const res = await authApi.forgotPassword({
        email,
      });

      alert(res.data.message);

      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  // Step 2
  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    try {
      setVerifyingOtp(true);
      const res = await authApi.verifyOtp({
        email,
        otp,
      });

      alert(res.data.message);

      setStep(3);
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setVerifyingOtp(false);
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
      setResettingPassword(true);
      const res = await authApi.resetPassword({
        email,
        otp,
        password: newPassword,
      });

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed");
    } finally {
      setResettingPassword(false);
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
                <label className="font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-blue-100 bg-[#F8FAFD] px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* <button
                type="submit"
                className="w-full rounded-2xl py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#2E63F4] to-[#244ED6] shadow-xl hover:scale-[1.02] transition"
              >
                Send OTP →
              </button> */}
              <button
                type="submit"
                disabled={sendingOtp}
                className={`w-full rounded-2xl py-4 text-lg font-semibold text-white transition
    ${
      sendingOtp
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-[#2E63F4] to-[#244ED6] hover:scale-[1.02] shadow-xl"
    }`}
              >
                {sendingOtp ? "Sending OTP..." : "Send OTP →"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleOTPSubmit} className="mt-12 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">OTP Verification</h2>

                <p className="text-gray-500 mt-4">
                  Enter 6 digit OTP sent to email
                </p>
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

              {/* <button
                type="submit"
                className="w-full rounded-2xl py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#2E63F4] to-[#244ED6] shadow-xl hover:scale-[1.02] transition"
              >
                Verify OTP
              </button> */}
              <button
                type="submit"
                disabled={verifyingOtp}
                className={`w-full rounded-2xl py-4 text-lg font-semibold text-white transition
    ${
      verifyingOtp
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-[#2E63F4] to-[#244ED6] hover:scale-[1.02] shadow-xl"
    }`}
              >
                {verifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="mt-12 space-y-6">
              <div>
                <label className="font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-blue-100 bg-[#F8FAFD] px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/4 text-gray-500 hover:text-blue-600 transition"
                  >
                    {showPassword ? (
                      <IoEye size={22} />
                    ) : (
                      <IoEyeOff size={22} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative mt-3">
                  <input
                    type={confirmPasswordCheck ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-blue-100 bg-[#F8FAFD] px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmPasswordCheck(!confirmPasswordCheck)
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/4 text-gray-500 hover:text-blue-600 transition"
                  >
                    {confirmPasswordCheck ? (
                      <IoEye size={22} />
                    ) : (
                      <IoEyeOff size={22} />
                    )}
                  </button>
                </div>
              </div>

              {/* <button
                type="submit"
                className="w-full rounded-2xl py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#2E63F4] to-[#244ED6] shadow-xl hover:scale-[1.02] transition"
              >
                Continue
              </button> */}
              <button
                type="submit"
                disabled={resettingPassword}
                className={`w-full rounded-2xl py-4 text-lg font-semibold text-white transition
    ${
      resettingPassword
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-[#2E63F4] to-[#244ED6] hover:scale-[1.02] shadow-xl"
    }`}
              >
                {resettingPassword ? "Updating Password..." : "Continue"}
              </button>
            </form>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
