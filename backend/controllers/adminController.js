///////////////////////////Partie Admin/////////////////
const db = require('../config/dbSql');
const User = db.user;
const Post = db.post;
const Comment = db.comment;

///////////////////////////Users/////////////////

//Suppression du profil d'un User
exports.deleteUser = (req, res, next) => {
  if (req.isAdmin === true) {
    User.findOne({ where: { id: req.params.id } })
      .then(() => {
        User.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Le profil a bien été supprimé !" }))
      })
  } else {
    throw "La supression du profil n'est possible que par son auteur ou un admin.";
  }
};

//Modification du profil d'un User
exports.updateUser = (req, res, next) => {
  console.log(req.userId)
  console.log(req.isAdmin)
  if (req.isAdmin === true) {
    User.findOne({ where: { id: req.params.id } }) //id: req.userId
      .then((user) => {
        user.update({
          where: {
            id: req.params.id,
          },
          ...req.body
        })
          .then(() => res.status(200).json({ message: 'Le profil a bien été modifiée !' }))
          .catch(error => console.log(error) || res.status(400).json({ error: "Une erreur est survenue dans la modification du profil" }));
      });
  } else {
    throw "La modification du profil n'est possible que par son auteur ou un admin.";
  }
}

///////////////////////////Posts/////////////////

// Modifier une Publication
exports.updatePost = (req, res, next) => {
  console.log(req.userId);
  console.log(req.params.id);
  console.log(req.isAdmin);
  if (req.isAdmin === true) {
    Post.findOne({
      where: {
        id: req.params.id,
        //userId: req.userId
      }
    }) //id: req.params.id
      .then((post) => {
        post.update({
          where: {

            //userId: req.userId,
            id: req.userId //req.userId
          },
          ...req.body
        })
          .then(() => res.status(200).json({ message: 'La publication a bien été modifiée !' }))
          .catch(error => console.log(error) || res.status(400).json({ error: "Une erreur est survenue dans la modification de la publication" }));
      });
  } else {
    throw "La modification de la publication n'est possible que par son auteur ou un admin.";
  }
}

// Supprimer une publication
exports.deletePost = (req, res, next) => {
  if (req.isAdmin === true) {
    Post.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((post) => {
        post.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(() => res.status(200).json({ message: 'Le profil a bien été modifiée !' }))
          .catch(error => console.log(error) || res.status(400).json({ error: "Une erreur est survenue dans la supression de la publication" }));
      });
  } else {
    throw "La supression de la publication n'est possible que par son auteur ou un admin.";
  }
}

///////////////////////////Comments/////////////////

//Modifier un commentaire
exports.updateComment = (req, res, next) => {
  console.log(req.isAdmin);
  console.log(req.userId);
  if (req.isAdmin === true) {
    Comment.findOne({
      where: {
        id: req.params.id,
      }
    })
      .then((comment) => {
        comment.update({
          where: {
            id: req.params.id,
          },
          ...req.body
        })
          .then(() => {
            res.status(201).json({ message: 'post modifié' })
          })
          .catch(error => res.status(404).json({ error }));
      })
      .catch(error => res.status(404).json({ error }));
  } else {
    throw "La modification du commentaire n'est possible que par son auteur ou un admin.";
  }
}

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  if (req.isAdmin === true) {
    Comment.findOne({
      where: {
        id: req.params.id,
      }
    })
      .then((comment) => {
        comment.destroy({
          where: {
            id: req.params.id,
          }
        })
          .then(() => {
            res.status(201).json({ message: 'post modifié' })
          })
          .catch(error => res.status(404).json({ error }));
      })
      .catch(error => res.status(404).json({ error }));
  } else {
    throw "La supression du commentaire n'est possible que par son auteur ou un admin.";
  }
}

