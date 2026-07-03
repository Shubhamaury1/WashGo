import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const notificationApi = {
  getNotifications: (userId) =>
    axios.get(`${BASE_URL}/notifications/${userId}`),

  getUnreadCount: (userId) =>
    axios.get(`${BASE_URL}/notifications/count/${userId}`),

  createNotification: (data) =>
    axios.post(`${BASE_URL}/notifications/create`, data),

  markRead: (notificationId) =>
    axios.put(`${BASE_URL}/notifications/read/${notificationId}`),

  markAllRead: (userId) =>
    axios.put(`${BASE_URL}/notifications/read-all/${userId}`),

  markOfferNotificationsAsRead: (userId) =>
    axios.put(`${BASE_URL}/notifications/offer/read/${userId}`),

  markChatAsRead: (userId, chatId) =>
    axios.put(`${BASE_URL}/notifications/chat/read`, { userId, chatId }),

  deleteNotification: (notificationId) =>
    axios.delete(`${BASE_URL}/notifications/${notificationId}`),

  clearChatNotifications: (userId, chatId) =>
    axios.delete(`${BASE_URL}/notifications/${userId}/${chatId}`),
};

export default notificationApi;
