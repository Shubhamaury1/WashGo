import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const chatApi = {
  createChat: (data) => axios.post(`${BASE_URL}/chat/create`, data),

  getChats: (userId) => axios.get(`${BASE_URL}/chat/user/${userId}`),

  getMessages: (chatId) => axios.get(`${BASE_URL}/chat/${chatId}`),

  sendMessage: (data) => axios.post(`${BASE_URL}/chat/send`, data),

  markSeen: (messageId) => axios.put(`${BASE_URL}/chat/seen/${messageId}`),
};

export default chatApi;
