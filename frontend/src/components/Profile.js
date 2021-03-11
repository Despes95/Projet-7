import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";


const Profile = (props) => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser)

  const deleteUser = () => {
    UserService.deleteUser(currentUser.userId)
      .then(response => {
        toast.success('Votre compte est supprimeé :)')
        console.log(response.data);
        AuthService.logout();
        //props.history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const deleteUserAdmin = () => {
    UserService.deleteUserAdmin()
      .then(response => {
        toast.success('le compte est supprimeé :)')
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getAllUser = () => {
    UserService.getAllUser()
      .then(response => {
        console.log(response.data[0].id);
        setUsers(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  };



  
  

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.pseudo}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.userId}
      </p>
      <div id="link" onClick={deleteUser}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
    </div>
  );




};

export default Profile;
