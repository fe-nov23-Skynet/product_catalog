/* eslint-disable no-console */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://product-catalog-backend-tan.vercel.app/api' : 'http://localhost:3000/api',
  timeout: 1000,
});

export default axiosInstance;
