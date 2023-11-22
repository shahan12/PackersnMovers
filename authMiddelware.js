const jwt = require('jsonwebtoken');

// Function to generate a JWT token
function generateToken(payload) {
    const token = jwt.sign(payload, 'SKART', { expiresIn: '1h' });
    return token;
}

// Function to verify a JWT token
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, 'SKART');
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

module.exports = {generateToken: generateToken, 
    verifyToken: verifyToken
};