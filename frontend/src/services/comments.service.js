import http from "../http-common";
import authHeader from "./auth-header";





const getOneComment =id => {
  console.log("commentaire " + id)
  return http.get(`/comments/one/${id}`, { headers: authHeader() });
};

const getComment = id => {
  console.log("id du post " +id)
  localStorage.setItem("postId", JSON.stringify(id));
  console.log(localStorage)
  //window.location.reload();
  return http.get(`/comments/all/${id}`, { headers: authHeader() });
};

const createComment = data => {
  return http.post(`comments/new`, data, { headers: authHeader() });
};

const updateComment = (id, data) => {
  return http.put(`/comments/${id}`, data, { headers: authHeader() });
};

const removeComment = id => {
  return http.delete(`/comments/${id}`, { headers: authHeader() });
};

const updateCommentAdmin = (id, data) => {
  return http.put(`/comments/update/${id}`, data, { headers: authHeader() });
};

const deleteCommentAdmin = (id) => {
  return http.delete(`/comments/delete/${id}`, { headers: authHeader() });
};




export default {
  getOneComment,
  getComment,
  createComment,
  updateComment,
  removeComment,
  updateCommentAdmin,
  deleteCommentAdmin,

};
