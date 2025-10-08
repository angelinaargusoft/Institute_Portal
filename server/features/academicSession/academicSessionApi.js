const express = require('express');
const {
    getSession,
    getSessionsByInstitute,
    createSession,
    updateSession,
    deleteSession
} = require('./academicSessionController');
const { authenticate } = require('../../middlewares/authMiddleware');
const router = express.Router();

router.get('/institute/:instituteId', authenticate, getSessionsByInstitute);
router.get('/:id', authenticate, getSession);
router.post('/', authenticate, createSession);
router.put('/:id', authenticate, updateSession);
router.delete('/:id', authenticate, deleteSession);

module.exports = router;