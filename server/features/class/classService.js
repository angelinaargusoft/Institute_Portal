const classModel = require('./classModel');
const { v4: uuidv4 } = require('uuid');
const instituteService = require('../institute/instituteService');

async function getClass(id) {
    const classItem = await classModel.getById(id);
    if (!classItem) throw new Error('Class not found');
    return classItem;
}

async function getClassesByInstitute(instituteId) {
    return classModel.getByInstituteId(instituteId);
}

async function createClass(data, userId) {
    const { instituteId, name } = data;
    if (!instituteId || !name) {
        throw new Error('Institute ID and class name are required');
    }
    // Check institute exists
    const institute = await instituteService.getInstituteById(instituteId);
    if (!institute) throw new Error('Institute not found');
    // Only creator can add class
    if (institute.createdBy !== userId) {
        throw new Error('You are not allowed to create a class for this institute');
    }
    const id = uuidv4();
    const classData = { id, instituteId, name };
    return classModel.createClass(classData);
}

async function updateClass(id, data, userId) {
    const classItem = await classModel.getById(id);
    if (!classItem) throw new Error('Class not found');
    const institute = await instituteService.getInstituteById(classItem.instituteId);
    if (institute.createdBy !== userId) {
        throw new Error('You are not allowed to update this class');
    }
    return classModel.updateClass(id, data);
}

async function deleteClass(id, userId) {
    const classItem = await classModel.getById(id);
    if (!classItem) throw new Error('Class not found');
    const institute = await instituteService.getInstituteById(classItem.instituteId);
    if (institute.createdBy !== userId) {
        throw new Error('You are not allowed to delete this class');
    }
    return classModel.removeClass(id);
}

module.exports = {
    getClass,
    getClassesByInstitute,
    createClass,
    updateClass,
    deleteClass
};