import { toast } from 'react-toastify';
import { useAuthStore } from 'store/useAuthStore';

export const useLogout = () => {
  const { logout } = useAuthStore();

  return () => {
    logout();
    toast.info('Sesión cerrada');
  };
};
