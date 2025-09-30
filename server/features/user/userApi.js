const express = require('express');
const { loginUser, refreshToken, getAllUsers, createUser, getUser, changePassword, deleteUser, logout } = require('./userController');
const {authenticate} = require('../../middlewares/authMiddleware')
const router = express.Router();

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.post('/logout', authenticate, logout);
router.post('/refresh-token', authenticate, refreshToken);
router.post('/', createUser);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, changePassword);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;