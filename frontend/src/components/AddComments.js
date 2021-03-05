import React, { useState } from "react";
import TutorialDataService from "../services/comments.service";
import AuthService from "../services/auth.service";
const currentUser = AuthService.getCurrentUser();
const PostId = AuthService.getPostId();



const AddTutorial = () => {
  const initialTutorialState = {
    
    id: null,
    content: "",
    postId: PostId,
    userId: currentUser.userId,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      content: tutorial.content,
      userId: tutorial.userId,
      postId: tutorial.postId,
      
    };

    console.log(tutorial)

    TutorialDataService.createComment(data)
      .then(response => {
        console.log(response)
        setTutorial({
          ...response.body
        });
        setSubmitted(true);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
          <div>
            <div className="form-group">
              <label htmlFor="content">content</label>
              <input
                type="text"
                className="form-control"
                id="content"
                required
                value={tutorial.content}
                onChange={handleInputChange}
                name="content"
              />
            </div>
            <button
            type="submit"
            className="badge badge-success"
            onClick={saveTutorial}
          >
            Create
          </button>
          </div>
        )}
    </div>
  );
};

export default AddTutorial;
