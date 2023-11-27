
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


  function decryptData(payload) {
    const decoded = CryptoJS.AES.decrypt(payload, secretKey);
    const decryptedData = decoded.toString(CryptoJS.enc.Utf8);
    console.log("decryptedData", JSON.parse(decryptedData));
    return JSON.parse(decryptedData);
}


module.exports = {
    encryptData: encryptData,
    decryptData: decryptData
};
