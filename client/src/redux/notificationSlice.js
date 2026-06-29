import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },

    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },

    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },

    markRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload,
      );

      if (notification) {
        notification.isRead = true;
      }

      state.unreadCount = Math.max(0, state.unreadCount - 1);
    },
  },
});

export const { setNotifications, addNotification, setUnreadCount, markRead } =
  notificationSlice.actions;

export default notificationSlice.reducer;
