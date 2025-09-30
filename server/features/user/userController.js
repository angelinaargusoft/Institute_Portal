const userService = require('./userService');
const { verifyRefreshToken, generateToken } = require('../../utils/helpers');

async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const result = await userService.loginUser(email, password);

        res.json({
            message: 'Login successful',
            accessToken: result.token,
            refreshToken: result.refreshToken,
            user: {
                id: result.user.id,
                email: result.user.email
            }
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

async function refreshToken(req, res, next) {
    try {
        const { refresh } = req.body;
        if (!refresh) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }
        const decoded = verifyRefreshToken(refresh);
        const newAccessToken = generateToken({
            userId: decoded.userId,
            email: decoded.email
        });

        const newRefreshToken = generateToken({
            userId: decoded.userId,
            email: decoded.email
        });

        res.cookie("refreshToken", newRefreshToken);
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
}

async function getAllUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

async function createUser(req, res, next) {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ message: 'User created', userId: user.id });
    } catch (err) {
        next(err);
    }
}

async function getUser(req, res, next) {
    try {
        const user = await userService.getUser(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function changePassword(req, res, next) {
    try {
        const userId = req.params.id;
        if(req.user.userId !== userId){
            return res.status(403).json({message: 'You are not allowed to update this account'})
        }
        const user = await userService.changePassword(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;

        if(req.user.userId !== userId){
            return res.status(403).json({message: 'You are not allowed to delete this account'})
        }
        
        await userService.deleteUser(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

function logout (req, res) {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  };

module.exports = { loginUser, logout, refreshToken, getAllUsers, createUser, getUser, changePassword, deleteUser };