// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const sendRequestToBackend = async (data) => {
//   try {
//     const response = await instance.post('/totalNoBoxes', data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const sendLoginRequestToBackend = async (data) => {
  try {
    console.log("final data to send backend : ", data);

    const response = await axios.get('http://localhost:3001/login', {params :data});
    // return "Login Sucessfull...";
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendRegisterRequestToBackend = async (data) => {
  try {
    console.log("final data to send backend : ", data);
    const response = await instance.put('/signup', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendBasePriceRequestToBackend = async (data) => {
  try {
    console.log("final data to send basePrice backend : ", data);
    const response = await instance.put('http://localhost:3001/basePrice', data);
    return response.data;
    // return 100;
  } catch (error) {
    throw error;
  }
};

export const sendFloorChargeRequestToBackend = async (data) => {
  try {
    // console.log("final data to send floorCharges backend : ", data);
    // const response = await instance.put('http://localhost:3001/floorCharges', data);
    // return response.data;
    // return 50;
  } catch (error) {
    throw error;
  }
};

export const sendTotalBoxRequestToBackend = async (data) => {
  try {
    // console.log("final data to send totalBox backend : ", data);
    const response = await instance.put('http://localhost:3001/totalNoBoxes', data);
    return response.data;
    // return 75;
  } catch (error) {
    throw error;
  }
};
