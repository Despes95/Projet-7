const db = require('../config/dbSql');
const Post = db.post;
const User = db.user;
const Comments = db.comment;
const fs = require('fs')

exports.createPost = (req, res) => {
    if (req.file) {
        req.body.picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } else {
        req.body.picture = null;
    } 
    // Create post in database
    req.body.data = JSON.parse(req.body.data)
    console.log(req.body)
    const article = {
        title: req.body.data.title,
        content: req.body.data.content,
        userId: req.body.data.userId,
        picture: req.body.picture
    };
    console.log(article)
    Post.create(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    });
};



// Recuperation de toutes les Publications
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', 'DESC']], //affichage des messages par ordre décroissant
        attributes: ['id', 'userId', 'title', 'content', 'picture', 'createdAt', 'updatedAt'],
        include: [User, Comments]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue lors de l'affichage du fil d'actualité" }));
}

// Affiche d'une Publication
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id, },
        include: [User, Comments]
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue lors de l'affichage de la publication" }));
}

// Modifier une Publication
exports.updatePost = (req, res, next) => {
    console.log(req.userId);
    console.log(req.params.id);
    Post.findOne({
        where: {
            id: req.params.id,
            userId: req.userId
        }
    }) //id: req.params.id
        .then((post) => {
            post.update({
                where: {

                    userId: req.userId,
                    id: req.userId //req.userId
                },
                ...req.body
            })
                .then(() => {
                    res.status(201).json({ message: 'post modifié' })
                })
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
}

// Supprimer une publication
exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: {
            id: req.params.id,
            userId: req.userId
        }
    })
        .then(post => {
            const filename = post.picture.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                post.destroy({
                    where: {
                        userId: req.userId,
                        id: req.userId
                    }
                })
                    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}

