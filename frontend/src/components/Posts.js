import React, { useState, useEffect } from "react";
import PostsDataService from "../services/posts.service";

const Posts = props => {
  const initialPostsState = {
    id: null,
    title: "",
    content: "",
    published: false
  };
  const [currentPosts, setCurrentPosts] = useState(initialPostsState);
  const [message, setMessage] = useState("");

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
        setCurrentPosts({ ...currentPosts });
        console.log(response.data);
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };
  /*   const updateAdmin = () => {
      PostsDataService.updateAdmin(currentPosts,)
        .then(response => {
          console.log(response.data);
          setMessage("The Posts was updated successfully!");
          props.history.push("/home");
        })
        .catch(e => {
          console.log(e);
        });
    }; */


  const updatePosts = () => {
    PostsDataService.update(currentPosts.id, currentPosts)
      .then(response => {
        console.log(response.data);
        setMessage("The Posts was updated successfully!");
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };



  const deletePosts = () => {
    PostsDataService.remove(currentPosts.id)
      .then(response => {
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
        console.log(response.data);
        props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
      {currentPosts ? (
        <div className="edit-form">
          <h4>Posts</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPosts.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">content</label>
              <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                value={currentPosts.content}
                onChange={handleInputChange}
              />
            </div>

            {/*      <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPosts.published ? "Published" : "Pending"}
            </div> */}
          </form>

          {/*      {currentPosts.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Admin
            </button>
          )} */}

          <button className="badge badge-danger mr-2" onClick={updateAdmin}>
            update Admin
          </button>

          <button className="badge badge-danger mr-2" onClick={deleteAdmin}>
            delete Admin
          </button>

          <button className="badge badge-success mr-2" onClick={deletePosts}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePosts}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
          <div>
            <br />
            <p>Please click on a Posts...</p>
          </div>
        )}
    </div>
  );
};

export default Posts;
