import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema, LoginFormData } from "../schemas/login.schema";
import { useAuthStore } from "../store/useAuthStore";
import { loginUser, persistSession } from "../services/auth";
import { Button, Input, MFAModal, Layout, Card } from "../components/ui/index";
import { redirectByRole } from "../utils/redirectByRole";
import type { User } from "../types/user.types";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [showMFAModal, setShowMFAModal] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [tempToken, setTempToken] = React.useState("");

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { login, user } = await loginUser(data);
      const { token, mfaRequired } = login;

      console.log("Login response:", { login, user });

      if (mfaRequired && token && user.id) {
        setUserId(user.id.toString());
        setTempToken(token);
        setShowMFAModal(true);
        return;
      }

      if (!token || !user) {
        toast.error("Respuesta incompleta del servidor");
        return;
      }

      if (!user.status) {
        toast.error("Tu cuenta está inactiva");
        return;
      }

      persistSession(token, user);
      navigate(redirectByRole(user.role));
    } catch (error: any) {
      console.log("Error en login:", error);
      const message = error?.response?.data?.message;
      if (message === "No tenés permisos para esta acción") {
        toast.error(message);
      } else {
        toast.error("Login fallido");
      }
    }
  };

  const loginWithSwaggerUser = async (role: User["role"]) => {
    const credentials: Record<User["role"], { email: string; password: string }> = {
      SUPERADMIN: { email: "", password: "" },
      ADMIN: { email: "admin@ht.com", password: "admin" },
      PATIENT: { email: "patient1@ht.com", password: "patient" },
      PRACTITIONER: { email: "doctor1@ht.com", password: "doctor" },
    };

    const { email, password } = credentials[role];
    setValue("email", email);
    setValue("password", password);
    onSubmit({ email, password });
  };

  return (
    <Layout>
      <Card className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label="Email"
            {...register("email")}
            placeholder="ejemplo@correo.com"
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <Input
            type="password"
            label="Contraseña"
            {...register("password")}
            placeholder="******"
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <Button variant="primary" type="submit" className="w-full mt-4">
            Iniciar sesión
          </Button>

          <p className="text-sm text-center text-[var(--color-muted)] mt-4">
              ¿No tenés cuenta?{" "}
            <a href="/register" className="text-[var(--color-primary)] font-medium hover:underline hover:text-[var(--color-primary-hover)] transition-colors">
              Registrate aquí
            </a>
          </p>

        </form>

        {showMFAModal && (
          <MFAModal
            userId={userId}
            tempToken={tempToken}
            onSuccess={(token, user) => {
              if (!user.status) {
                toast.error("Tu cuenta está inactiva");
                return;
              }

              persistSession(token, user);
              setShowMFAModal(false);
              navigate(redirectByRole(user.role));
            }}
            onClose={() => setShowMFAModal(false)}
          />
        )}

        {import.meta.env.DEV && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              Acceso rápido (Swagger)
            </h3>
            <div className="flex gap-2 flex-wrap">
              {["ADMIN", "PRACTITIONER", "PATIENT"].map((role) => (
                <Button
                  key={role}
                  variant="accent"
                  size="sm"
                  onClick={() => loginWithSwaggerUser(role as User["role"])}
                >
                  Ingresar como {role.toLowerCase()}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default Login;
