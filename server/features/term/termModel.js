const pool = require('../../config/database');

async function getById(id) {
    const query = `SELECT * FROM Terms WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}

async function getBySessionId(sessionId) {
    const query = `SELECT * FROM Terms WHERE sessionId = ?`;
    const [rows] = await pool.execute(query, [sessionId]);
    return rows;
}

async function createTerm(data) {
    const { id, sessionId, name, startDate, endDate, status } = data;
    const query = `
        INSERT INTO Terms (id, sessionId, name, startDate, endDate, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [id, sessionId, name, startDate, endDate, status || 'upcoming']);
    return getById(id);
}

async function updateTerm(id, data) {
    const term = await getById(id);
    if (!term) throw new Error('Term not found');
    const { name, startDate, endDate, status } = data;
    const query = `
        UPDATE Terms
        SET name = ?, startDate = ?, endDate = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    await pool.execute(query, [
        name || term.name,
        startDate || term.startDate,
        endDate || term.endDate,
        status || term.status,
        id
    ]);
    return getById(id);
}

async function removeTerm(id) {
    const term = await getById(id);
    if (!term) return;
    await pool.execute(`DELETE FROM Terms WHERE id = ?`, [id]);
}

module.exports = {
    getById,
    getBySessionId,
    createTerm,
    updateTerm,
    removeTerm
};