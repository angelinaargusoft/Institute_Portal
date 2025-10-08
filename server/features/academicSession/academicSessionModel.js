const pool = require('../../config/database');

async function getById(id) {
    const query = `SELECT * FROM AcademicSessions WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}

async function getByInstituteId(instituteId) {
    const query = `SELECT * FROM AcademicSessions WHERE instituteId = ?`;
    const [rows] = await pool.execute(query, [instituteId]);
    return rows;
}

async function createSession(data) {
    const { id, instituteId, startDate, endDate, status } = data;
    const query = `
        INSERT INTO AcademicSessions (id, instituteId, startDate, endDate, status)
        VALUES (?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [id, instituteId, startDate, endDate, status || 'upcoming']);
    return getById(id);
}

async function updateSession(id, data) {
    const session = await getById(id);
    if (!session) throw new Error('Academic session not found');
    const { startDate, endDate, status } = data;
    const query = `
        UPDATE AcademicSessions
        SET startDate = ?, endDate = ?, status = ?
        WHERE id = ?
    `;
    await pool.execute(query, [
        startDate || session.startDate,
        endDate || session.endDate,
        status || session.status,
        id
    ]);
    return getById(id);
}

async function removeSession(id) {
    const session = await getById(id);
    if (!session) return;
    await pool.execute(`DELETE FROM AcademicSessions WHERE id = ?`, [id]);
}

module.exports = {
    getById,
    getByInstituteId,
    createSession,
    updateSession,
    removeSession
};
