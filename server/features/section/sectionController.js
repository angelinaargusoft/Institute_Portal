const sectionService = require('./sectionService');

async function getSection(req, res, next) {
    try {
        const section = await sectionService.getSection(req.params.id);
        res.json(section);
    } catch (err) {
        next(err);
    }
}

async function getSectionsByClass(req, res, next) {
    try {
        const { classId } = req.params;
        const sections = await sectionService.getSectionsByClass(classId);
        res.json(sections);
    } catch (err) {
        next(err);
    }
}

async function createSection(req, res, next) {
    try {
        const userId = req.user.userId;
        const section = await sectionService.createSection(req.body, userId);
        res.status(201).json({
            message: 'Section created successfully',
            sectionId: section.id
        });
    } catch (err) {
        next(err);
    }
}

async function updateSection(req, res, next) {
    try {
        const userId = req.user.userId;
        const updated = await sectionService.updateSection(req.params.id, req.body, userId);
        res.json({
            message: 'Section updated successfully',
            section: updated
        });
    } catch (err) {
        next(err);
    }
}

async function deleteSection(req, res, next) {
    try {
        const userId = req.user.userId;
        await sectionService.deleteSection(req.params.id, userId);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSection,
    getSectionsByClass,
    createSection,
    updateSection,
    deleteSection
};








