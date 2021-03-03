import http from "../http-common";
import authHeader from "./auth-header";




const getAll = () => {
  return http.get("/posts", { headers: authHeader() });
};

const get = id => {
  return http.get(`/posts/${id}`, { headers: authHeader() });
};

const create = data => {
  return http.post("/posts/new", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/posts/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/posts/${id}`, { headers: authHeader() });
};

const updateAdmin = (id, data) => {
  return http.put(`/posts/update/${id}`, data, { headers: authHeader() });
};

const deleteAdmin = (id) => {
  return http.delete(`/posts/delete/${id}`, { headers: authHeader() });
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  updateAdmin,
  deleteAdmin,
};
