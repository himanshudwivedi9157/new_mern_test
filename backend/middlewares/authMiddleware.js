const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user.role !== 'Admin') {
            throw new Error('Not authorized as admin');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized as admin' });
    }
};

module.exports = { isAdmin };
