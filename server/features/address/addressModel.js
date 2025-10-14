const pool = require('../../config/database');

async function createAddress(data) {
    console.log(data)
    const { id, addressLine, city, state, country, postalCode } = data;
    const query = `
        INSERT INTO Addresses (id, addressLine, city, state, country, postalCode)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [id, addressLine, city, state, country, postalCode]);
    return data;
}

async function getAddressById(id) {
    const [rows] = await pool.execute(`SELECT * FROM Addresses WHERE id = ?`, [id]);
    return rows[0];
}

async function updateAddress(id, data) {
    const { addressLine, city, state, country, postalCode } = data;
    const query = `
        UPDATE Addresses
        SET addressLine = ?, city = ?, state = ?, country = ?, postalCode = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    await pool.execute(query, [ addressLine, city, state, country, postalCode, id]);
    return await getAddressById(id);
}

async function deleteAddress(id) {
    await pool.execute(`DELETE FROM Addresses WHERE id = ?`, [id]);
}

module.exports = { createAddress, getAddressById, updateAddress, deleteAddress };