import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const CHAT_BACKEND_URL = 'https://fe-nov-23-products-catalog-backend.onrender.com/';
const CHAT_BACKEND_LOCAL_URL = 'http://localhost:4000';

const URL = process.env.NODE_ENV === 'production' ? CHAT_BACKEND_URL : CHAT_BACKEND_LOCAL_URL;

export const socket = io(URL, {
  autoConnect: true,
});

// eslint-disable-next-line no-console
console.log('build type', process.env.NODE_ENV);
