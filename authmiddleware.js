const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.secretKey;

// Function to generate a JWT token
function generateToken(payload) {
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString();

    // Add the current date and time to the existing payload
    const updatedPayload = {
        ...payload,
        currentDate: currentDateTime,
    };
    const token = jwt.sign(updatedPayload, secretKey, { expiresIn: '1h' });
    return token;
}

// Function to verify a JWT token
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return null; // Token verification failed
    }
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
};
