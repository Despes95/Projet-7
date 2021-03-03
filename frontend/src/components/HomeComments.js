import React, { useState, useEffect } from "react";
import CommentsDataService from "../services/posts.service";

import "../App.css"
const CommentsList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    retrieveComments();
  }, []);



  const retrieveComments = () => {
    CommentsDataService.getAll()
      .then(response => {
        setComments(response.data[0]);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  if (setComments === 0) {
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
      
      {
        comments.map((comment) => (
          

            <div key={comment.id} className="card-deck ">

              <div className="card">
                <div key className="card-body">

                  <h5 className="card-title">{comment.title}</h5>
                  <p className="card-text">{comment.content}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <small className="text-muted">@{comment.user.pseudo}</small>
                  <small className="text-muted"> {comment.updatedAt}</small>
                </div>
                <div className="d-flex justify-content-around m-2">
                </div>
              </div>
            </div>
        ))}
    </div>



  );
};

export default CommentsList;

