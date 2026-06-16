import API from "./axios";

const bookingApi = {
  createBooking: (data) => API.post("/bookings", data),

  getBookings: () => API.get("/bookings"),

  getUserBookings: (userId) => API.get(`/bookings/user/${userId}`),

  updateBookingStatus: (id, status) =>
    API.patch(`/bookings/${id}/status`, { status }),

  getBookingById: (id) => API.get(`/bookings/${id}`),
};

export default bookingApi;
