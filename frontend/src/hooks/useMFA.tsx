import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { verifymfa } from "../services/auth";
import { useAuthStore } from "../store/authStore";
import type { User } from "../types/user.types";

export const useMFA = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const validateCode = async (
    userId: string,
    tempToken: string,
    onClose: () => void,
    onSuccess?: (token: string, user: User) => void
  ) => {
    if (!code || code.length < 6) {
      toast.error("Ingresá un código válido de al menos 6 dígitos");
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await verifymfa(userId, code, tempToken);

      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      toast.success("Código validado correctamente");

      onSuccess?.(token, user);
      navigate("/dashboard");
    } catch {
      toast.error("Código incorrecto o expirado");
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
