import { create } from "zustand";
import { fetchUser, logoutUser } from "../services/auth";
import type { User } from "../types/user.types";
import { inferRoleFromEmail } from "../utils/auth.utils";

interface AuthState {
  user: User | null;
  role: User["role"] | null;
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
  role: (localStorage.getItem("role") as User["role"]) ?? null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,

  setUser: (user) => {
    const resolvedRole = user.role ?? inferRoleFromEmail(user.email);
    localStorage.setItem("role", resolvedRole);
    set({
      user,
      role: resolvedRole,
      isAuthenticated: true,
      error: null,
    });
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true, error: null });
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Error en logout:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      set({
        user: null,
        role: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  validateSession: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return set({ isAuthenticated: false, isLoading: false });
    }

    set({ isLoading: true, error: null });

    try {
      const user = await fetchUser();
      const resolvedRole = user.role ?? inferRoleFromEmail(user.email);
      localStorage.setItem("role", resolvedRole);

      set({
        user,
        role: resolvedRole,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error("Error validando sesión:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      set({
        user: null,
        role: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Sesión inválida o expirada",
      });
    }
  },
}));
