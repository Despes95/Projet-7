const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');
const adminCtrl = require('../controllers/adminController');

/////User////
router.post('/register', userCtrl.signup); 
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.get('/',  auth, userCtrl.getAllUsers);

/////Admin////
router.delete('/delete/:id', auth, adminCtrl.deleteUser);
router.put('/update/:id', auth, adminCtrl.updateUser);

module.exports = router;