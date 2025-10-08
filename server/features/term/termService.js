const termModel = require('./termModel');
const { v4: uuidv4 } = require('uuid');
const sessionService = require('../academicSession/academicSessionService')

async function getTerm(id) {
    const term = await termModel.getById(id);
    if (!term) throw new Error('Term not found');
    return term;
}

async function getTermsBySession(sessionId) {
    return termModel.getBySessionId(sessionId);
}

async function createTerm(data) {
    const { sessionId, name, startDate, endDate, status } = data;
    if (!sessionId || !name || !startDate || !endDate) {
        throw new Error('Session ID, name, start date, and end date are required');
    }
    // Validate that startDate < endDate
    if (new Date(startDate) >= new Date(endDate)) {
        throw new Error('Start date must be before end date');
    }
    // Check if session exists
    const session = await sessionService.getSession(sessionId);
    if (!session) {
        throw new Error('Associated session not found');
    }
    // Validate term dates are within session dates
    if (new Date(startDate) < new Date(session.startDate) || new Date(endDate) > new Date(session.endDate)) {
        throw new Error('Term start and end dates must be within the session start and end dates');
    }
    const id = uuidv4();
    const termData = { id, sessionId, name, startDate, endDate, status };
    return termModel.createTerm(termData);
}

async function updateTerm(id, data) {
    const term = await termModel.getById(id);
    if (!term) throw new Error('Term not found');
    const { name, startDate, endDate, status } = data;
    // Validate dates
    const newStartDate = startDate || term.startDate;
    const newEndDate = endDate || term.endDate;
    if (new Date(newStartDate) >= new Date(newEndDate)) {
        throw new Error('Start date must be before end date');
    }
    // Get parent session to validate boundaries
    const session = await sessionService.getSession(term.sessionId);
    if (new Date(newStartDate) < new Date(session.startDate) || new Date(newEndDate) > new Date(session.endDate)) {
        throw new Error('Term start and end dates must be within the session start and end dates');
    }
    return termModel.updateTerm(id, { name, startDate, endDate, status });
}

async function deleteTerm(id) {
    const term = await termModel.getById(id);
    if (!term) throw new Error('Term not found');
    return termModel.removeTerm(id);
}

module.exports = {
    getTerm,
    getTermsBySession,
    createTerm,
    updateTerm,
    deleteTerm
};