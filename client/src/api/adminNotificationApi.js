import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const adminNotificationApi = {
  sendNotification: (data) =>
    axios.post(`${BASE_URL}/admin-notifications/send`, data),

  getCoupons: () => axios.get(`${BASE_URL}/admin-notifications/coupons`),

  toggleCoupon: (id) =>
    axios.put(`${BASE_URL}/admin-notifications/toggle/${id}`),

  deleteCoupon: (id) => axios.delete(`${BASE_URL}/admin-notifications/${id}`),
};

export default adminNotificationApi;
