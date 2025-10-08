const sectionModel = require('./sectionModel');
const classModel = require('../class/classModel');
const sessionModel = require('../academicSession/academicSessionModel');
const instituteService = require('../institute/instituteService');
const { v4: uuidv4 } = require('uuid');

async function getSection(id) {
    const section = await sectionModel.getById(id);
    if (!section) throw new Error('Section not found');
    return section;
}

async function getSectionsByClass(classId) {
    return sectionModel.getByClassId(classId);
}

async function createSection(data, userId) {
    const { classId, sessionId, name } = data;
    if (!classId || !sessionId || !name) {
        throw new Error('Class ID, Session ID, and Section name are required');
    }
    // Validate class
    const classItem = await classModel.getById(classId);
    if (!classItem) throw new Error('Class not found');
    // Validate session
    const session = await sessionModel.getById(sessionId);
    if (!session) throw new Error('Session not found');
    // Validate institute ownership
    const institute = await instituteService.getInstituteById(classItem.instituteId);
    if (!institute) throw new Error('Institute not found');
    if (institute.createdBy !== userId) {
        throw new Error('You are not allowed to create a section for this institute');
    }
    // Ensure section’s session belongs to same institute
    if (session.instituteId !== institute.id) {
        throw new Error('Session does not belong to the same institute as the class');
    }
    const id = uuidv4();
    const sectionData = { id, classId, sessionId, name };
    return sectionModel.createSection(sectionData);
}

async function updateSection(id, data, userId) {
    const section = await sectionModel.getById(id);
    if (!section) throw new Error('Section not found');
    const classItem = await classModel.getById(section.classId);
    if (!classItem) throw new Error('Class not found');
    const institute = await instituteService.getInstituteById(classItem.instituteId);
    if (!institute) throw new Error('Institute not found');
    if (institute.createdBy !== userId) {
        throw new Error('You are not allowed to update this section');
    }
    return sectionModel.updateSection(id, data);
}

async function deleteSection(id, userId) {
    const section = await sectionModel.getById(id);
    if (!section) throw new Error('Section not found');
    const classItem = await classModel.getById(section.classId);
    if (!classItem) throw new Error('Class not found');
    const institute = await instituteService.getInstituteById(classItem.instituteId);
    if (!institute) throw new Error('Institute not found');
    if (institute.createdBy !== userId) {
        throw new Error('You are not allowed to delete this section');
    }
    return sectionModel.removeSection(id);
}

module.exports = {
    getSection,
    getSectionsByClass,
    createSection,
    updateSection,
    deleteSection
};









