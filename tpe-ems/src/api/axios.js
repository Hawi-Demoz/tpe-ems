import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || '';

const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: attach token from localStorage if present
instance.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('user');
    if (raw) {
      const user = JSON.parse(raw);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default instance;

export const get = (url, config) => instance.get(url, config);
export const post = (url, data, config) => instance.post(url, data, config);
export const patch = (url, data, config) => instance.patch(url, data, config);

// Upload helper for multipart/form-data. `onUploadProgress` receives progress event (e.loaded / e.total)
export const upload = (url, file, onUploadProgress, config = {}) => {
  const form = new FormData();
  form.append('file', file);
  const cfg = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
    ...config,
  };
  return instance.post(url, form, cfg);
};
