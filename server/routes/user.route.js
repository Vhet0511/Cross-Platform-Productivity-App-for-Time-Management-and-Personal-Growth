const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller.user.js');



router.post('/login', userController.loginUser);                
router.get('/email/:email', userController.getUserByEmail);     
router.put('/email/:email', userController.updateUserByEmail);  
// CRUD Routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
