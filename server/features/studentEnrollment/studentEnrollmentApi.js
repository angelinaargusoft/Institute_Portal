const express = require('express');
const {
  getEnrollment,
  getEnrollmentsByInstitute,
  getEnrollmentsByUser,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = require('./studentEnrollmentController');
const { authenticate } = require('../../middlewares/authMiddleware');
const router = express.Router();

router.get('/institute/:instituteId', authenticate, getEnrollmentsByInstitute);
router.get('/user/:userId', authenticate, getEnrollmentsByUser);
router.get('/:id', authenticate, getEnrollment);
router.post('/', authenticate, createEnrollment);
router.put('/:id', authenticate, updateEnrollment);
router.delete('/:id', authenticate, deleteEnrollment);

module.exports = router;