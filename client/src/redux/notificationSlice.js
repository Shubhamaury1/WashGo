import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0, // All unread notifications
  unreadChatCount: 0, // Only chat notifications
  unreadByChat: {}, // { chatId: count }
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      // Calculate unread counts
      let chatUnread = 0;
      let totalUnread = 0;
      const unreadByChat = {};
      
      action.payload.forEach((n) => {
        if (!n.isRead) {
          totalUnread += 1;
          
          // Count chat notifications separately
          const chatId = n.chat || n.chatId;
          if (chatId) {
            chatUnread += 1;
            unreadByChat[chatId] = (unreadByChat[chatId] || 0) + 1;
          }
        }
      });
      
      state.unreadCount = totalUnread;
      state.unreadChatCount = chatUnread;
      state.unreadByChat = unreadByChat;
    },

    addNotification: (state, action) => {
      const { chatId, chat } = action.payload;
      const notifChatId = chatId || chat;
      
      state.notifications.unshift(action.payload);
      
      if (!action.payload.isRead) {
        state.unreadCount += 1;
        
        // Track unread count per chat - only increment
        if (notifChatId) {
          state.unreadChatCount += 1;
          state.unreadByChat[notifChatId] = (state.unreadByChat[notifChatId] || 0) + 1;
        }
      }
    },

    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },

    setUnreadChatCount: (state, action) => {
      state.unreadChatCount = action.payload;
    },

    markRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload,
      );

      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
        
        // Decrease chat count if it's a chat notification
        const chatId = notification.chat || notification.chatId;
        if (chatId) {
          state.unreadChatCount = Math.max(0, state.unreadChatCount - 1);
          state.unreadByChat[chatId] = Math.max(0, (state.unreadByChat[chatId] || 0) - 1);
        }
      }
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
      state.unreadChatCount = Math.max(0, state.unreadChatCount - unreadCount);
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
  setUnreadChatCount,
  markRead,
  markChatAsRead,
  setUnreadByChat 
} = notificationSlice.actions;

export default notificationSlice.reducer;
