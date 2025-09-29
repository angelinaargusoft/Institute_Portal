const instituteService = require('./instituteService');

async function createInstitute(req, res, next) {
    try {
        //const userId = req.user.userId; // from auth middleware
        const institute = await instituteService.createInstitute(req.body);
        res.status(201).json({ message: "Institute created", institute });
    } catch (err) {
        next(err);
    }
}

async function getAllInstitutes(req, res, next) {
    try {
        const institutes = await instituteService.getAllInstitutes();
        res.json(institutes);
    } catch (err) {
        next(err);
    }
}

async function getInstituteById(req, res, next) {
    try {
        const institute = await instituteService.getInstituteById(req.params.id);
        if (!institute) return res.status(404).json({ message: "Institute not found" });
        res.json(institute);
    } catch (err) {
        next(err);
    }
}

async function updateInstitute(req, res, next) {
    try {
        const updated = await instituteService.updateInstitute(req.params.id, req.body);
        res.json({ message: "Institute updated", updated });
    } catch (err) {
        next(err);
    }
}

async function deleteInstitute(req, res, next) {
    try {
        await instituteService.deleteInstitute(req.params.id);
        res.json({ message: "Institute deleted" });
    } catch (err) {
        next(err);
    }
}

module.exports = { createInstitute, getAllInstitutes, getInstituteById, updateInstitute, deleteInstitute };