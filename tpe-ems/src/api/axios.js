import axios from 'axios';

const RAW_BASE_URL =
  process.env.REACT_APP_API_URL ||
  'http://192.168.0.72:3000';

const BASE_URL = RAW_BASE_URL.replace(/\/+$/g, '');

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tpe_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Ensure URL starts with a single leading slash and do not auto-prepend any API prefix
  if (typeof config.url === 'string') {
    // Collapse multiple leading slashes to one
    const nextUrl = config.url.replace(/^\/+/, '/');
    config.url = nextUrl;
  }
  return config;
});

// Normalize error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Network error. Please try again.';
    return Promise.reject({ ...error, normalizedMessage: message });
  }
);

export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const patch = (url, data, config) => api.patch(url, data, config);
export const del = (url, config) => api.delete(url, config);
export const upload = (url, data, config = {}) =>
  api.post(url, data, {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    },
  });

export default api;
