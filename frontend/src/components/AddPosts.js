import React, { useState, useRef } from "react";
import { toast } from 'react-toastify';
import PostDataService from "../services/posts.service";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const currentUser = AuthService.getCurrentUser();

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}

const AddPost = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const initialPostState = {

    id: null,
    title: "",
    content: "",
    picture: "",
    userId: currentUser.userId,
    published: false
  };

  const [post, setPost] = useState(initialPostState);
  const [message, setMessage] = useState("");


  const handleChangeTitle = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  };


  const handleInputChangePicture = event => {
    setPost({ ...post, picture: event.target.files[0] });
  };

  const savePost = (e) => {
    e.preventDefault();
    setMessage("")

    var data = {
      title: post.title,
      content: post.content,
      userId: post.userId,
    };

    let formData = new FormData()
    formData.append('data', JSON.stringify(data))
    formData.append('image', post.picture)

    form.current.validateAll();



    if (checkBtn.current.context._errors.length === 0) {
      toast.success('Votre publication est en ligne :)')
      PostDataService.create(formData, data).then(
        () => {
          props.history.push("/home");
        },
        (response) => {
          setPost({ ...response.body })

        }, (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
    };
  }


  return (
    <div className="submit-form">
        <Form onSubmit={savePost} ref={form}>
          <div text='name'>
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              className="form-control"
              name="title"
              value={post.title}
              onChange={handleChangeTitle}
              validations={[required]}
            />
          </div>

          <div text='name'>
            <label htmlFor="content">content</label>
            <Input
              type="text"
              className="form-control"
              name="content"
              value={post.content}
              onChange={handleChangeTitle}
              validations={[required]}
            />
          </div>
          <input type="file" onChange={handleInputChangePicture}
            id="picture"
            name="picture"
            accept="images/*" multiple />
          <button onClick={savePost} className="btn btn-success">
            Submit
          </button>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
    </div>
  );
};

export default AddPost;