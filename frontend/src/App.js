import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/FontawsomeIcons";
import "./App.css";

import AuthService from "./services/auth.service";

import Home from "./components/Home";
import HomeComments from "./components/HomeComments";
import Posts from "./components/Posts";
import AddPosts from "./components/AddPosts";
import Comments from "./components/Comments";
import AddComments from "./components/AddComments"
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

//import BoardModerator from "./components/BoardModerator";
//import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
        <img id="logoNavbar" src="/images/icon-left-font-monochrome-white.png" />
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Profil
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          
          <Route path="/posts/:id" component={Posts} />
          <Route exact path="/add" component={AddPosts} />
          <Route exact path="/comments/:id" component={Comments} />
          <Route exact path="/com/:id" component={HomeComments} />
          <Route exact path="/com/:id/new" component={AddComments} />
          <Route exact path="/user/delete/:id" component={Profile} />
          {/* <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} /> */}
        </Switch>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;