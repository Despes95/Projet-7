import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import TutorialDataService from "../services/comments.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AuthService from "../services/auth.service";
import { Link, useParams } from "react-router-dom";
const PostId = AuthService.getPostId()
const currentUser = AuthService.getCurrentUser();


const Tutorial = props => {
  const { id } = useParams();
  console.log(id)

  const initialTutorialState = {
    id: null,
    postId: "",
    userId:"",
    content: "",
    published: false
  };


  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [curentPostId, SetCurentPostId]= useState();

  const getComment = postId => {
    TutorialDataService.getOneComment(postId)
      .then(response => {
        setCurrentTutorial(response.data);
        SetCurentPostId(response.data.postId);
        console.log(response.data.postId)
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
    postId: curentPostId,
    content: currentTutorial.content,
  };

  console.log(data)

  const updateAdmin = () => {
    TutorialDataService.updateCommentAdmin(currentTutorial.id, data)
      .then(response => {
        toast.success('le commentaire est modifié :)')
        setCurrentTutorial({ ...currentTutorial });
        console.log(response.data);
        props.history.push("/com/" + curentPostId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePosts = () => {
    TutorialDataService.updateComment(currentTutorial.id, data)
      .then(response => {
        toast.success('votre commentaire est modifié :)')
        setCurrentTutorial({ ...currentTutorial });
        props.history.push(`/com/` + curentPostId);
        console.log(response.data);
        //setMessage("Le commentaire à bien été modifié");
        //props.history.push(`/com/` + PostId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePosts = () => {
    TutorialDataService.removeComment(currentTutorial.id)
      .then(response => {
        toast.success('votre commentaire est suppimer :)')
        console.log(response.data);
        props.history.push(`/com/` + curentPostId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteAdmin = () => {
    TutorialDataService.deleteCommentAdmin(currentTutorial.id)
      .then(response => {
        toast.success('Le commentaire est suppimer :)')
        console.log(response.data);
        props.history.push(`/com/` + curentPostId);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div className="container col-md-8">
      <div >
        <Link to={`/com/` + curentPostId} >
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
            {currentUser.userId === currentTutorial.userId ? <FontAwesomeIcon icon="edit" /> : null}
          </div>
          <div id="link" onClick={deletePosts}>
            {currentUser.userId === currentTutorial.userId ? <FontAwesomeIcon icon="trash-alt" /> : null}
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
      </div>
    </div>
  );
};

export default Tutorial;
