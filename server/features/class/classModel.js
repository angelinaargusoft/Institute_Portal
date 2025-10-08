const pool = require('../../config/database');

async function getById(id) {
    const query = `SELECT * FROM Classes WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}

async function getByInstituteId(instituteId) {
    const query = `SELECT * FROM Classes WHERE instituteId = ?`;
    const [rows] = await pool.execute(query, [instituteId]);
    return rows;
}

async function createClass(data) {
    const { id, instituteId, name } = data;
    const query = `
        INSERT INTO Classes (id, instituteId, name)
        VALUES (?, ?, ?)
    `;
    await pool.execute(query, [id, instituteId, name]);
    return getById(id);
}

async function updateClass(id, data) {
    const classItem = await getById(id);
    if (!classItem) throw new Error('Class not found');

    const { name } = data;
    const query = `
        UPDATE Classes
        SET name = ?
        WHERE id = ?
    `;
    
    await pool.execute(query, [name || classItem.name, id]);
    return getById(id);
}

async function removeClass(id) {
    const classItem = await getById(id);
    if (!classItem) return;
    await pool.execute(`DELETE FROM Classes WHERE id = ?`, [id]);
}

module.exports = {
    getById,
    getByInstituteId,
    createClass,
    updateClass,
    removeClass
};