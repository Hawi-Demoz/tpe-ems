import axios from 'axios';

const BASE_URL = 'http://192.168.255.101:3000/api'; // ✅ add /api

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tpe_token'); // ✅ use consistent key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const patch = (url, data, config) => api.patch(url, data, config);
export const upload = (url, data, config = {}) =>
  api.post(url, data, {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    },
  });

export default api;
