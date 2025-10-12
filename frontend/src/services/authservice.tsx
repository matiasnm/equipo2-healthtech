import axios from 'axios';
import type { User } from '../types/User.types'; 

const API = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Login con email y password
export const login = (email: string, password: string): Promise<{ token: string; user: User }> =>
  API.post('/login', { email, password }).then((res) => res.data);

// Verificación MFA
export const verifymfa = (userId: string, code: string, tempToken: string) =>
  API.post('/auth/mfa/verify', { userId, code }, {
    headers: { Authorization: `Bearer ${tempToken}` },
  });

// Obtener datos del usuario autenticado
export const fetchUser = (token: string): Promise<{ data: User }> =>
  API.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

// Logout 
export const logout = () =>
  API.post('/logout');
