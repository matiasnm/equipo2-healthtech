import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { registerUser } from '../services/auth';

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => toast.success('Registro exitoso'),
    onError: () => toast.error('Error al registrar'),
  });
};
