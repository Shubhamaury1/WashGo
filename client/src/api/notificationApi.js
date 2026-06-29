import axios from "axios";

const BASE_URL = "http://localhost:5000/api/notifications";

const notificationApi = {
  getNotifications: (userId) => axios.get(`${BASE_URL}/${userId}`),

  getUnreadCount: (userId) => axios.get(`${BASE_URL}/count/${userId}`),

  markRead: (notificationId) => axios.put(`${BASE_URL}/read/${notificationId}`),

  deleteNotification: (notificationId) =>
    axios.delete(`${BASE_URL}/${notificationId}`),

  clearChatNotifications: (userId, chatId) =>
    axios.delete(`${BASE_URL}/${userId}/${chatId}`),
};

export default notificationApi;
