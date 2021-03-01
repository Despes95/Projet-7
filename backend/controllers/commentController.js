const db = require('../config/dbSql');
const Comment = db.comment;
const User = db.user;


//Créer un nouveau commentaire
exports.createComment = (req, res, next) => {
    Comment.create({
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content,
    })
        .then(success => res.status(200).json({ success: "Le commentaire a été enregistré" }))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans l'enregistrement d'un commentaire" }));
};

//Affiche un commentaire
exports.readOneComment = (req, res, next) => {
    Comment.findOne({
        where: { id: req.params.id },
        include: [{
            model: User,
            attributes: ['pseudo'],
            required: true
        }]
    })
        .then((comment) => { res.status(200).json(comment) })
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans l'affichage d'un commentaire" }));
}

//Affiche la liste des commentaires associés au post
exports.readAllComments = (req, res, next) => {
    Comment.findAll({
        where: { postId: req.params.postId },
        order: [['createdAt', 'DESC']], //affichage des commentaires par ordre décroissant
        include: [{
            model: User,
            attributes: ['pseudo'],
            required: true
        }]
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans l'affichage des commentaires" }));
}

//Modifier un commentaire
exports.updateComment = (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.id,
            userId: req.userId
        }
    })
        .then((comment) => {
            comment.update({
                where: {
                    userId: req.userId,
                    id: req.userId
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

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.id,
            userId: req.userId
        }
    })
        .then((comment) => {
            comment.destroy({
                where: {
                    userId: req.userId,
                    postId: req.userId
                }
            })
                .then(() => {
                    res.status(201).json({ message: 'post modifié' })
                })
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
}
