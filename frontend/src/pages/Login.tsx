import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import MFAModal from "../components/ui/modals/MFAModal";
import { loginUser } from "../services/auth";
import type { User } from "../types/user.types";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMFAModal, setShowMFAModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [tempToken, setTempToken] = useState("");


  const redirectByRole = (role: User["role"]) => {
  switch (role) {
    case "ADMIN":
      return "/dashboard";
    case "PRACTITIONER":
      return "/dashboard";
    case "PATIENT":
      return "/practitioners"; 
    default:
      return "/";
  }
};



  const handleLogin = async () => {
    try {
      const { token, mfaRequired, tempToken, userId, user } = await loginUser({ email, password });

      if (mfaRequired && tempToken && userId) {
        setUserId(userId);
        setTempToken(tempToken);
        setShowMFAModal(true);
        return;
      }

      if (!token || !user) {
        toast.error("Respuesta incompleta del servidor");
        return;
      }

      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      navigate("/dashboard");
    } catch {
      toast.error("Login fallido");
    }
  };

  const loginWithSwaggerUser = async (role: User["role"]) => {
  const credentials: Record<User["role"], { email: string; password: string }> = {
    SUPERADMIN: { email: "", password: "" },//no  aun en swagger
    ADMIN: { email: "admin@ht.com", password: "admin" },
    PATIENT: { email: "patient1@ht.com", password: "patient" },
    PRACTITIONER: { email: "doctor1@ht.com", password: "doctor" },
  };

  const { email, password } = credentials[role];

  try {
    const { token, user } = await loginUser({ email, password });

    if (!token || !user) {
      toast.error("Respuesta incompleta del servidor");
      return;
    }

    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
    navigate(redirectByRole(user.role));
  } catch {
    toast.error("Login de prueba fallido");
  }
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
          onSuccess={(token, user) => {
            localStorage.setItem("token", token);
            setUser(user);
            setToken(token);
            setShowMFAModal(false);
            navigate(redirectByRole(user.role));
          }}
          onClose={() => setShowMFAModal(false)}
        />
      )}

      {import.meta.env.DEV && (
  <div className="mt-6 border-t pt-4">
    <h3 className="text-sm font-semibold text-gray-500 mb-2">Acceso rápido (Swagger)</h3>
    <div className="flex gap-2 flex-wrap">
      {["ADMIN", "PRACTITIONER", "PATIENT"].map((role) => (
        <button
          key={role}
          onClick={() => loginWithSwaggerUser(role as User["role"])}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Ingresar como {role.toLowerCase()}
        </button>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default Login;

