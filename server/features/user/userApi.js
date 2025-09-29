const express = require('express');
const { loginUser, refreshToken, getAllUsers, createUser, getUser, changePassword, deleteUser, logout } = require('./userController');
const {authenticate} = require('../../middlewares/authMiddleware')
const router = express.Router();

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/', createUser);
router.get('/:id',authenticate, getUser);
router.put('/:id', changePassword);
router.delete('/:id', deleteUser);

module.exports = router;