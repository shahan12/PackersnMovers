const jwt = require('jsonwebtoken');
require('dotenv').config();
const CryptoJS = require('crypto-js');

const secretKey = process.env.secretKey;
const Secretkey_Identifier = process.env.Secretkey_Identifier;

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

function decryptIdentifier(token , callName) {
    console.log("token 111", token , "Place" , callName);
    const decoded = CryptoJS.AES.decrypt(token, Secretkey_Identifier);
    const decryptedData = decoded.toString(CryptoJS.enc.Utf8);
    console.log("decryptedData", JSON.parse(decryptedData));
    return JSON.parse(decryptedData);
}

function encryptData(payload) {
    console.log("data", payload, secretKey);
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      secretKey
    ).toString();

    console.log("data", data);
    return data;
  };
  
module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    decryptIdentifier: decryptIdentifier,
    encryptData: encryptData
};
