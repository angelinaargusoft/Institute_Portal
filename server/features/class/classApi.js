const express = require('express');
const {
    getClass,
    getClassesByInstitute,
    createClass,
    updateClass,
    deleteClass
} = require('./classController');
const { authenticate } = require('../../middlewares/authMiddleware');
const router = express.Router();

router.get('/institute/:instituteId', authenticate, getClassesByInstitute);
router.get('/:id', authenticate, getClass);
router.post('/', authenticate, createClass);
router.put('/:id', authenticate, updateClass);
router.delete('/:id', authenticate, deleteClass);

module.exports = router;