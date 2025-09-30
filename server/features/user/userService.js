const userModel = require('./userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { generateToken, generateRefreshToken } = require('../../utils/helpers');

async function loginUser(email, plainPassword) {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    const payload = { userId: user.id, email: user.email, roles: user.roles }
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { user, token, refreshToken };
}

async function getAllUsers() {
    return userModel.getAllUsers();
}

async function createUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.id = uuidv4();
    data.password = hashedPassword;

    return userModel.createUser(data);
}

async function getUser(id) {
    return userModel.getUserById(id);
}

async function changePassword(id, data) {
    const {oldPassword, newPassword} = data;
    const user = await userModel.getUserById(id);

    if(!user){
        throw new Error("user not found")
    }

    let finalPassword = user.password;

    if(oldPassword && newPassword){
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            throw new Error("Old password is incorrect");
        }
        finalPassword = await bcrypt.hash(newPassword, 10);
    }

    return userModel.changePassword(id, finalPassword);
}

async function addRole(id, role) {
    const user = await userModel.getUserById(id);
    if (!user) throw new Error('User not found');

    // Ensure roles is parsed JSON
    let roles = [];
    try {
        roles = Array.isArray(user.roles) ? user.roles : JSON.parse(user.roles);
    } catch (e) {
        roles = [];
    }
    if (!roles.includes(role)) {
        roles.push(role);
        return await userModel.updateRoles(id, roles);
    }
    return user; // no change if role already exists
}

async function removeRole(id, role) {
    const user = await userModel.getUserById(id);
    if (!user) throw new Error('User not found');
    let roles = [];
    try {
        roles = Array.isArray(user.roles) ? user.roles : JSON.parse(user.roles);
    } catch (e) {
        roles = [];
    }
    const newRoles = roles.filter(r => r !== role);
    return await userModel.updateRoles(id, newRoles);
}

async function deleteUser(id) {
    return userModel.deleteUser(id);
}

module.exports = { loginUser, getAllUsers, createUser, getUser, changePassword, addRole, removeRole, deleteUser };