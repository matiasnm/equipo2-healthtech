import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../services/user';
import { useAuthStore } from '../store/useAuthStore';
import type { UpdateProfilePayload } from '../types/user.types';

export const useUpdateProfile = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (data: UpdateProfilePayload) => {
      const updatedUser = await updateUserProfile(data);
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      toast.success('Perfil actualizado correctamente');
      setUser(updatedUser); 
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Error al actualizar el perfil');
    },
  });
};

