import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAllPosts = () => {
  return axios.get(API_URL + "posts", { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + `user/${id}`, { headers: authHeader() });
}

const deleteUserAdmin = (id) => {
  return axios.delete(API_URL + `user/delete/${id}`, { headers: authHeader() });
}

const getAllUser = () => {
  return axios.get(API_URL + `user/`, { headers: authHeader() });
}

export default {
  getPublicContent,
  getUserBoard,
  getAllPosts,
  deleteUser,
  getAllUser,
  deleteUserAdmin,
};
