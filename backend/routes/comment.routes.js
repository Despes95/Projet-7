const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentController');
const adminCtrl = require('../controllers/adminController');

const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token

/////User////
router.get('/all/:postId', auth, commentCtrl.readAllComments); //Affiche la liste des commentaires d'un post
router.post('/new', auth, commentCtrl.createComment); //Créer un nouveau commentaire
router.get('/one/:id', auth, commentCtrl.readOneComment); //Affiche un commentaire
router.put('/:id', auth, commentCtrl.updateComment); //Modifier un commentaire
router.delete('/:id', auth, commentCtrl.deleteComment); //Supprimer un commentaire

/////Admin////
router.delete('/delete/:id', auth, adminCtrl.deleteComment);
router.put('/update/:id', auth, adminCtrl.updateComment);

module.exports = router;