import API from "./axios";

const bookingApi = {
  createBooking: (data) => API.post("/bookings", data),

  getBookings: () => API.get("/bookings"),
  
  getUserBookings: (userId) => API.get(`/bookings/user/${userId}`),
};

export default bookingApi;
