import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://fe-nov-23-products-catalog-backend.onrender.com/'; // 'production' ? undefined : 'http://localhost:4000';
// const URL = 'http://localhost:4000'; // 'production' ? undefined : 'http://localhost:4000';

export const socket = io(URL, {
  autoConnect: true,
});
