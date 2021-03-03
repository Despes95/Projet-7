import React, { useState, useEffect } from "react";
import PostsDataService from "../services/posts.service";
import { Link } from "react-router-dom";

import "../App.css"
const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    retrievePosts();
  }, []);



  const retrievePosts = () => {
    PostsDataService.getAll()
      .then(response => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  if (localStorage.length === 0) {
    return (
      <div className="container">
        <div className="text-center">
          <div className="col">
            <p>Groupomania</p>
            <p>veuillez vous connecter ou vous enregistrez</p>
          </div>
        </div>
      </div>
    )
  }

  return (

    <div className="container col-md-8">
      <div id="vertical" className="sticky-top">
        <Link
          to={"/add"} id="vertical"
          className="badge badge-success"
        >
          New Post<br />
        </Link>
      </div>
      {
        posts.map((post) => (


          <div key={post.id} className="card-deck ">
            
            <div className="card">
            <img className="card-img-top" src="..." alt="..."></img>
              <div key className="card-body">
              
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <small className="text-muted">@{post.user.pseudo}</small>
                <small className="text-muted"> {post.updatedAt}</small>
              </div>
              <div className="d-flex justify-content-around m-2">

                <Link
                  to={"/posts/" + post.id}
                  className="badge badge-primary"
                >
                  modify
                  </Link>
              </div>
              <Link
                to={"/com/" + post.id}
                className="badge badge-danger"
              >
                Commentez
                </Link>
            </div>
          </div>
        ))}
    </div>



  );
};

export default PostsList;

