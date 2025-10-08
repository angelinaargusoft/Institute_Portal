const pool = require('../../config/database');

async function getById(id) {
    const query = `SELECT * FROM Sections WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}

async function getByClassId(classId) {
    const query = `SELECT * FROM Sections WHERE classId = ?`;
    const [rows] = await pool.execute(query, [classId]);
    return rows;
}

async function getBySessionId(sessionId) {
    const query = `SELECT * FROM Sections WHERE sessionId = ?`;
    const [rows] = await pool.execute(query, [sessionId]);
    return rows;
}

async function createSection(data) {
    const { id, classId, sessionId, name } = data;
    const query = `
        INSERT INTO Sections (id, classId, sessionId, name)
        VALUES (?, ?, ?, ?)
    `;
    await pool.execute(query, [id, classId, sessionId, name]);
    return getById(id);
}

async function updateSection(id, data) {
    const section = await getById(id);
    if (!section) throw new Error('Section not found');
    const { name } = data;
    const query = `
        UPDATE Sections
        SET name = ?
        WHERE id = ?
    `;
    await pool.execute(query, [name || section.name, id]);
    return getById(id);
}

async function removeSection(id) {
    const section = await getById(id);
    if (!section) return;
    await pool.execute(`DELETE FROM Sections WHERE id = ?`, [id]);
}

module.exports = {
    getById,
    getByClassId,
    getBySessionId,
    createSection,
    updateSection,
    removeSection
};