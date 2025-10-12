import { create } from 'zustand';
import { fetchUser, login, logout as logoutService } from '../services/authservice';
import type { User } from '../types/User.types';

type AuthState = {
  user: User | null;
  role: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  validateSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) =>
    set({ user, role: user.role, token: localStorage.getItem('token'), isAuthenticated: true, isLoading: false}),

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await login(email, password);
      const { token, user } = res;
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