const termService = require('./termService');
const sessionService = require('../academicSession/academicSessionService');
const instituteService = require('../institute/instituteService');

async function getTerm(req, res, next) {
    try {
        const term = await termService.getTerm(req.params.id);
        res.json(term);
    } catch (err) {
        next(err);
    }
}

async function getTermsBySession(req, res, next) {
    try {
        const terms = await termService.getTermsBySession(req.params.sessionId);
        res.json(terms);
    } catch (err) {
        next(err);
    }
}

async function createTerm(req, res, next) {
    try {
        const { sessionId } = req.body;
        const session = await sessionService.getSession(sessionId);
        const institute = await instituteService.getInstituteById(session.instituteId);
        if (institute.createdBy !== req.user.userId) {
            return res.status(403).json({ message: 'You are not allowed to create a term for this institute' });
        }
        const term = await termService.createTerm(req.body);
        res.status(201).json({ message: 'Term created', term });
    } catch (err) {
        next(err);
    }
}

async function updateTerm(req, res, next) {
    try {
        const term = await termService.getTerm(req.params.id);
        const session = await sessionService.getSession(term.sessionId);
        const institute = await instituteService.getInstituteById(session.instituteId);
        if (institute.createdBy !== req.user.userId) {
            return res.status(403).json({ message: 'You are not allowed to update this term' });
        }
        const updatedTerm = await termService.updateTerm(req.params.id, req.body);
        res.json({ message: 'Term updated', term: updatedTerm });
    } catch (err) {
        next(err);
    }
}

async function deleteTerm(req, res, next) {
    try {
        const term = await termService.getTerm(req.params.id);
        const session = await sessionService.getSession(term.sessionId);
        const institute = await instituteService.getInstituteById(session.instituteId);
        if (institute.createdBy !== req.user.userId) {
            return res.status(403).json({ message: 'You are not allowed to delete this term' });
        }
        await termService.deleteTerm(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getTerm,
    getTermsBySession,
    createTerm,
    updateTerm,
    deleteTerm
};