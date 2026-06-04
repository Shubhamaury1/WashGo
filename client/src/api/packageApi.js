import API from "./axios";

const packageApi = {
  getPackages: () => API.get("/packages"),

  createPackage: (data) => API.post("/packages", data),

  updatePackage: (id, data) => API.put(`/packages/${id}`, data),

  toggleStatus: (id) => API.patch(`/packages/${id}/status`),
};

export default packageApi;
