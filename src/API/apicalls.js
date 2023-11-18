// api.js
import axios from 'axios';

// Use the actual domain or IP address where your backend is hosted
// const backendURL = 'https://www.shiftkart.co:3001';

const instance = axios.create({
  baseURL: 'https://skbootstrap.cloud/api', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOTPRequestToBackend = async (data) => {
  try {
    console.log("send OTP backend call : ", data);
    const response = await instance.post('/sendOTP', { mobileNumber: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendOTPVerifyRequestToBackend = async (data) => {
  try {
    console.log("verify otp backend call : ", data);
    const response = await instance.post('/verifyOTP', { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendLoginRequestToBackend = async (data) => {
  try {
    console.log("final data to send backend : ", data);
    const response = await instance.get('/login', { params: data });
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
    const response = await instance.put('/basePrice', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendFloorChargeRequestToBackend = async (data) => {
  try {
    const response = await instance.put('/floorCharges', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendTotalBoxRequestToBackend = async (data) => {
  try {
    const response = await instance.put('/totalNoBoxes', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendFinalItemsToBackend = async (data) => {
  try {
    console.log("final data............. : ", data);
    const response = await instance.put('/inventory', data);
    console.log("reply from backend :", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfoFromBackend = async (data) => {
  try {
    console.log("sending to getUserInfo backend :", data);
    const response = await instance.get('/getUserInfo', { params: data });
    console.log("reply from user info backend :", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfoToBackend = async (data) => {
  try {
    const response = await instance.put('/updateUser', data);
    console.log("reply from update user info backend :", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserBookingFromBackend = async (data) => {
  try {
    const response = await instance.get('/myBooking');
    console.log("booking data : ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const makePaymentRequest = async (data) => {
  try {
    // console.log("final data to send backend : ", data);
     const response = await axios.post('/payment',{paymentAmount: data});
    //  console.log("paymant resp frontend : ", response.data);
    // return "Payment Sucessfull...";
    return response.data;
  } catch (error) {
    throw error;
  }
};