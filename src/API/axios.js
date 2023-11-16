import axios from 'axios';

const baseURL = 'https://your-api-endpoint.com';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to make a POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await instance.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};