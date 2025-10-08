const sessionService = require('./academicSessionService');
const instituteService = require('../institute/instituteService'); 

async function getSession(req, res, next) {
    try {
        const session = await sessionService.getSession(req.params.id);
        res.json(session);
    } catch (err) {
        next(err);
    }
}

async function getSessionsByInstitute(req, res, next) {
    try {
        const sessions = await sessionService.getSessionsByInstitute(req.params.instituteId);
        res.json(sessions);
    } catch (err) {
        next(err);
    }
}

async function createSession(req, res, next) {
    try {
        const session = await sessionService.createSession(req.body);
        res.status(201).json({ message: 'Academic session created', session });
    } catch (err) {
        next(err);
    }
}

async function updateSession(req, res, next) {
    try {
        const session = await sessionService.getSession(req.params.id);
        const institute = await instituteService.getInstituteById(session.instituteId);
        console.log(institute.createdBy);
        console.log(req.user.userId);
        if (institute.createdBy !== req.user.userId) {
            return res.status(403).json({ message: 'You are not allowed to update this session' });
        }

        const updatedSession = await sessionService.updateSession(req.params.id, req.body);
        res.json({ message: 'Academic session updated', session: updatedSession });
    } catch (err) {
        next(err);
    }
}

async function deleteSession(req, res, next) {
    try {
        const session = await sessionService.getSession(req.params.id);
        const institute = await instituteService.getInstituteById(session.instituteId);

        if (institute.createdBy !== req.user.userId) {
            return res.status(403).json({ message: 'You are not allowed to delete this session' });
        }

        await sessionService.deleteSession(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSession,
    getSessionsByInstitute,
    createSession,
    updateSession,
    deleteSession
};