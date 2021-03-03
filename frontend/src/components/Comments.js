import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/comments.service";


const Tutorial = props => {
/*   const initialTutorialState = {
    id: null,
    postId: "",
    userId: "",
    content: "",
    published: false
  }; */
 // const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
 const [currentTutorial, setCurrentTutorial] = useState([]);

  const getComment =
    id => {
      TutorialDataService.getComment(id)
        .then(response => {
          setCurrentTutorial(response.data[0]);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

  useEffect(() => {
    getComment(props.match.params.id);
  }, [props.match.params.id]);




  if (currentTutorial === undefined) {
    return (
      <div className="container">
        <div className="text-center">
          <div className="col">
            <p>pas encore de commentaire</p>
            <p>a vous de jouez</p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{currentTutorial.content}</h5>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <small className="text-muted">@{currentTutorial.createdAt}</small>

        </div>
      </div>
    </div>
  );
};

export default Tutorial;
