import React, { useState, useEffect } from "react";
import CommentsDataService from "../services/comments.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../App.css"





const CommentsList = props => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);



  useEffect(() => {
    retrieveComments(props.match.params.id);
  }, [props.match.params.id]);



  const retrieveComments =
    id => {
      CommentsDataService.getComment(id)
        .then(response => {
          
          setComments(response.data);
          setUser(response.data[0].user.pseudo);
          //window.location.reload();
        })
        .catch(e => {
          console.log(e);
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
              to={ /* comment.id + */ "/new"}
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
      <div >
      <Link to={`/home/`} >
      <FontAwesomeIcon icon="arrow-left" />
      </Link>
      </div>
      
      {
        comments.map((comment) => (

          <div key={comment.id} className="card">

            <div className="card-body">
              <h5 className="card-title">{comment.content}</h5>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted"><FontAwesomeIcon icon="user" /> {user}</small>
              <small className="text-muted">{comment.createdAt}</small>
            </div>
            <div className="d-flex justify-content-around m-2">
              <Link to={`/comments/` + comment.id} >
                <FontAwesomeIcon icon="cog" />
              </Link>
              <Link to={"/new"} >
            <FontAwesomeIcon icon="plus-circle" /> 
            </Link>

            </div>

          </div>
        ))}

    </div>



  );
};

export default CommentsList;

