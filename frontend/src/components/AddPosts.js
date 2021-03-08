import React, { useState, useEffect } from "react";
import PostDataService from "../services/posts.service";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
const currentUser = AuthService.getCurrentUser();



const AddPost = () => {

  const initialPostState = {

    id: null,
    title: "",
    content: "",
    picture: "",
    userId: currentUser.userId,
    published: false
  };
  const [post, setPost] = useState(initialPostState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleInputChangePicture = event => {
    setPost({ ...post, picture: event.target.files[0] });
  };

  const savePost = () => {
    var data = {
      title: post.title,
      content: post.content,
      userId: post.userId,
    };

    let formData = new FormData()
    formData.append('data', JSON.stringify(data))
    formData.append('image', post.picture)

    PostDataService.create(formData)
      .then(response => {
        setPost({
          ...response.body

        });
        setSubmitted(true);
        console.log(response);

      })
      .catch(e => {
        console.log(e);
      });
  };






  const newPost = () => {
    setPost(initialPostState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPost}>
            Add
          </button>
          <button className="btn btn-success"><Link to={"/home"} className="nav-link">
            Home
            </Link></button>
        </div>


      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={post.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">content</label>
            <input
              type="text"
              className="form-control"
              id="content"
              required
              value={post.content}
              onChange={handleInputChange}
              name="content"
            />
          </div>
          <input type="file" onChange={handleInputChangePicture}
            id="picture"
            name="picture"
            accept="images/*" multiple />
          {/* <div className="form-group">
              <label htmlFor="content">Picture</label>
              <input
                type="text"
                className="form-control"
                id="picture"
                required
                value={post.picture}
                onChange={handleInputChange}
                name="picture"
              />
            </div> */}

          <button onClick={savePost} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPost;