// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendRequestToBackend = async (data) => {
  try {
    const response = await instance.post('/totalNoBoxes', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendLoginRequestToBackend = async (data) => {
  try {
    console.log("final data to send backend : ", data);
    const response = await axios.get('http://localhost:3001/login', {params :data});
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
