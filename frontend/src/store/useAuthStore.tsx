import { create } from 'zustand';
import { fetchUser, logoutUser } from '../services/auth';
import type { User } from '../types/user.types';

interface AuthState {
  user: User | null;
  role: User['role'] | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => Promise<void>;
  validateSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) =>
    set({ user, role: user.role, isAuthenticated: true }),

  setToken: (token) => 
    set({ token, isAuthenticated: true }),

  logout: async () => {
    await logoutUser();
    localStorage.removeItem('token');
    set({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },


  validateSession: async () => {
    const token = localStorage.getItem('token');
    if (!token) return set({ isAuthenticated: false, isLoading: false });

    set({ isLoading: true });
    try {
      const user = await fetchUser();
      set({
        user,
        role: user.role,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      localStorage.removeItem('token');
      set({
        user: null,
        role: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

