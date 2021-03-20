import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import CommentDataService from "../services/comments.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AuthService from "../services/auth.service";
import { Link, useParams } from "react-router-dom";
const currentUser = AuthService.getCurrentUser();


const  Comment = props => {
  const { id } = useParams();
  console.log(id)

  const initialCommentState = {
    id: null,
    postId: "",
    userId:"",
    content: "",
    published: false
  };


  const [currentComment, setCurrentComment] = useState(initialCommentState);
  const [curentPostId, SetCurentPostId]= useState();

  const getComment = postId => {
    CommentDataService.getOneComment(postId)
      .then(response => {
        setCurrentComment(response.data);
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
    setCurrentComment({ ...currentComment, [name]: value });
  };

  var data = {
    postId: curentPostId,
    content: currentComment.content,
  };

  console.log(data)

  const updateAdmin = () => {
    CommentDataService.updateCommentAdmin(currentComment.id, data)
      .then(response => {
        toast.success('le commentaire est modifié :)')
        setCurrentComment({ ...currentComment });
        console.log(response.data);
        props.history.push("/com/" + curentPostId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePosts = () => {
    CommentDataService.updateComment(currentComment.id, data)
      .then(response => {
        toast.success('votre commentaire est modifié :)')
        setCurrentComment({ ...currentComment });
        props.history.push(`/com/` + curentPostId);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePosts = () => {
    CommentDataService.removeComment(currentComment.id)
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
    CommentDataService.deleteCommentAdmin(currentComment.id)
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
            value={currentComment.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="card-footer d-flex justify-content-around">
          <div id="link" onClick={updatePosts}>
            {currentUser.userId === currentComment.userId ? <FontAwesomeIcon icon="edit" /> : null}
          </div>
          <div id="link" onClick={deletePosts}>
            {currentUser.userId === currentComment.userId ? <FontAwesomeIcon icon="trash-alt" /> : null}
          </div>
        </div>
        {/*  eslint-disable-next-line */}
        {currentUser.userId == currentUser.isAdmin === true ? <button
          type="submit"
          className="badge badge-success"
          onClick={updateAdmin}
        >
          update Admin
          </button> : null}
          {/*  eslint-disable-next-line */}
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

export default Comment;
