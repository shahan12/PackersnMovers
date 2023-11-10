require('dotenv').config();
const jwt = require('jsonwebtoken');
let secretKey = process.env.secret_key;

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'un-Authorized' });
    }

    jwt.verify(token, secretKey, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken