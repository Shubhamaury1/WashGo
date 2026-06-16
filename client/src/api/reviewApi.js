import API from "./axios"; 

const reviewApi = {
  createReview: (formData) =>
    API.post("/reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  updateReview: (id, formData) =>
    API.put(`/reviews/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getReviewByBooking: (bookingId) => API.get(`/reviews/booking/${bookingId}`),

  deleteReview: (id) => API.delete(`/reviews/${id}`),
};

export default reviewApi;
