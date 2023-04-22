import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const register = async (user) => {
  return await axios.post(`${BASE_URL}/api/auth/register`, user);
};

export const login = async (user) => {
  return await axios.post(`${BASE_URL}/api/auth/login`, user);
};
export const getUserById = async (id) => {
  return await axios.get(`${BASE_URL}/api/users/${id}`);
};

export const getUserIdByToken = async (token) => {
  return await axios.get(`${BASE_URL}/api/auth`, {
    headers: {
      token: token,
    },
  });
};
export const getAllUser = async () => {
  return await axios.get(`${BASE_URL}/api/users`);
};

export const addFriend = async (fromId, toId) => {
  return await axios.put(`${BASE_URL}/api/users/${fromId}/${toId}`);
};
export const getAllFriend = async (id) => {
  return await axios.get(`${BASE_URL}/api/users/${id}/friends`);
};
export const getAllMessage = async (fromId, toId) => {
  return await axios.get(`${BASE_URL}/api/messages/${fromId}/${toId}`);
};
export const sendMessage = async (fromId, toId, mess) => {
  return await axios.post(`${BASE_URL}/api/messages/${fromId}/${toId}`, {
    text: mess,
  });
};
