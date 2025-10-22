import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { registerUser } from '../services/auth';
import type { RegisterPayload, User } from '../types/user.types';

export const useRegister = () =>
  useMutation<User, Error, RegisterPayload>({
    mutationFn: async (data) => {
      const user = await registerUser(data);
      return user;
    },

    onSuccess: () => {
      toast.success('Registro exitoso. Completá tu perfil para activar tu cuenta.');
    },

    onError: (error) => {
      toast.error(error.message || 'Error al registrar');
    },
  });





