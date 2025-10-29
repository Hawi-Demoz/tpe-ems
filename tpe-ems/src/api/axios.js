// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.190.2.244:3000', // backend base
  // withCredentials: true, // enable if backend uses cookies
});

// Add Authorization header automatically if token available
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('tpe_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    // ignore
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
