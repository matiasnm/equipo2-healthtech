import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { verifymfa } from '../services/authService';
import { useAuthStore } from '../store/AuthStore';
import type { User } from '../types/User.types.ts';

export const useMFA = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const validateCode = async (
    userId: string,
    tempToken: string,
    onClose: () => void,
    onSuccess?: (token: string, user: User) => void
  ) => {
    if (!code || code.length < 6) {
      toast.error('Ingresá un código válido de al menos 6 dígitos');
      return;
    }

    setLoading(true);
    try {
      const res = await verifymfa(userId, code, tempToken);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setUser(user); 
      toast.success('Código validado correctamente');

      onSuccess?.(token, user);
      navigate('/dashboard');
    } catch (err) {
      toast.error('Código incorrecto o expirado');
    } finally {
      setLoading(false);
    }
  };

  return {
    code,
    setCode,
    loading,
    validateCode,
  };
};

