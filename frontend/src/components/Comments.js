import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/comments.service";


const Tutorial = props => {
  const initialTutorialState = {
     id: null,
     postId: "",
     userId: "",
     content: "",
     published: false
   }; 

   
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [posts, setPosts] = useState([]);


  //const [currentTutorial, setCurrentTutorial] = useState([]);

/*   const retrievePosts = () => {
    PostsDataService.getAll()
      .then(response => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrievePosts();
  }, []); */

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
        props.history.push("/home");
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
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePosts = () => {
    TutorialDataService.removeComment(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteAdmin = () => {
    TutorialDataService.deleteCommentAdmin(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };

/*   if (currentTutorial === undefined) {
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
  } */


  return (
    <div  className="container col-md-8">
      <div className="card">
        <img className="card-img-top" src="..." alt="..."></img>
        <div className="card-body">
              <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                value={currentTutorial.content}
                onChange={handleInputChange}
              />
        </div>
        <div className="card-footer d-flex justify-content-between">
        </div>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePosts}
          >
            Update
          </button>
          <button
            type="submit"
            className="badge badge-danger"
            onClick={deletePosts}
          >
            delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateAdmin}
          >
            update Admin
          </button>
          <button
            type="submit"
            className="badge badge-danger"
            onClick={deleteAdmin}
          >
            delete Admin
          </button>
        </div>
        <div className="d-flex justify-content-around m-2">
      </div>
    </div>
  );
};

export default Tutorial;
