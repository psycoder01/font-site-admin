import axios from 'axios';

export function setToken(value) {
  return localStorage.setItem('token', value);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function deleteToken() {
  return localStorage.removeItem('token');
}

export function setHeaders(header, value) {
  network.interceptors.request.use(
    (config) => {
      config.headers[header] = value;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
}

export const network = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
  },
});
