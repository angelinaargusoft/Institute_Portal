const pool = require('../../config/database');

async function getAllUsers() {
    const [rows] = await pool.execute(`SELECT id, email, roles, createdAt, updatedAt FROM Users`);
    return rows;
}

async function createUser(data) {
    const { id, email, password } = data;

    const query = `INSERT INTO Users (id, email, password) VALUES (?, ?, ?)`;
    await pool.execute(query, [id, email, password]);
    
    return { id, email, roles: ["student"] };
}

async function getUserById(id) {
    const [rows] = await pool.execute(`SELECT * FROM Users WHERE id = ?`, [id]);
    return rows[0];
}

async function getUserByEmail(email) {
    const [rows] = await pool.execute(`SELECT * FROM Users WHERE email = ?`, [email]);
    return rows[0];
}

async function changePassword(id, newPassword) {
    const query = `UPDATE Users SET password = ? WHERE id = ?`;
    await pool.execute(query, [newPassword, id]);
    return getUserById(id);
}

async function updateRoles(id, newRoles) {
    const rolesJson = JSON.stringify(newRoles);
    const query = `UPDATE Users SET roles = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;
    await pool.execute(query, [rolesJson, id]);
    return getUserById(id);
}

async function deleteUser(id) {
    await pool.execute(`DELETE FROM Users WHERE id = ?`, [id]);
}

module.exports = { getAllUsers, createUser, getUserById, getUserByEmail, changePassword, updateRoles,deleteUser };