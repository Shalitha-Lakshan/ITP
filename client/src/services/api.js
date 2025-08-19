import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

function setToken(token) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
}

export const api = {
  get: (...args) => instance.get(...args),
  post: (...args) => instance.post(...args),
  patch: (...args) => instance.patch(...args),
  setToken,
};

