import axios from 'axios';
import { toast } from 'react-toastify';

const privateAPI = axios.create({
  baseURL: 'http://api.mbst.online:8010',
  headers: {
    'Content-Type': 'application/json',
  },
});

privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo global de errores
privateAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      toast.error('Sesión expirada. Iniciá sesión nuevamente.');
    }

    if (status === 403) {
      toast.error('No tenés permisos para esta acción.');
    }

    if (status === 500) {
      toast.error('Error del servidor. Intentalo más tarde.');
    }

    return Promise.reject(error);
  }
);

export default privateAPI;
