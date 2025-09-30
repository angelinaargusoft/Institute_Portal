const express = require('express');
const router = express.Router();
const userProfileController = require('./userProfileController');
const { authenticate } = require('../../middlewares/authMiddleware');

router.post('/', authenticate, userProfileController.createProfile);
router.get('/:userId', authenticate, userProfileController.getProfileByUserId);
router.put('/:userId/base', authenticate, userProfileController.updateBaseProfile);
router.put('/:userId/student', authenticate, userProfileController.updateStudentProfile);
router.put('/:userId/faculty', authenticate, userProfileController.updateFacultyProfile);
router.delete('/:userId', authenticate, userProfileController.deleteProfile);

module.exports = router;