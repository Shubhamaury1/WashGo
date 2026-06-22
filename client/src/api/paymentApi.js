// import axios from "./axios";

// const paymentApi = {
//   // Create Razorpay Order
//   createOrder: async (data) => {
//     const response = await axios.post("/payment/create-order", data);
//     return response.data;
//   },

//   // Verify Razorpay Payment
//   verifyPayment: async (data) => {
//     const response = await axios.post("/payment/verify", data);
//     return response.data;
//   },

//   // Optional: Get Payment Details
//   getPayment: async (paymentId) => {
//     const response = await axios.get(`/payment/${paymentId}`);
//     return response.data;
//   },
// };

// export default paymentApi;

// import axios from "./axios";

// const paymentApi = {
//   createOrder: (data) => axios.post("/payments/create-order", data),

//   verifyPayment: (data) => axios.post("/payments/verify", data),

//   getPayment: (id) => axios.get(`/payments/${id}`),
// };

// export default paymentApi;



import axios from "./axios";

const paymentApi = {
  createOrder: async (data) => {
    const response = await axios.post("/payments/create-order", data);
    return response.data; // <-- important
  },

  verifyPayment: async (data) => {
    const response = await axios.post("/payments/verify", data);
    return response.data;
  },
};

export default paymentApi;