import axios from 'axios';

const RAW_BASE_URL =
  process.env.REACT_APP_API_URL ||
  'http://192.168.0.102:3002';

const BASE_URL = RAW_BASE_URL.replace(/\/+$/g, '');

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Increase timeout to better handle slower networks/backends
  timeout: 30000,
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
    let message = 'Network error. Please try again.';
    if (error?.code === 'ECONNABORTED') {
      message = 'Request timed out. The server did not respond in time.';
    } else if (error?.message && /Network Error/i.test(error.message)) {
      message = 'Cannot reach the server. Check your connection and API URL.';
    } else if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.message) {
      message = error.message;
    }
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
