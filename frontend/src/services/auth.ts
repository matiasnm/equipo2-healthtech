import publicAPI from './api/publicAPI';
import privateAPI from './api/privateAPI';
import type { LoginCredentials, LoginResponse, MFAResponse, RegisterPayload, User } from '../types/user.types';

// Login de usuario
export const loginUser = (data: LoginCredentials): Promise<LoginResponse> =>
  publicAPI.post('/api/v1/auth/login', data).then((res) => res.data);

// Registro
export const registerUser = (data: RegisterPayload): Promise<User> =>
  publicAPI.post('/api/v1/auth/register', data).then((res) => res.data);

// Verificación MFA
export const verifymfa = ( 
  userId: string,
  code: string,
  tempToken: string
): Promise<MFAResponse> =>
  publicAPI.post('/api/v1/auth/mfa/verify', { userId, code }, {
      headers: { Authorization: `Bearer ${tempToken}`},
    }).then((res) => res.data);

// Obtener usuario autenticado
export const fetchUser = (): Promise<User> =>
  privateAPI.get('/api/v1/users/me').then((res) => res.data);

// Logout del usuario
export const logoutUser = (): Promise<void> =>
  Promise.resolve();