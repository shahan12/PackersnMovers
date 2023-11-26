
const CryptoJS = require('crypto-js');

const secretKey = process.env.REACT_APP_Secret_Key_Identifier;

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
