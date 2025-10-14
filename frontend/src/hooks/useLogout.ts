import { toast } from 'react-toastify';
import { useAuthStore } from 'store/authStore';

export const useLogout = () => {
  const { logout } = useAuthStore();

  return () => {
    logout();
    localStorage.removeItem('token');
    toast.info('Sesión cerrada');
  };
};
