import { create } from 'zustand';
import { fetchUser, login, logout as logoutService } from '../services/authservice';
import type { User, LoginCredentials } from '../types/user.types';

interface AuthState {
  user: User | null;
  role: 'admin' | 'superAdmin' | 'practitioner' | 'patient' | 'public' | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  validateSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  
  user: null,
  role: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await login(credentials.email, credentials.password);
      const { token, user } = response;
      localStorage.setItem('token', token);
      set({
        user,
        role: user.role,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: any) {
      set({ error: err.message, isAuthenticated: false, isLoading: false });
    }
  },

  logout: () => {
    logoutService(); 
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
      const res = await fetchUser(token);
      set({
        user: res.data,
        role: res.data.role,
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
