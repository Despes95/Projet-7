import React, { useState, useEffect } from "react";
import CommentsDataService from "../services/comments.service";
import { Link } from "react-router-dom";


import "../App.css"
const CommentsList = props => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    retrieveComments(props.match.params.id);
  }, [props.match.params.id]);



  const retrieveComments =
    id => {
      CommentsDataService.getComment(id)
        .then(response => {
          localStorage.setItem("postId", JSON.stringify(response.data[0].postId));
          setComments(response.data);
          console.log(response.data);
          console.log(response.data[0].user);
        })
        .catch(e => {
          console.log(e);
          console.log("ca marche pas");

        });
    };

   if (comments.length === 0) {
    return (
      <div className="container">
        
        <div className="text-center">
          <div className="col">
            <p>Pas encore de commenataire</p>
            <p>Allez va y lache toi ? </p>
            <Link
          to={"/new" } 
          className="badge badge-success"
        >
          New Comment<br />
        </Link>
          </div>
        </div>
      </div>
    )
  } 

  return (

    <div className="container col-md-8">
{/*       <div id="vertical" className="sticky-top">
      <Link
          to={"/com/add/" } id="vertical"
          className="badge badge-success"
        >
          New Comment<br />
        </Link>
      </div> */}
      {
        comments.map((comment) => (
          
          <div key={comment.id} className="card">
    
            <img className="card-img-top" src="..." alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">{comment.content}</h5>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted">{comment.userId}</small>
              <small className="text-muted">{comment.createdAt}</small>
            </div>
            <div className="d-flex justify-content-around m-2">
            
              <Link
                to={`/comments/` + comment.id}
                className="badge badge-primary"
              >
                modify
            </Link>
            </div>

          </div>
        ))}

    </div>



  );
};

export default CommentsList;

