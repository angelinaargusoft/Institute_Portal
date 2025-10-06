const instituteModel = require('./instituteModel');
const { v4: uuidv4 } = require('uuid');

async function createInstitute(data) {
    const instituteData = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        address: data.address,
        description: data.description,
        logoUrl: data.logoUrl,
        createdBy: data.createdBy,
        status: 'active'
    };
    return instituteModel.createInstitute(instituteData);
}

async function getAllInstitutes() {
    return instituteModel.getAllInstitutes();
}

async function getInstituteById(id) {
    return instituteModel.getInstituteById(id);
}

async function getInstitutesByUserId(userId) {
    return instituteModel.getInstitutesByUserId(userId);
}

async function updateInstitute(id, data) {
    return instituteModel.updateInstitute(id, data);
}

async function deleteInstitute(id) {
    return instituteModel.deleteInstitute(id);
}

module.exports = { createInstitute, getAllInstitutes, getInstituteById, getInstitutesByUserId, updateInstitute, deleteInstitute };