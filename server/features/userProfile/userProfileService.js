const userProfileModel = require('./userProfileModel');

async function getProfileByUserId(userId) {
    return await userProfileModel.getByUserId(userId);
}

async function createProfile(userId, data) {
    const profileData = {
        userId, 
        ...data
    };
    return await userProfileModel.createBaseProfile(profileData);
}

async function updateBaseProfile(userId, data) {
    return await userProfileModel.updateBaseProfile(userId, data);
}

async function updateStudentProfile(userId, studentData) {
    return await userProfileModel.updateStudentProfile(userId, studentData);
}

async function updateFacultyProfile(userId, facultyData) {
    return await userProfileModel.updateFacultyProfile(userId, facultyData);
}

async function deleteProfile(userId) {
    return await userProfileModel.remove(userId);
}

module.exports = {
    getProfileByUserId,
    createProfile,
    updateBaseProfile,
    updateStudentProfile,
    updateFacultyProfile,
    deleteProfile
};