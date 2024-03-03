import axios, { AxiosError } from 'axios';
import md5 from 'md5';

const baseURL = 'http://api.valantis.store:40000/';

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  if (config.headers) {
    const date = new Date();
    config.headers['X-Auth'] = md5(
      `Valantis_${date.getUTCFullYear()}${String(
        date.getUTCMonth() + 1
      ).padStart(2, '0')}${String(date.getUTCDate()).padStart(2, '0')}`
    );
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.warn(`Error ID: ${error.response.data}`);
    }
  }
);
