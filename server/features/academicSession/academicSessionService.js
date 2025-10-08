const sessionModel = require('./academicSessionModel');
const { v4: uuidv4 } = require('uuid');

async function getSession(id) {
    const session = await sessionModel.getById(id);
    if (!session) throw new Error('Academic session not found');
    return session;
}

async function getSessionsByInstitute(instituteId) {
    return sessionModel.getByInstituteId(instituteId);
}

async function createSession(data) {
    const id = uuidv4();
    const { instituteId, startDate, endDate, status } = data;
    if (!instituteId || !startDate || !endDate) {
        throw new Error('Institute ID, start date, and end date are required');
    }
    // Optional: Validate that startDate < endDate
    if (new Date(startDate) >= new Date(endDate)) {
        throw new Error('Start date must be before end date');
    }
    const sessionData = { id, instituteId, startDate, endDate, status };
    return sessionModel.createSession(sessionData);
}

async function updateSession(id, data) {
    const session = await sessionModel.getById(id);
    if (!session) throw new Error('Academic session not found');
    const { startDate, endDate, status } = data;
    // Optional: Validate dates
    const newStartDate = startDate || session.startDate;
    const newEndDate = endDate || session.endDate;
    if (new Date(newStartDate) >= new Date(newEndDate)) {
        throw new Error('Start date must be before end date');
    }
    return sessionModel.updateSession(id, { startDate, endDate, status });
}

async function deleteSession(id) {
    const session = await sessionModel.getById(id);
    if (!session) throw new Error('Academic session not found');
    return sessionModel.removeSession(id);
}

module.exports = {
    getSession,
    getSessionsByInstitute,
    createSession,
    updateSession,
    deleteSession
};