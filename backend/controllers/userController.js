const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const xss = require('xss');


const db = require('../config/dbSql');
console.log(Object.keys(db));
const User = db.user;

// Creation d'un new user
exports.signup = (req, res, next) => {
  bcrypt.hash((req.body.password), 10)
    .then(hash => {
      User.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        //poste: req.body.poste,
      })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la création d'un nouveau compte utilisateur" }));
    })
    .catch(error => res.status(500).json({ error }));
};


// Connexion d'un User 
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: xss(req.body.email) }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ errors: 'Email incorrect' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(200).json({ errors: 'Le mot de passe est incorrect !' });
          }
          //res.cookie('jwt', token, { httpOnly: true, maxAge });
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            pseudo: user.pseudo,
            token: jwt.sign(
              { userId: user.id, email: user.email, isAdmin: user.isAdmin, pseudo: user.pseudo },
              process.env.TOKEN,
              { expiresIn: '12h' }
            )
          });
        })

    }).catch(error => res.status(400).json({ error: "Une erreur est survenue" }));
};


/* exports.login = async (req, res) => {
  try {
    User.findOne({
      where: { email: xss(req.body.email) }
    })
      .then(user => {
        if (!user) {
          return res.status(200).send({ errors: 'Email incorrect' })
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(200).json({ errors: 'Le mot de passe est incorrect !' });
            }
            const token = createToken(req.body.userId);
            res.cookie('jwt', token, { httpOnly: true, maxAge });
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              token: jwt.sign(
                { userId: user.id, email: user.email, isAdmin: user.isAdmin },
                process.env.TOKEN,
                { expiresIn: '12h' }
              )
            });
          })
      }).catch(error => res.status(400).json({ error: "Une erreur est survenue" }));
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
} */


//Consultation du profil d'un User
exports.getOneUser = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Une erreur d'affichage du profil est survenue" }));
};

//Consultation de tous les profils utilisateurs
exports.getAllUsers = (req, res, next) => {
  User.findAll({
    order: [['id', 'ASC']], //affichage de l'ensemble users.
    //attributes: ['id', 'username', 'email', 'isAdmin', 'createdAt']
  })

    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Une erreur d'affichage des profils est survenue" }));
};

//Modification du profil d'un User
exports.updateUser = (req, res, next) => {
  console.log(req.userId);
  console.log(req.isAdmin);
  console.log(req.params.id);
  User.findOne({
    where: {
      id: req.userId,
    }
  }) //id: req.userId // req.params.id
    .then((user) => {
      user.update({
        where: {
          id: req.userId
        },
        ...req.body
      })
        .then(() => {
          res.status(201).json({ message: 'user modifier' })
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}
/* exports.updateUser = (req, res, next) => {
  console.log(req.userId)
  console.log(req.isAdmin)
  User.findOne({ where: { id: req.userId } }) //id: req.userId // req.params.id
    .then((user) => {
      user.update({
        where: {
          id: req.userId,
        },
        ...req.body
      })
        .then(() => res.status(200).json({ message: 'Le profil a bien été modifiée !' }))
        .catch(error => console.log(error) || res.status(400).json({ error: "Une erreur est survenue dans la modification du profil" }));
    });
} */

exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.userId } })
    .then(() => {
      User.destroy({ where: { id: req.userId } })
        .then(() => res.status(200).json({ message: "Le profil a bien été supprimé !" }))
    }).catch(error => console.log(error) || res.status(400).json({ error: "Une erreur est survenue " }));
};






/* exports.updateUser = (req, res, next) => {
  console.log(req.userId)
  console.log(req.isAdmin)
  if (req.isAdmin === 1 || req.userId === req.userId ) {
    User.findOne({ where: { id: req.userId } }) //id: req.userId
    .then((user) => {
            user.update({
              where: {
                userId: req.params.userId,
              },
              ...req.body
            })
          .then(() => res.status(200).json({ message: 'Le profil a bien été modifiée !' }))
          .catch(error => console.log(error) || res.status(400).json({ error: "Une erreur est survenue dans la modification du profil" }));
      });
  } else {
    throw "La modification de l'article n'est possible que par son auteur ou un admin.";
  }
} */

/* //Modification du profil d'un User
exports.updateUser = (req, res, next) => {
  console.log(req.userId)
  console.log(req.isAdmin)
    User.findOne({ where: { id: req.userId } }) //id: req.userId // req.params.id
    .then((user) => {
            user.update({
              where: {
                userId: req.params.userId,
              },
              ...req.body
            })
          .then(() => res.status(200).json({ message: 'Le profil a bien été modifiée !' }))
          .catch(error => console.log(error) || res.status(400).json({ error: "Une erreur est survenue dans la modification du profil" }));
      });
} */

/* exports.getOneUser = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
    //attributes: ['id', 'username', 'email', 'isAdmin']
  })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Une erreur d'affichage du profil est survenue" }));
}; */

/* //Suppression du profil d'un User
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(() => {
      User.destroy({ where: { id: req.userId } })
        .then(() => res.status(200).json({ message: "Le profil a bien été supprimé !" }))
    })
    .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la suppression du profil" }));
}; */