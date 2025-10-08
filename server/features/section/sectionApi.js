const express = require('express');
const {
    getSection,
    getSectionsByClass,
    createSection,
    updateSection,
    deleteSection
} = require('./sectionController');
const { authenticate } = require('../../middlewares/authMiddleware');
const router = express.Router();

router.get('/class/:classId', authenticate, getSectionsByClass);
router.post('/', authenticate, createSection);
router.get('/:id', authenticate, getSection);
router.put('/:id', authenticate, updateSection);
router.delete('/:id', authenticate, deleteSection);

module.exports = router;






