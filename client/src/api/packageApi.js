import API from "./axios";

const packageApi = {
  getPackages: () => API.get("/packages"),
};

export default packageApi;
