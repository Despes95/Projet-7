import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/comments.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
const PostId = AuthService.getPostId()
const currentUser = AuthService.getCurrentUser();


const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    postId: "",
    userId: "",
    content: "",
    published: false
  };


  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");


  const getComment = postId => {
    TutorialDataService.getOneComment(postId)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  useEffect(() => {
    getComment(props.match.params.id);
  }, [props.match.params.id]);



  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  var data = {
    //id: currentTutorial.id,
    postId: currentTutorial.postId,
    content: currentTutorial.content,
  };

  const updateAdmin = () => {
    TutorialDataService.updateCommentAdmin(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial });
        console.log(response.data);
        props.history.push("/com/" + PostId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePosts = () => {
    TutorialDataService.updateComment(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial });
        console.log(response.data);
        setMessage("Le commentaire à bien été modifié");
        //props.history.push(`/com/` + PostId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePosts = () => {
    TutorialDataService.removeComment(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push(`/com/` + PostId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteAdmin = () => {
    TutorialDataService.deleteCommentAdmin(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push(`/com/` + PostId);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div className="container col-md-8">
      <div >
        <Link to={`/com/` + PostId} >
          <FontAwesomeIcon icon="arrow-left" />
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            id="content"
            name="content"
            value={currentTutorial.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="card-footer d-flex justify-content-around">
          <div id="link" onClick={updatePosts}>
          {currentUser.userId  === currentTutorial.userId ?  <FontAwesomeIcon icon="edit" /> : null}
          </div>
          <div id="link" onClick={deletePosts}>
            {currentUser.userId  === currentTutorial.userId ?  <FontAwesomeIcon icon="trash-alt" /> : null}
          </div>
        </div>
        {currentUser.userId == currentUser.isAdmin === true ? <button
          type="submit"
          className="badge badge-success"
          onClick={updateAdmin}
        >
          update Admin
          </button> : null}
          {currentUser.userId == currentUser.isAdmin === true ? <button
          type="submit"
          className="badge badge-danger"
          onClick={deleteAdmin}
        >
          delete Admin
          </button> : null}
          <p className="text-center">{message}</p>
      </div>
    </div>
  );
};

export default Tutorial;
