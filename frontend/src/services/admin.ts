import privateAPI from './api/privateAPI';
import type { IdentifierPayload, UpdateUserStatusPayload } from '../types/admin.types';
import type { User } from '../types/user.types';


// Obtener usuario por ID 
export const getUserById = (id: string): Promise<User> =>
  privateAPI.get(`/api/v1/users/${id}`).then((res) => res.data);

// Actualizar identificadores de usuario 
export const updateUserIdentifiers = (userId: string, identifiers: IdentifierPayload[]) =>
  privateAPI.put(`/api/v1/users/${userId}/identifiers`, { identifiers }).then((res) => res.data);

// Obtener lista de usuarios 
export const getAllUsers = (): Promise<User[]> =>
  privateAPI.get('/api/v1/users/list').then((res) => res.data);

// Cambiar estado de usuario 
export const updateUserStatus = (userId: string, data: UpdateUserStatusPayload) =>
  privateAPI.put(`/api/v1/users/${userId}/status`, data).then((res) => res.data);

