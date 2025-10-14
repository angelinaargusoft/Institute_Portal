const pool = require('../../config/database');

async function getById(id) {
  const query = `SELECT * FROM StudentEnrollments WHERE id = ?`;
  const [rows] = await pool.execute(query, [id]);
  return rows[0];
}

async function getByUserId(userId) {
  const query = `SELECT * FROM StudentEnrollments WHERE userId = ?`;
  const [rows] = await pool.execute(query, [userId]);
  return rows;
}

async function getByInstituteId(instituteId) {
  const query = `SELECT * FROM StudentEnrollments WHERE instituteId = ?`;
  const [rows] = await pool.execute(query, [instituteId]);
  return rows;
}

async function createEnrollment(data) {
  const { id, userId, instituteId, rollNumber } = data;
  const query = `
    INSERT INTO StudentEnrollments (id, userId, instituteId, rollNumber)
    VALUES (?, ?, ?, ?)
  `;
  await pool.execute(query, [id, userId, instituteId, rollNumber || null]);
  return getById(id);
}

async function updateEnrollment(id, data) {
  const enrollment = await getById(id);
  if (!enrollment) throw new Error('Enrollment not found');
  const { rollNumber } = data;
  const query = `
    UPDATE StudentEnrollments
    SET rollNumber = ?
    WHERE id = ?
  `;
  await pool.execute(query, [rollNumber || enrollment.rollNumber, id]);
  return getById(id);
}

async function removeEnrollment(id) {
  const enrollment = await getById(id);
  if (!enrollment) return;
  await pool.execute(`DELETE FROM StudentEnrollments WHERE id = ?`, [id]);
}

module.exports = {
  getById,
  getByUserId,
  getByInstituteId,
  createEnrollment,
  updateEnrollment,
  removeEnrollment
};