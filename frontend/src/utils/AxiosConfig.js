import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true, // Garante que os cookies sejam enviados com cada requisição
});

export default api;
