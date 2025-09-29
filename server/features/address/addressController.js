const addressService = require('./addressService');

async function createAddress(req, res, next) {
    try {
        const address = await addressService.createAddress(req.body);
        res.status(201).json({ message: "Address created", address });
    } catch (err) {
        next(err);
    }
}

async function getAddressById(req, res, next) {
    try {
        const address = await addressService.getAddressById(req.params.id);
        if (!address) return res.status(404).json({ message: "Address not found" });
        res.json(address);
    } catch (err) {
        next(err);
    }
}

async function updateAddress(req, res, next) {
    try {
        const updated = await addressService.updateAddress(req.params.id, req.body);
        res.json({ message: "Address updated", updated });
    } catch (err) {
        next(err);
    }
}

async function deleteAddress(req, res, next) {
    try {
        await addressService.deleteAddress(req.params.id);
        res.json({ message: "Address deleted" });
    } catch (err) {
        next(err);
    }
}

module.exports = { createAddress, getAddressById, updateAddress, deleteAddress };