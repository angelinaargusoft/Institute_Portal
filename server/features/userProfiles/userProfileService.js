const userProfileModel = require('./userProfileModel');
const { v4: uuidv4 } = require('uuid');

async function createProfile(data) {
    const profileData = {
        id: uuidv4(),
        ...data
    };
    return await userProfileModel.createUserProfile(profileData);
}

async function getProfileById(id) {
    return await userProfileModel.getUserProfileById(id);
}

async function getProfileByUserId(userId) {
    return await userProfileModel.getUserProfileByUserId(userId);
}

async function updateProfile(id, data) {
    return await userProfileModel.updateUserProfile(id, data);
}

async function deleteProfile(id) {
    return await userProfileModel.deleteUserProfile(id);
}

module.exports = {
    createProfile,
    getProfileById,
    getProfileByUserId,
    updateProfile,
    deleteProfile
};