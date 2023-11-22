import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.base_url, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOTPRequestToBackend = async (data) => {
  try {
    const response = await instance.post('/sendOTP', { mobileNumber: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendOTPVerifyRequestToBackend = async (data) => {
  try {
    const response = await instance.post('/verifyOTP', { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendLoginRequestToBackend = async (data) => {
  try {
    const response = await instance.get('/login', { params: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendRegisterRequestToBackend = async (data) => {
  try {
    const response = await instance.put('/signup', data);
    return response.data;
  } catch (error) {
    throw error;
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
     const response = await axios.post('/payment',{paymentAmount: data});
    return response.data;
  } catch (error) {
    throw error;
  }
};