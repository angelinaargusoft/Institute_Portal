const pool = require('../../config/database');
const addressService = require('../address/addressService'); 
const userService = require('../user/userService');

function normalizeGender(gender){
    if(!gender) return null;
    const g = gender.toLowerCase();
    if(g === 'male' || g==='m') return 'm';
    if(g === 'female' || g==='f') return 'f';
    if(g === 'others' || g==='o') return 'o';
    return null;
}

async function getByUserId(userId) {
    const query = `
        SELECT up.*, a.addressLine, a.city, a.state, a.country, a.postalCode
        FROM UserProfiles up
        LEFT JOIN Addresses a ON up.addressId = a.id
        WHERE up.userId = ?
    `;
    const [rows] = await pool.execute(query, [userId]);
    return rows[0];
}

async function createBaseProfile(data) {
    const { userId, firstName, lastName, dob, gender, phone, address } = data;
    const normalizedGender = normalizeGender(gender);

    let addressId = null;
    if (address) {
        const newAddress = await addressService.createAddress(address);
        addressId = newAddress.id;    
        console.log(addressId) 
    }
    const query = `
        INSERT INTO UserProfiles (userId, firstName, lastName, dob, gender, phone, addressId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [userId, firstName, lastName, dob, normalizedGender, phone, addressId]);
    return getByUserId(userId);
}

async function updateBaseProfile(userId, data) {
    const profile = await getByUserId(userId);
    if (!profile) throw new Error('Profile not found');
    const { firstName, lastName, dob, gender, phone, address } = data;
    const normalizedGender = normalizeGender(gender);
    let addressId = profile.addressId;
    if (address) {
        if (addressId) {
            await addressService.updateAddress(addressId, address);
        } else {
            const newAddress = await addressService.createAddress(address);
            addressId = newAddress.id;        
        }
    }
    const query = `
        UPDATE UserProfiles
        SET firstName = ?, lastName = ?, dob = ?, gender = ?, phone = ?, addressId = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE userId = ?
    `;
    await pool.execute(query, [firstName, lastName, dob, normalizedGender, phone, addressId, userId]);
    return getByUserId(userId);
}

async function updateStudentProfile(userId, studentData) {
    const profile = await getByUserId(userId);
    if (!profile) throw new Error('Profile not found');
    const {
        studentProfilePic, guardianName, guardianPhone, bloodGroup, previousSchool
    } = studentData;
    const query = `
        UPDATE UserProfiles
        SET studentProfilePic = ?, guardianName = ?, guardianPhone = ?, bloodGroup = ?, previousSchool = ?,
            updatedAt = CURRENT_TIMESTAMP
        WHERE userId = ?
    `;
    await pool.execute(query, [
        studentProfilePic || null,
        guardianName || null,
        guardianPhone || null,
        bloodGroup || null,
        previousSchool || null,
        userId
    ]);
    await userService.addRole(userId, 'student')
    return getByUserId(userId);
}

async function updateFacultyProfile(userId, facultyData) {
    const profile = await getByUserId(userId);
    if (!profile) throw new Error('Profile not found');
    const {
        facultyProfilePic, designation, specialization, qualifications, yearsOfExperience
    } = facultyData;
    const query = `
        UPDATE UserProfiles
        SET facultyProfilePic = ?, designation = ?, specialization = ?, qualifications = ?, yearsOfExperience = ?,
            updatedAt = CURRENT_TIMESTAMP
        WHERE userId = ?
    `;
    await pool.execute(query, [
        facultyProfilePic || null,
        designation || null,
        specialization || null,
        qualifications || null,
        yearsOfExperience || null,
        userId
    ]);

    await userService.addRole(userId, 'faculty');
    return getByUserId(userId);
}


async function remove(userId) {
    const profile = await getByUserId(userId);
    if (!profile) return;
    await pool.execute(`DELETE FROM UserProfiles WHERE userId = ?`, [userId]);
    if (profile.addressId) await addressService.deleteAddress(profile.addressId);
    await userService.removeRole(userId, 'student');
    await userService.removeRole(userId, 'faculty');
}

module.exports = {
    getByUserId,
    createBaseProfile,
    updateBaseProfile,
    updateStudentProfile,
    updateFacultyProfile,
    remove
};