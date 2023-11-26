
const CryptoJS = require('crypto-js');

const secretKey = 'ddecd7466d74@1290';

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
    encryptData: encryptData
};
