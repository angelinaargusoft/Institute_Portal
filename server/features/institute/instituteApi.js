const express = require('express');
const router = express.Router();
const instituteController = require('./instituteController');
const { authenticate } = require('../../middlewares/authMiddleware');

router.post('/', instituteController.createInstitute);
router.get('/', instituteController.getAllInstitutes);
router.get('/:id', instituteController.getInstituteById);
router.get('/user/:userId', instituteController.getInstitutesByUserId);
router.put('/:id', instituteController.updateInstitute);
router.delete('/:id', instituteController.deleteInstitute);

module.exports = router;