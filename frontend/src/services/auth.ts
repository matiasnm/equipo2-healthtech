import API from './api';
import type { LoginCredentials, LoginResponse, MFAResponse, RegisterPayload, User } from '../types/user.types';

// Login de usuario
export const loginUser = (data: LoginCredentials): Promise<LoginResponse> =>
  API.post('/api/v1/auth/login', data).then((res) => res.data);

// Verificación MFA
export const verifymfa = (
  userId: string,
  code: string,
  tempToken: string
): Promise<MFAResponse> =>
  API.post(
    '/api/v1/auth/mfa/verify',
    { userId, code },
    {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    }
  ).then((res) => res.data);

// Registro de usuario
export const registerUser = (data: RegisterPayload): Promise<User> =>
  API.post('/api/v1/auth/register', data).then((res) => res.data);

