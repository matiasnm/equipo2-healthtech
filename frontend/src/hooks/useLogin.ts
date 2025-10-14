import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/auth';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token, user }) => {
      if (!user || !token) {
        toast.error('Respuesta incompleta del servidor');
        return;
      }

      localStorage.setItem('token', token);
      setUser(user);
      setToken(token);
      toast.success('Sesión iniciada correctamente');
    },
    onError: () => {
      toast.error('Credenciales inválidas');
    },
  });
};

