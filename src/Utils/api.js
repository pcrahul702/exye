// services/api.js
import axios from 'axios';
import { API_URL } from '@env';
import { getAccessToken } from './getAccessToken';

// Create an instance of axios with default configurations
const api = axios.create({
  baseURL: API_URL, // Replace with your API's base URL
  timeout: 10000, // Optional: Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to handle request (optional, can log or modify requests before sending)
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken();
      //console.log('Token in Interceptor:', token); // Log token to confirm it's retrieved correctly
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error setting authorization header:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);;

// Interceptor to handle response errors
api.interceptors.response.use(
  response => response,

  error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., token expired
      console.log('Unauthorized, redirect to login');
    }
    return Promise.reject(error);
  }
);

// Example GET request
export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Example POST request
export const postData = async (endpoint, data) => {
  try {
    console.log('indie api post', endpoint, data)
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Example PUT request
export const putData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Example DELETE request
export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
