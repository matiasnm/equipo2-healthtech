import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from '../hooks/useLogin';
import { useAuthStore } from "../store/useAuthStore";
import { RegisterPayload } from "../types/user.types";
import { ROUTES } from '../routes/routes';
import { registerSchema, RegisterFormData } from '../schemas/register.schema';
import { useRegister } from '../hooks/useRegister';
import { Card, Input, Button, Layout } from '../components/ui';
import { inferRoleFromEmail } from '../utils/auth.utils';
import { redirectByRole } from '../utils/redirectByRole';
import { useEffect } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const { setUser, setToken, user } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<RegisterFormData, 'role'>>({
    resolver: zodResolver(registerSchema.omit({ role: true })),
  });

  const { mutateAsync: registerUser, isPending } = useRegister();
  const { mutateAsync: loginUser } = useLogin(); // login automático

  const onSubmit = async (data: Omit<RegisterFormData, 'role'>) => {
    const roleLower = inferRoleFromEmail(data.email);
    const role = roleLower === 'admin' ? 'ADMIN' : roleLower === 'practitioner' ? 'PRACTITIONER' : 'PATIENT';

    try {
      const payload: RegisterPayload = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role,
      };

      // Registro
      await registerUser(payload);

      // Login automático
      const response = await loginUser({ email: data.email, password: data.password });
      const { login, user: loggedUser } = response;
      const token = login.token;

      // Guardar sesión
      localStorage.setItem("token", token);
      setToken(token);
      setUser(loggedUser);

      toast.success("Registro exitoso. Completá tu perfil para activar tu cuenta.");

      // Redirección según estado
      if (!loggedUser.status) {
        navigate(ROUTES.SETUP_PROFILE);
      } else {
        navigate(ROUTES.PROFILE);
      }

    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error("Este email ya está registrado. Iniciá sesión o usá otro.");
      } else {
        toast.error(error?.message || "Error al registrar");
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate(redirectByRole(user.role), { replace: true });
    }
  }, [user, navigate])

  if (user) {
    return null;
  }

  return (
    <Layout>
      <div className="grid h-dvh grid-cols-1 lg:grid-cols-2">
        {/* Imagen lateral (solo desktop) */}
        <div className="relative hidden lg:block">
          <img
            src="https://img.mbst.com.ar/panfamanager/health/auth.png"
            alt="Crear cuenta en HealthTech"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Columna del formulario */}
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <Card className="w-full max-w-md">
            <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Crear cuenta</h1>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                Registrate para empezar a gestionar tus turnos y tu perfil.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                placeholder="ejemplo@correo.com"
                disabled={isPending}
              />
              <Input
                label="Contraseña"
                type="password"
                {...register('password')}
                error={!!errors.password}
                errorMessage={errors.password?.message}
                placeholder="******"
                disabled={isPending}
              />
              <Input
                label="Repetir contraseña"
                type="password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                placeholder="******"
                disabled={isPending}
              />
              <Button variant="primary" type="submit" className="w-full mt-2" disabled={isPending}>
                {isPending ? 'Registrando...' : 'Registrarme'}
              </Button>
              <p className="text-sm text-center text-[var(--color-muted)] mt-4">
                ¿Ya tenés cuenta?{" "}
                <Link to="/login" replace className="text-[var(--color-primary)] font-medium hover:underline hover:text-[var(--color-primary-hover)] transition-colors">
                  Iniciar sesión aquí
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;




