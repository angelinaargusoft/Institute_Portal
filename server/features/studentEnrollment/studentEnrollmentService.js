const studentEnrollmentModel = require('./studentEnrollmentModel');
const { v4: uuidv4 } = require('uuid');
const instituteService = require('../institute/instituteService');
const userService = require('../user/userService');

async function getEnrollment(id) {
  const enrollment = await studentEnrollmentModel.getById(id);
  if (!enrollment) throw new Error('Enrollment not found');
  return enrollment;
}

async function getEnrollmentsByInstitute(instituteId) {
  return studentEnrollmentModel.getByInstituteId(instituteId);
}

async function getEnrollmentsByUser(userId) {
  return studentEnrollmentModel.getByUserId(userId);
}

async function createEnrollment(data, userId) {
  const { instituteId, studentId, rollNumber } = data;
  if (!instituteId || !studentId) {
    throw new Error('Institute ID and Student ID are required');
  }
  // Check if institute exists
  const institute = await instituteService.getInstituteById(instituteId);
  if (!institute) throw new Error('Institute not found');
  // Only institute creator can enroll students
  if (institute.createdBy !== userId) {
    throw new Error('You are not allowed to enroll students in this institute');
  }
  // Check if student exists
  const student = await userService.getUser(studentId);
  if (!student) throw new Error('Student not found');
  // :white_check_mark: Check if the user has 'student' role
  let roles = [];
  try {
    roles = Array.isArray(student.roles) ? student.roles : JSON.parse(student.roles);
  } catch (e) {
    roles = [];
  }
  if (!roles.includes('student')) {
    throw new Error('This user does not have a student role');
  }
  const id = uuidv4();
  const enrollmentData = {
    id,
    userId: studentId,
    instituteId,
    rollNumber: rollNumber || null,
  };
  return studentEnrollmentModel.createEnrollment(enrollmentData);
}

async function updateEnrollment(id, data, userId) {
  const enrollment = await studentEnrollmentModel.getById(id);
  if (!enrollment) throw new Error('Enrollment not found');
  const institute = await instituteService.getInstituteById(enrollment.instituteId);
  if (institute.createdBy !== userId) {
    throw new Error('You are not allowed to update this enrollment');
  }
  return studentEnrollmentModel.updateEnrollment(id, data);
}

async function deleteEnrollment(id, userId) {
  const enrollment = await studentEnrollmentModel.getById(id);
  if (!enrollment) throw new Error('Enrollment not found');
  const institute = await instituteService.getInstituteById(enrollment.instituteId);
  if (institute.createdBy !== userId) {
    throw new Error('You are not allowed to delete this enrollment');
  }
  return studentEnrollmentModel.removeEnrollment(id);
}

module.exports = {
  getEnrollment,
  getEnrollmentsByInstitute,
  getEnrollmentsByUser,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};