import privateAPI from './api/privateAPI';
import type { User, CreateProfilePayload, UserProfile, UpdateProfilePayload, UpdatePasswordPayload, } from '../types/user.types';
import type { EditProfileFormData } from '../schemas/editProfile.schema';

// Obtener perfil del usuario actual
export const getUserProfile = (): Promise<UserProfile> =>
    privateAPI.get('/api/v1/users/me').then((res) => res.data.userProfile);

// Crear perfil por primera vez
export const createUserProfile = (data: CreateProfilePayload): Promise<User> =>
    privateAPI.post('/api/v1/users/profile/create', data).then((res) => res.data);

// Actualizar perfil 
export const updateUserProfile = (data: UpdateProfilePayload): Promise<User> =>
  privateAPI.put('/api/v1/users/profile/update', data).then((res) => res.data);

// Cambiar contraseña del usuario actual
export const updateUserPassword = (data: UpdatePasswordPayload): Promise<void> =>
  privateAPI.put('/api/v1/users/password/update', data).then((res) => res.data);

// Obtener usuario por ID (solo admin)
export const getUserById = (id: string): Promise<User> =>
  privateAPI.get(`/api/v1/users/${id}`).then((res) => res.data);

