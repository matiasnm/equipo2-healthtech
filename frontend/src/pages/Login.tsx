import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema, LoginFormData } from "../schemas/login.schema";
import { useAuthStore } from "../store/useAuthStore";
import { loginUser } from "../services/auth";
import { Button, Input, MFAModal, Layout, Card } from "../components/ui/index";
import { redirectByRole } from "../utils/redirectByRole";
import type { User } from "../types/user.types";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken, user } = useAuthStore();
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

      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
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
      ADMIN: { email: "admin@ht.com", password: "admin" },
      PATIENT: { email: "patient1@ht.com", password: "patient" },
      PRACTITIONER: { email: "doctor1@ht.com", password: "doctor" },
    };

    const { email, password } = credentials[role];
    setValue("email", email);
    setValue("password", password);
    onSubmit({ email, password });
  };


  // Evitar navegar durante el render: hacerlo en un efecto
  React.useEffect(() => {
    if (user) {
      navigate(redirectByRole(user.role), { replace: true });
    }
  }, [user, navigate]);

  // Evitar parpadeo del formulario si ya hay usuario
  if (user) return null;
  return (
    <Layout>
      <div className="grid h-dvh grid-cols-1 lg:grid-cols-2">
        {/* Imagen lateral (solo desktop) */}
        <div className="relative hidden lg:block">
          <img
            src="https://img.mbst.com.ar/panfamanager/health/auth.png"
            alt="Bienvenido a HealthTech"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Columna del formulario */}
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <Card className="w-full max-w-md">
            <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión</h1>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                Accedé a tu cuenta para gestionar turnos y tu perfil.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <Button variant="primary" type="submit" className="w-full mt-2">
                Iniciar sesión
              </Button>

              <p className="text-sm text-center text-[var(--color-muted)] mt-4">
                ¿No tenés cuenta?{" "}
                <Link
                  to="/register"
                  replace
                  className="text-[var(--color-primary)] font-medium hover:underline hover:text-[var(--color-primary-hover)] transition-colors"
                >
                  Registrate aquí
                </Link>
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
        </div>
      </div>
    </Layout>
  );
};

export default Login;
