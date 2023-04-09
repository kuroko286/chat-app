import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const authUser = async (username) => {
  return await axios.post(`${BASE_URL}/auth`, { username: username });
};
