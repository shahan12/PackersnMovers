import axios from 'axios';
import { performLogout } from '../components/FillRequirements/Requirement.component';
const authmiddleware = require('../authmiddleware');

const instance = axios.create({
  baseURL: 'https://skbootstrap.cloud/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => {
  if( sessionStorage.getItem('token')){
  return sessionStorage.getItem('token');
  }
  else return "Not Found";
};

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token !== "Not Found") {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const handleApiError = (error) => {
  if (error.response) {
      console.error('API Error Status:', error.response.status);
      console.error('API Error Data:', error.response.data);
  } else if (error.request) {
      performLogout();
  } else if (error.code === 'ERR_NETWORK'){
      performLogout();
  } else {
      console.error('API Request Setup Error:', error.message);
  }
  throw error;
};

export const sendOTPRequestToBackend = async (data) => {
  const encData = authmiddleware.encryptData(data);
  try {
    const response = await instance.post('/sendOTP', { identifier: encData });
    if (response ) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};
export const sendMail = async (data) => {
  const encData = authmiddleware.encryptData(data);
  try {
    const response = await instance.post('/saveUserEmail', { encData });
    if (response ) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const sendOTPVerifyRequestToBackend = async (data) => {
  
  const encData = authmiddleware.encryptData(data);
  try {
    const response = await instance.post('/verifyOTP', { encData });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendLoginRequestToBackend = async (data) => {
  const encData = authmiddleware.encryptData(data);
  try {
      const response = await instance.post('/login', { encData });
      return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendBasePriceRequestToBackend = async (data) => {
  
  try {
    const response = await instance.put('/basePrice', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendTotalBoxRequestToBackend = async (data) => {
  try {
    const response = await instance.put('/totalNoBoxes', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendFinalItemsToBackend = async (data) => {
  try {
    const response = await instance.post('/inventory', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserInfoFromBackend = async (data) => {
  try {
    const response = await instance.get('/getUserInfo', { params: {id :data} });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserInfoToBackend = async (data) => {
  
  const encData = authmiddleware.encryptData(data);
  try {
    const response = await instance.put('/updateUser',{ encData });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserBookingFromBackend = async (data) => {
  try {
    const response = await instance.post('/myBooking', {data : data});
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const makePaymentRequest = async (data) => {
  const encData = authmiddleware.encryptData(data);
  try {
     const response = await instance.post('/payment',{ encData });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const retryPayment = async (data) => {
  const encData = authmiddleware.encryptData(data);
  try {
     const response = await instance.post('/retryPayment',{ encData });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const makePaymentStatusRequest = async (data) => {
  const encData = authmiddleware.encryptData(data);
  try {
    const response = await instance.post('/checkPaymentStatus',{ encData });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const retryMakePaymentStatusRequest = async (data) => {
  const encData = authmiddleware.encryptData(data);
  try {
    const response = await instance.post('/retryCheckPaymentStatus',{ encData });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};