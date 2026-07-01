import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
  unreadByChat: {}, // { chatId: count }
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },

    addNotification: (state, action) => {
      const { chatId, chat } = action.payload;
      const notifChatId = chatId || chat;
      
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
      
      // Track unread count per chat - only increment
      if (notifChatId) {
        state.unreadByChat[notifChatId] = (state.unreadByChat[notifChatId] || 0) + 1;
      }
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

    markChatAsRead: (state, action) => {
      const chatId = action.payload;
      const unreadCount = state.unreadByChat[chatId] || 0;
      
      // Mark all notifications from this chat as read
      state.notifications.forEach((notif) => {
        const notifChatId = notif.chat || notif.chatId;
        if (notifChatId === chatId && !notif.isRead) {
          notif.isRead = true;
        }
      });
      
      // Update counts
      state.unreadCount = Math.max(0, state.unreadCount - unreadCount);
      state.unreadByChat[chatId] = 0;
    },

    setUnreadByChat: (state, action) => {
      state.unreadByChat = action.payload;
    },
  },
});

export const { 
  setNotifications, 
  addNotification, 
  setUnreadCount, 
  markRead,
  markChatAsRead,
  setUnreadByChat 
} = notificationSlice.actions;

export default notificationSlice.reducer;
