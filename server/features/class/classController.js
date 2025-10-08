const classService = require('./classService');

async function getClass(req, res, next) {
    try {
        const classItem = await classService.getClass(req.params.id);
        res.json(classItem);
    } catch (err) {
        next(err);
    }
}

async function getClassesByInstitute(req, res, next) {
    try {
        const classes = await classService.getClassesByInstitute(req.params.instituteId);
        res.json(classes);
    } catch (err) {
        next(err);
    }
}

async function createClass(req, res, next) {
    try {
        const classItem = await classService.createClass(req.body, req.user.userId);
        res.status(201).json({ message: 'Class created', class: classItem });
    } catch (err) {
        next(err);
    }
}

async function updateClass(req, res, next) {
    try {
        const updatedClass = await classService.updateClass(req.params.id, req.body, req.user.userId);
        res.json({ message: 'Class updated', class: updatedClass });
    } catch (err) {
        next(err);
    }
}

async function deleteClass(req, res, next) {
    try {
        await classService.deleteClass(req.params.id, req.user.userId);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getClass,
    getClassesByInstitute,
    createClass,
    updateClass,
    deleteClass
};