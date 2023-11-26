import axios from 'axios';
const authmiddleware = require('../authmiddleware');

const instance = axios.create({
  baseURL: 'https://skbootstrap.cloud/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => {
  return sessionStorage.getItem('token');
};

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
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
      console.error('API No Response:', error.request);
  } else {
      console.error('API Request Setup Error:', error.message);
  }
  throw error;
};

export const sendOTPRequestToBackend = async (data) => {
  const encData = authmiddleware.encryptData(data);
  try {
    const response = await instance.post('/sendOTP', { identifier: encData });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendOTPVerifyRequestToBackend = async (data) => {
  
  const encData = authmiddleware.encryptData(data);
  try {
    const response = await instance.post('/verifyOTP', { encData });
    console.log("otp verify response",response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
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
    const response = await instance.put('/inventory', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfoFromBackend = async (data) => {
  try {
    const response = await instance.get('/getUserInfo', { params: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfoToBackend = async (data) => {
  try {
    const response = await instance.put('/updateUser', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserBookingFromBackend = async (data) => {
  try {
    const response = await instance.get('/myBooking');
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const makePaymentRequest = async (data) => {
  try {
     const response = await instance.post('/payment',{paymentAmount: data});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const makePaymentStatusRequest = async (data) => {
  try {
    const response = await instance.get('/checkPaymentStatus');
    return response.data;
  } catch (error) {
    throw error;
  }
};