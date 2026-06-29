import axios from "axios";

const BASE_URL = "http://localhost:5000/api/chat";

const chatApi = {
  createChat: (data) => axios.post(`${BASE_URL}/create`, data),

  getChats: (userId) => axios.get(`${BASE_URL}/user/${userId}`),

  getMessages: (chatId) => axios.get(`${BASE_URL}/${chatId}`),

  sendMessage: (data) => axios.post(`${BASE_URL}/send`, data),

  markSeen: (messageId) => axios.put(`${BASE_URL}/seen/${messageId}`),
};

export default chatApi;
