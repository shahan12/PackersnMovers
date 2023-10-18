// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-api-endpoint.com', 
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
