import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const { user, token } = useAuthStore();
  return { user, token };
};
