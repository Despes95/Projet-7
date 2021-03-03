import React, { useState } from "react";
import TutorialDataService from "../services/comments.service";

const AddTutorial = () => {
  const initialTutorialState = {
    
    id: null,
    title: "",
    content: "",
    userId: "",
    published: false
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
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          content: response.data.content,
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
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={tutorial.title}
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
                value={tutorial.content}
                onChange={handleInputChange}
                name="content"
              />
            </div>

            <button onClick={saveTutorial} className="btn btn-success">
              Submit
          </button>
          </div>
        )}
    </div>
  );
};

export default AddTutorial;
