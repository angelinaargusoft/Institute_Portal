const addressModel = require('./addressModel');
const { v4: uuidv4 } = require('uuid');

async function createAddress(data) {
    const addressData = {
        id: uuidv4(),
        type: data.type || 'current',
        addressLine: data.addressLine,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode
    };
    return addressModel.createAddress(addressData);
}

async function getAddressById(id) {
    return addressModel.getAddressById(id);
}

async function updateAddress(id, data) {
    return addressModel.updateAddress(id, data);
}

async function deleteAddress(id) {
    return addressModel.deleteAddress(id);
}

module.exports = { createAddress, getAddressById, updateAddress, deleteAddress };