import API from "./axios";

const authApi = {
  login: (data) => API.post("/auth/login", data),

  register: (data) => API.post("/auth/register", data),

  forgotPassword: (data) => API.post("/auth/forgot-password", data),

  verifyOtp: (data) => API.post("/auth/verify-otp", data),

  resetPassword: (data) => API.post("/auth/reset-password", data),

  getUsers: () => API.get("/auth/users"),

  googleLogin: (data) => API.post("/auth/google-login", data),
};

export default authApi;
