
const express = require('express');
const router = express.Router();
const userProfileController = require('./userProfileController');
const { authenticate } = require('../../middlewares/authMiddleware'); 

router.post('/', userProfileController.createProfile);
router.get('/:id', userProfileController.getProfileById);
router.get('/user/:userId', userProfileController.getProfileByUserId);
router.put('/:id', userProfileController.updateProfile);
router.delete('/:id', userProfileController.deleteProfile);

module.exports = router;