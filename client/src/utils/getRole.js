import { jwtDecode } from "jwt-decode";

export const getRole = (token) => {
  if (!token) return null;

  try {
    return jwtDecode(token).role;
  } catch (error) {
    return null;
  }
};
