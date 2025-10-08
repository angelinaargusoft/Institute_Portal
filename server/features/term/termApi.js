const express = require('express');
const {
    getTerm,
    getTermsBySession,
    createTerm,
    updateTerm,
    deleteTerm
} = require('./termController');

const { authenticate } = require('../../middlewares/authMiddleware');
const router = express.Router();

router.get('/session/:sessionId', authenticate, getTermsBySession);
router.get('/:id', authenticate, getTerm);
router.post('/', authenticate, createTerm);
router.put('/:id', authenticate, updateTerm);
router.delete('/:id', authenticate, deleteTerm);

module.exports = router;