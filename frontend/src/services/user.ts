import privateAPI from './api/privateAPI';
import type { User, UpdateProfilePayload, UpdatePasswordPayload, } from '../types/user.types';

export const getUserProfile  = (): Promise<User> =>
    privateAPI.get('/api/v1/users/me').then((res) => res.data); //Obtiene el perfil del usuario actual (requiere token)

export const getUserById = (id: string): Promise<User> =>
    privateAPI.get(`/api/v1/users/${id}`).then((res) => res.data);//Busca un usuario por ID (solo admin y superadmin por ahora)

export const updateUserProfile = (data: UpdateProfilePayload): Promise<User> =>
    privateAPI.put('/api/v1/users/profile/update', data).then((res) => res.data); //Actualiza datos del perfil (nombre, email, etc.)

export const updateUserPassword = (data: UpdatePasswordPayload): Promise<void> =>
   privateAPI.put('/api/v1/users/password/update', data).then((res) => res.data); //Cambia la contraseña del usuario actual

