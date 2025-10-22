import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createUserProfile } from '../services/user';
import { useAuthStore } from '../store/useAuthStore';
import type { CreateProfilePayload } from '../types/user.types';

export const useCreateProfile = () => {
  const { validateSession } = useAuthStore();

  return useMutation({
    mutationFn: async (data: CreateProfilePayload) => {
      await createUserProfile(data); 
    },
    onSuccess: async () => {
      toast.success('Perfil creado correctamente');
      await validateSession(); 
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Error al crear el perfil');
    },
  });
};

