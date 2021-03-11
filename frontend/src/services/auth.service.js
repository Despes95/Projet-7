import axios from "axios";
import { toast } from 'react-toastify';

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
      console.log(response.data)
      return response.data;
    });
};

const logout = () => {
  toast.success('A bientot')
  localStorage.removeItem("user");
  localStorage.removeItem("postId");

  
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
