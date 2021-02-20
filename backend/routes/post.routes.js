const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');
const adminCtrl = require('../controllers/adminController');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

/////User////
router.get('/', auth, postCtrl.getAllPosts); 
router.post('/new', auth, multer, postCtrl.createPost); 
router.get('/:id',  auth, postCtrl.getOnePost); 
router.put('/:id',  auth, multer, postCtrl.updatePost);  
router.delete('/:id', auth, postCtrl.deletePost);  

/////Admin////
router.delete('/delete/:id', auth, adminCtrl.deletePost);
router.put('/update/:id', auth, adminCtrl.updatePost);

module.exports = router;