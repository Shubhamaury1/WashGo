import API from "./axios";

const vehicleApi = {
  getVehicles: () => API.get("/vehicles"),
};

export default vehicleApi;
