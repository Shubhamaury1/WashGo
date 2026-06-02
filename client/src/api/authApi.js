import API from "./axios";

const authApi = {
  login: (data) => API.post("/auth/login", data),

  register: (data) => API.post("/auth/register", data),

  forgotPassword: (data) => API.post("/auth/forgot-password", data),

  verifyOtp: (data) => API.post("/auth/verify-otp", data),

  resetPassword: (data) => API.post("/auth/reset-password", data),
};

export default authApi;
