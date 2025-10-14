import { create } from 'zustand';
import type { User } from '../types/user.types';

type AuthState = {
  user: User | null;
  token: string | null;
  role: User['role'] | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  role: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      role: user.role,
      isAuthenticated: true,
    }),

  setToken: (token) =>
    set({
      token,
      isAuthenticated: true,
    }),

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
    });
  },
}));
