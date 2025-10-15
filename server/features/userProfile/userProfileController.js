const userProfileService = require('./userProfileService');

async function getAllProfiles(req, res) {
    try {
        const profiles = await userProfileService.getAllProfiles();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Create base profile
async function createProfile(req, res) {
    try {
        const { userId } = req.body;
        const profile = await userProfileService.createProfile(userId, req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Get profile by userId
async function getProfileByUserId(req, res) {
    try {
        const { userId } = req.params;
        const profile = await userProfileService.getProfileByUserId(userId);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Update base/general profile
async function updateBaseProfile(req, res) {
    try {
        const { userId } = req.params;
        const profile = await userProfileService.updateBaseProfile(userId, req.body);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Update student-specific fields
async function updateStudentProfile(req, res) {
    try {
        const { userId } = req.params;
        const profile = await userProfileService.updateStudentProfile(userId, req.body);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Update faculty-specific fields (also updates Users.role)
async function updateFacultyProfile(req, res) {
    try {
        const { userId } = req.params;
        const profile = await userProfileService.updateFacultyProfile(userId, req.body);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Delete profile
async function deleteProfile(req, res) {
    try {
        const { userId } = req.params;
        await userProfileService.deleteProfile(userId);
        res.json({ message: "Profile deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    getAllProfiles,
    createProfile,
    getProfileByUserId,
    updateBaseProfile,
    updateStudentProfile,
    updateFacultyProfile,
    deleteProfile
};