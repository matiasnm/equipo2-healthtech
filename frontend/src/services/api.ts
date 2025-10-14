import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: 'https://api.mbst.online',
});

// Interceptor de request: agrega token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuesta: maneja errores globales
API.interceptors.response.use(
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

export default API;

