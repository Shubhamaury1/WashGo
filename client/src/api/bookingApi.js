import API from "./axios";

const bookingApi = {
  createBooking: (data) => API.post("/bookings", data), 

  getBookings: () => API.get("/bookings"),
};

export default bookingApi;
