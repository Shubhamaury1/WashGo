import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: user || null,
    token: token || null,
    isAuthenticated: !!token,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;

      state.token = action.payload.token;

      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;

      state.token = null;

      state.isAuthenticated = false;

      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
