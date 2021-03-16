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
    <div className="container text-center">
      <header className="jumbotron">
        <h3>
          <strong>Bienvenue {currentUser.pseudo}</strong>
        </h3>
      </header>
      <p>
        Veuillez restez courtois, pas de contenue deplacée ou autre au sein de groupomania.
      </p>
      <p>
        <strong>Vous etes le numero:</strong> {currentUser.userId}
      </p>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
      <p>
        <strong>Supprimer définitivement mon compte Goupomania ?</strong>
      </p>

      <p> Vos photos, vos publications et vos commentaire seront supprimées.</p>
      <p>Vous ne pourrez pas réactiver votre compte.</p>
      <p>Supression du compte</p>
      <div id="link" onClick={deleteUser}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>

    </div>
  );




};

export default Profile;
