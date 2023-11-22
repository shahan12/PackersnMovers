const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretkey = process.env.secretKey;
var payload;
// Function to generate a JWT token
function generateToken(payload) {

    const token = jwt.sign(payload, secretkey, { expiresIn: '1h' });
    if (payload != null)
        return token;
    else
        return "Invalid User, Because user information is not there";

}

// Function to verify a JWT token
function verifyToken(token) {
    jwt.verify(token, secretkey, (err, decode) => {
        if (err)
            return "Failed to authenticate user";
        req.payload = decode;
        next();
    });
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
};