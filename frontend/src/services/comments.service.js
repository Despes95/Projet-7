import http from "../http-common";
import authHeader from "./auth-header";




const getAllComment = () => {
  return http.get("/comments/one", { headers: authHeader() });
};

const getComment = id => {
  return http.get(`/comments/all/${id}`, { headers: authHeader() });
};

const createComment = data => {
  return http.post(`comments//new`, data, { headers: authHeader() });
};

const updateComment = (id, data) => {
  return http.put(`/${id}`, data, { headers: authHeader() });
};

const removeComment = id => {
  return http.delete(`/${id}`, { headers: authHeader() });
};



export default {
  getAllComment,
  getComment,
  createComment,
  updateComment,
  removeComment,
};
