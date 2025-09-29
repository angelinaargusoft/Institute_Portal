const userProfileService = require('./userProfileService');

async function createProfile(req, res) {
    try {
        const profile = await userProfileService.createProfile(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProfileById(req, res) {
    try {
        const profile = await userProfileService.getProfileById(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProfileByUserId(req, res) {
    try {
        const profile = await userProfileService.getProfileByUserId(req.params.userId);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProfile(req, res) {
    try {
        const profile = await userProfileService.updateProfile(req.params.id, req.body);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProfile(req, res) {
    try {
        await userProfileService.deleteProfile(req.params.id);
        res.json({ message: "Profile deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createProfile, getProfileById, getProfileByUserId, updateProfile, deleteProfile };