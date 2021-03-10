import React, { useState, useRef } from "react";
import TutorialDataService from "../services/comments.service";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";



const currentUser = AuthService.getCurrentUser();
const PostId = AuthService.getPostId();


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}



const AddTutorial = () => {
  const form = useRef();
  const checkBtn = useRef();

  const initialTutorialState = {

    id: null,
    content: "",
    postId: PostId,
    userId: currentUser.userId,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");


  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };
  

  const saveTutorial = (e) => {
    e.preventDefault();
    //Prevent message clear them out
    setMessage("")

    var data = {
      content: tutorial.content,
      userId: tutorial.userId,
      postId: tutorial.postId,

    };

    form.current.validateAll();

    console.log(data)
    if (checkBtn.current.context._errors.length === 0) {
      setSubmitted(true)
      TutorialDataService.createComment(data).then(
        (response) => {setTutorial({...response.body})

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

    
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };



  return (
    <div className="container col-md-8">

      {submitted ? (
        <div >
          <div className="text-center">
            <h4>Votre commentaire est en ligne</h4>
          </div>
          <div className="d-flex justify-content-between">
            <Link to={`/com/` + PostId} >
              <FontAwesomeIcon icon="arrow-left" />
            </Link>
            <div id="link" onClick={newTutorial}>
              <FontAwesomeIcon icon="plus-circle" />
            </div>
          </div>
        </div>

      ) : (
        <Form onSubmit={saveTutorial} ref={form}>
          <div >
            <Link to={`/com/` + PostId} >
              <FontAwesomeIcon icon="arrow-left" />
            </Link>
          </div>
            <div className="form-group">
              <label htmlFor="content">content</label>
              <Input
                type="text"
                className="form-control"
                name="content"
                value={tutorial.content}
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <button
              type="submit"
              className="badge badge-success"
              onClick={saveTutorial}
            >
              Create
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
      )}
    </div>
  );
};

export default AddTutorial;
