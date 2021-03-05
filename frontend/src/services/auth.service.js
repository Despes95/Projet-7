import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";

const register = (pseudo, email, password) => {
  return axios.post(API_URL + "register", {
    pseudo,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getPostId = () => {
  return JSON.parse(localStorage.getItem("postId"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getPostId,
};
