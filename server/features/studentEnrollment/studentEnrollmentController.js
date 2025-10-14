const studentEnrollmentService = require('./studentEnrollmentService');

async function getEnrollment(req, res, next) {
  try {
    const enrollment = await studentEnrollmentService.getEnrollment(req.params.id);
    res.json(enrollment);
  } catch (err) {
    next(err);
  }
}

async function getEnrollmentsByInstitute(req, res, next) {
  try {
    const enrollments = await studentEnrollmentService.getEnrollmentsByInstitute(req.params.instituteId);
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
}

async function getEnrollmentsByUser(req, res, next) {
  try {
    const enrollments = await studentEnrollmentService.getEnrollmentsByUser(req.params.userId);
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
}

async function createEnrollment(req, res, next) {
  try {
    const enrollment = await studentEnrollmentService.createEnrollment(req.body, req.user.userId);
    res.status(201).json({ message: 'Student enrolled successfully', enrollment });
  } catch (err) {
    next(err);
  }
}

async function updateEnrollment(req, res, next) {
  try {
    const updatedEnrollment = await studentEnrollmentService.updateEnrollment(req.params.id, req.body, req.user.userId);
    res.json({ message: 'Enrollment updated successfully', enrollment: updatedEnrollment });
  } catch (err) {
    next(err);
  }
}

async function deleteEnrollment(req, res, next) {
  try {
    await studentEnrollmentService.deleteEnrollment(req.params.id, req.user.userId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getEnrollment,
  getEnrollmentsByInstitute,
  getEnrollmentsByUser,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};