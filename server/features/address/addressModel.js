const pool = require('../../config/database');

async function createAddress(data) {
    const { id, type, addressLine, city, state, country, postalCode } = data;
    const query = `
        INSERT INTO Addresses (id, type, addressLine, city, state, country, postalCode)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [id, type, addressLine, city, state, country, postalCode]);
    return data;
}

async function getAddressById(id) {
    const [rows] = await pool.execute(`SELECT * FROM Addresses WHERE id = ?`, [id]);
    return rows[0];
}

async function updateAddress(id, data) {
    const { addressType, addressLine, city, state, country, postalCode } = data;
    const query = `
        UPDATE Addresses
        SET type = ?, addressLine = ?, city = ?, state = ?, country = ?, postalCode = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    await pool.execute(query, [addressType, addressLine, city, state, country, postalCode, id]);
    return await getAddressById(id);
}

async function deleteAddress(id) {
    await pool.execute(`DELETE FROM Addresses WHERE id = ?`, [id]);
}

module.exports = { createAddress, getAddressById, updateAddress, deleteAddress };