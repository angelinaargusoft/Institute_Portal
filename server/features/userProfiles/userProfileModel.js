const pool = require('../../config/database');
const addressService = require('../address/addressService'); 

async function getUserProfileById(userId) {
    const query = `
        SELECT up.*, a.addressLine, a.city, a.state, a.country, a.postalCode, a.type as addressType
        FROM UserProfiles up
        LEFT JOIN Addresses a ON up.addressId = a.id
        WHERE up.id = ?
    `;
    const [rows] = await pool.execute(query, [userId]);
    return rows[0];
}

async function getUserProfileByUserId(userId) {
    const query = `
        SELECT up.*, a.addressLine, a.city, a.state, a.country, a.postalCode, a.type as addressType
        FROM UserProfiles up
        LEFT JOIN Addresses a ON up.addressId = a.id
        WHERE up.userId = ?
    `;
    const [rows] = await pool.execute(query, [userId]);
    return rows[0];
}

async function createUserProfile(data) {
    const { id, userId, firstName, lastName, dob, gender, phone, address, roleSpecificDetails } = data;

    let addressId = null;
    if (address) {
        const newAddress = await addressService.createAddress(address); 
        addressId = newAddress.id;
    }

    const profileQuery = `
        INSERT INTO UserProfiles (id, userId, firstName, lastName, dob, gender, phone, addressId, roleSpecificDetails)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(profileQuery, [
        id, userId, firstName, lastName, dob, gender, phone, addressId, JSON.stringify(roleSpecificDetails || {})
    ]);

    return await getUserProfileById(id);
}

async function updateUserProfile(id, data) {
    const { firstName, lastName, dob, gender, phone, address, roleSpecificDetails } = data;
    const existingProfile = await getUserProfileById(id);

    let addressId = existingProfile?.addressId;
    if (address) {
        if (addressId) {
            await addressService.updateAddress(addressId, address);
        } else {
            const newAddress = await addressService.createAddress(address);
            addressId = newAddress.id;
        }
    }

    const updateProfileQuery = `
        UPDATE UserProfiles
        SET firstName = ?, lastName = ?, dob = ?, gender = ?, phone = ?, roleSpecificDetails = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    await pool.execute(updateProfileQuery, [
        firstName, lastName, dob, gender, phone, JSON.stringify(roleSpecificDetails || {}), id
    ]);

    return await getUserProfileById(id);
}

async function deleteUserProfile(id) {
    const existingProfile = await getUserProfileById(id);
    if (!existingProfile) return;
    await pool.execute(`DELETE FROM UserProfiles WHERE id = ?`, [id]);
    if (existingProfile.addressId) {
        await addressService.deleteAddress(existingProfile.addressId);
    }
}

module.exports = {
    getUserProfileById,
    getUserProfileByUserId,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile
};