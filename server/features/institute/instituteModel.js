const pool = require('../../config/database');
const addressService = require('../address/addressService'); 

async function createInstitute(data) {
    const { id, name, email, address, description, logoUrl, createdBy, status } = data;
    let addressId = null;
    if (address) {
        const newAddress = await addressService.createAddress(address);
        addressId = newAddress.id;
    }
    const query = `
        INSERT INTO Institutes (id, name, email, addressId, description, logoUrl, createdBy, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [id, name, email, addressId, description, logoUrl, createdBy, status]);
    return await getInstituteById(id);
}

async function getAllInstitutes() {
    const query = `
        SELECT i.*, a.addressLine, a.city, a.state, a.country, a.postalCode, a.type as addressType
        FROM Institutes i
        LEFT JOIN Addresses a ON i.addressId = a.id
    `;
    const [rows] = await pool.execute(query);
    return rows;
}

async function getInstituteById(id) {
    console.log(id)
    const query = `
        SELECT i.*, a.addressLine, a.city, a.state, a.country, a.postalCode, a.type as addressType
        FROM Institutes i
        LEFT JOIN Addresses a ON i.addressId = a.id
        WHERE i.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}

async function getInstitutesByUserId(userId) {
    const query = `
        SELECT i.*, a.addressLine, a.city, a.state, a.country, a.postalCode, a.type as addressType
        FROM Institutes i
        LEFT JOIN Addresses a ON i.addressId = a.id         
        WHERE i.createdBy = ?
    `;
    const [rows] = await pool.execute(query, [userId]);
    return rows;
}

async function updateInstitute(id, data) {
    const { name, email, address, description, logoUrl, status } = data;
    const existingInstitute = await getInstituteById(id);
    if (!existingInstitute) throw new Error("Institute not found");
    let addressId = existingInstitute.addressId;
    if (address) {
        if (addressId) {
            await addressService.updateAddress(addressId, address);
        } else {
            const newAddress = await addressService.createAddress(address);
            addressId = newAddress.id;
        }
    }
    const query = `
        UPDATE Institutes
        SET name = ?, email = ?, addressId = ?, description = ?, logoUrl = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    await pool.execute(query, [name, email, addressId, description, logoUrl, status, id]);
    return await getInstituteById(id);
}

async function deleteInstitute(id) {
    const existingInstitute = await getInstituteById(id);
    await pool.execute(`DELETE FROM Institutes WHERE id = ?`, [id]);

    if (existingInstitute?.addressId) {
        await addressService.deleteAddress(existingInstitute.addressId);
    }
}

module.exports = {
    createInstitute,
    getAllInstitutes,
    getInstituteById,
    getInstitutesByUserId,
    updateInstitute,
    deleteInstitute
};