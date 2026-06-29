import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
  connected: false,
};

const socketSlice = createSlice({
  name: "socket",

  initialState,

  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setConnected: (state, action) => {
      state.connected = action.payload;
    },
  },
});

export const { setOnlineUsers, setConnected } = socketSlice.actions;

export default socketSlice.reducer;
