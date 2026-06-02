import API from "./axios";

const addressApi = {
  getAddresses: () => API.get("/addresses"),

  createAddress: (data) => API.post("/addresses", data),
};

export default addressApi;
