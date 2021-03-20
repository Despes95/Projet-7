import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import PostsDataService from "../services/posts.service";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom";

const currentUser = AuthService.getCurrentUser();
console.log(currentUser)

const Posts = props => {
  const initialPostsState = {
    id: null,
    title: "",
    content: "",
    published: false
  };
  const [currentPosts, setCurrentPosts] = useState(initialPostsState);

  const getPosts = id => {
    PostsDataService.get(id)
      .then(response => {
        setCurrentPosts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPosts(props.match.params.id);
  }, [props.match.params.id]);



  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPosts({ ...currentPosts, [name]: value });
  };


  var data = {
    id: currentPosts.id,
    title: currentPosts.title,
    content: currentPosts.content,
  };
  const updateAdmin = () => {
    PostsDataService.updateAdmin(currentPosts.id, data)
      .then(response => {
        toast.success('la publication est modifié :)')
        setCurrentPosts({ ...currentPosts });
        console.log(response.data);
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePosts = () => {
    PostsDataService.update(currentPosts.id, currentPosts)
      .then(response => {
        toast.success('Votre publication est modifié :)')
        console.log(response.data);
        //setMessage("La publication à bien été modifiée");
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };



  const deletePosts = () => {
    PostsDataService.remove(currentPosts.id)
      .then(response => {
        toast.success('Votre publication est supprimeé :)')
        console.log(response.data);
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };


  const deleteAdmin = () => {
    PostsDataService.deleteAdmin(currentPosts.id)
      .then(response => {
        toast.success('La publication est supprimeé :)')
        console.log(response.data);
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
        <div className="card-group ">
          <div >
            <Link to={`/home/`} >
              <FontAwesomeIcon icon="arrow-left" />
            </Link>
          </div>
          <div className="card">
            <h5 className="card-title">Title</h5>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={currentPosts.title}
              onChange={handleInputChange}
            />
            <h5 className="card-text">Content</h5>
            <input
              type="text"
              className="form-control"
              id="content"
              name="content"
              value={currentPosts.content}
              onChange={handleInputChange}
            />
            <div className="card-footer d-flex justify-content-around">
              <div id="link" onClick={updatePosts}>
              {currentUser.userId  === currentPosts.userId ?  <FontAwesomeIcon icon="edit" />: null}
              </div>
              <div id="link" onClick={deletePosts}>
              {currentUser.userId  === currentPosts.userId ?  <FontAwesomeIcon icon="trash-alt" />: null}
              </div>
            </div>
            {/*  eslint-disable-next-line */}
            {currentUser.userId == currentUser.isAdmin == true ? <button className="badge badge-danger mr-2" onClick={updateAdmin}>
              update Admin
          </button> : null}
          {/*  eslint-disable-next-line */}
            {currentUser.userId == currentUser.isAdmin === true ? <button className="badge badge-danger mr-2" onClick={deleteAdmin}>
              delete Admin
          </button> : null}
          </div>
        </div>
    </div>
  );
};

export default Posts;
