import React, { useState, useEffect } from "react";
import CommentsDataService from "../services/comments.service";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../App.css"
import AuthService from "../services/auth.service";
const currentUser = AuthService.getCurrentUser();



const CommentsList = props => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    retrieveComments(props.match.params.id);
  }, [props.match.params.id]);



  const retrieveComments =
    id => {
      CommentsDataService.getComment(id).then(
        (response) => {
          setComments(response.data);
          console.log(response.data)
        }
      ).catch(e => {
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
            <div className="d-flex justify-content-around">
              <Link to={`/home`} >
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to={`/com/${id}/new`}>
                <FontAwesomeIcon icon="plus-circle" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // console.log(currentUser.userId === comments[0].userId)
  // console.log(currentUser.isAdmin)
  // console.log(comments[0].userId)
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
              <small className="text-muted"><FontAwesomeIcon icon="user" /> {comment.user.pseudo}</small>
              <small className="text-muted">{comment.createdAt}</small>
            </div>
            <div className="d-flex justify-content-around m-2">
              <Link /* if={user === user.id} */ to={`/comments/` + comment.id} >
                {currentUser.userId === comment.userId || currentUser.isAdmin === true ? <FontAwesomeIcon icon="cog" /> : null}

              </Link>
              <Link to={`/com/${id}/new`} >
                <FontAwesomeIcon icon="plus-circle" />
              </Link>

            </div>

          </div>
        ))}

    </div>



  );
};

export default CommentsList;

