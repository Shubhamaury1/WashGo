import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const notificationApi = {
  getNotifications: (userId) =>
    axios.get(`${BASE_URL}/notifications/${userId}`),

  getUnreadCount: (userId) =>
    axios.get(`${BASE_URL}/notifications/count/${userId}`),

  markRead: (notificationId) =>
    axios.put(`${BASE_URL}/notifications/read/${notificationId}`),

  deleteNotification: (notificationId) =>
    axios.delete(`${BASE_URL}/notifications/${notificationId}`),

  clearChatNotifications: (userId, chatId) =>
    axios.delete(`${BASE_URL}/notifications/${userId}/${chatId}`),
};

export default notificationApi;
