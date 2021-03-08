import React, { useState, useEffect } from "react";
import PostsDataService from "../services/posts.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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

  if (localStorage.getItem("user") === null) {
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

    <div className="container col-md-7">

      {
        posts.map((post) => (

          <div key={post.id} className="card-group ">
            <div>
            </div>
            <div className="card">
              <h5 className="card-title">{post.title}</h5>
              <img id="picture" className="card-img-top" src={post.picture} alt=""></img>
              <div key className="card-body">


                <p className="card-text">{post.content}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <small className="text-muted"><FontAwesomeIcon icon="user" /> {post.user.pseudo}</small>
                <small className="text-muted"> {post.updatedAt}</small>
              </div>
              <div className="d-flex justify-content-around m-2">
                <Link to={"/com/" + post.id} >
                  <FontAwesomeIcon icon="comments" />
                </Link>
                <Link to={"/posts/" + post.id} >
                  <FontAwesomeIcon icon="cog" />
                </Link>
                <Link to={"/add"} id="new"  >
            <FontAwesomeIcon icon="plus-circle" /> 
            </Link>
              </div>
            </div>
          </div>
        ))}
    </div>



  );
};

export default PostsList;

