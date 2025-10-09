import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/AuthStore";
import MFAModal from "../components/ui/modals/MFAModal";
import type { User } from "../types/User.types";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMFAModal, setShowMFAModal] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [tempToken, setTempToken] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      const { token, mfaRequired, tempToken: receivedTempToken, userId: receivedUserId, user } = res.data;

      if (mfaRequired) {
        setUserId(receivedUserId);
        setTempToken(receivedTempToken);
        setShowMFAModal(true);
      } else {
        const mockUser: User = user ?? {
          id: receivedUserId ?? "dev-id",
          email,
          role: "PATIENT",
        };

        localStorage.setItem("token", token);
        setUser(mockUser);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Login fallido");
    }
  };

  // Acceso rápido para desarrollo
  const loginAsMock = (role: User["role"]) => {
    const mockUser: User = {
      id: `mock-${role}`,
      email: `${role}@dev.local`,
      role,
    };
    localStorage.setItem("token", "mock-token");
    setUser(mockUser);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Iniciar sesión
      </button>

      {showMFAModal && (
        <MFAModal
          userId={userId}
          tempToken={tempToken}
          onSuccess={(token: string, user: User) => {
            localStorage.setItem("token", token);
            setUser(user);
            setShowMFAModal(false);
            navigate("/dashboard");
          }}
          onClose={() => setShowMFAModal(false)}
        />
      )}

      {/* Acceso rápido para desarrollo */}
      {import.meta.env.DEV && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Acceso rápido (dev)</h3>
          <div className="flex gap-2 flex-wrap">
            {["admin", "medic", "patient"].map((role) => (
              <button
                key={role}
                onClick={() => loginAsMock(role as User["role"])}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Ingresar como {role}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

